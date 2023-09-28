import { disableButton } from "./domManip/domStep1";
import { blockedNextStep, deleteErrorBlock } from "./domManip/domStep2";
import { settings } from "./settings";
import { Step } from "./steppers/Step";
import { StepFinish } from "./steppers/StepFinish";
import { SendData } from "./types/stepsT";
import { TelegramWebApps } from 'telegram-webapps-types';

declare const window: {
    Telegram: TelegramWebApps.SDK;
} & Window;



enum Error {
    ERR='red',
    OK='green'
}

export class QuizeResult {

    cnt: HTMLElement | null = null;                 // контейнер
    btnPrev: HTMLButtonElement | null = null;       // кнопка назад
    btnNext: HTMLButtonElement | null = null;       // кнопка вперед
    steps: Step[] = [];                             // шаги
    counter: number = 0;                            // счетчик шагов
    currentStep: Step | null = null;                // текущий шаг
    sendData: SendData | null = null;               // данные из шагов для отправки на сервер 

    constructor(steps: Step[], btnPrev: HTMLButtonElement | null, btnNext: HTMLButtonElement | null) {
        this.steps = [...steps];
        this.btnPrev = btnPrev;
        this.btnNext = btnNext;
        this.counter = 0;
       
    }

    init() {
        // заблочить все кнопки навигации и кнопке финиш назначить колбек отправки формы
        this.steps.forEach(s => {
            disableButton(s.button, true);
            if (s instanceof StepFinish && s.nameStep === 'step_finish') {
                s.setCallbackButtonSubmit(this.sendFinish.bind(this));
            }
        });
        this.btnPrev?.addEventListener('click', this.prevStep.bind(this));  // обработчик назад
        this.btnNext?.addEventListener('click', this.nextStep.bind(this));  // обработчик вперед
        this.currentStep = this.steps[this.counter];                        // выбрать текущий шаг № 1
        this.selectNavButtonCurrentStep(this.currentStep);                  // выделить кнопку текущего шага
        this.currentStep.step();                                            // наполнить контейнер текущим шагом
    }

    /**
     * 
     * Сформировать ответ для сервера и отправить
     * данные выбранных шагов. (шаг финиш, кнопка отправить)
     */
    async sendFinish(e: Event) {
        e.preventDefault();
        this.stepsDataResult();
        if (this.sendData) {
            const response = await fetch(settings.HOST + 'sendquizdata', {
                method: 'POST',
                credentials: 'include',  
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify(this.sendData)
            });
            const result = await response.json() as {status: string, rowId: string};
            console.log(result.status)
            if (result && result.status && result.status != '') {
                if (result.status === 'ok') {
                    this.sendErrMessage(Error.OK, result.status);
                    const idQuiz = result.rowId;
                    try {
                        
                        window.Telegram.WebApp.ready();
                        window.Telegram.WebApp.sendData(idQuiz);
                        window.Telegram.WebApp.close();
                        setTimeout(() => {
                            console.log('redirect to url');
                            window.location.href = 'https://plitochka-quiz.vercel.app'; 
                        }, 4000)
                        
                    } catch (e) {}
                    
                } 
                else if (result.status === 'redirect') {
                    window.location.href = settings.HOST;
                }
                

            } else {
                this.sendErrMessage(Error.ERR, 'Ошибка. Попробуйте отправить еще раз.');
            }
        }
    }

    selectNavButtonCurrentStep(cs: Step) {
        this.steps.forEach(s => {
            disableButton(s.button, true);
            cs.button?.classList.remove('select-border-focus-on')
        });
        disableButton(cs.button, false);
        cs.button?.classList.add('select-border-focus-on')
    }

    /**
     * назад
     */
    prevStep() {
        
        if (this.counter < 0) {
            this.counter = 0
        } else {
            this.currentStep!.selectData();
            this.counter--;
            if (this.counter >= 0) {
                this.currentStep = this.steps[this.counter];
                this.selectNavButtonCurrentStep(this.currentStep!);
                this.currentStep.step();
            } else { 
                this.counter = 0; 
            }
        }
        
    }


    /**
     * вперед
     */
    nextStep() {
         
        if (this.counter >= this.steps.length-1) {
           return;  
        } else {
            this.currentStep!.selectData();
            
            if (this.currentStep!.isBlockNext) {
                const err = blockedNextStep('Пожалуйста укажите местоположение');
                this.currentStep?.cnt!.appendChild(err);
                deleteErrorBlock(this.currentStep!.cnt, err, 2000);
                return;
            }
            
            this.counter++;
            if (this.counter <= this.steps.length) {
                this.currentStep = this.steps[this.counter];
                this.selectNavButtonCurrentStep(this.currentStep);
                
                 this.currentStep.step(); 
                
            } else { 
                this.counter = this.steps.length-1;
            }
        }
        
    }


    // при нажатии на radio input в текущий шаг записывается результат выбора
    change(form: HTMLFormElement) {
        for (let s of this.steps) {
            if (s.form && form.id === s.form.id)
                s.selectData();
            s.bodyScrollDown();
        }
    }

    isValid(eltype: string, elvalue: string): boolean {
        const v = elvalue.trim()
        switch (eltype) {
            case 'text': {
                if (v.length > 0 && v.length <= 25) 
                    return true;
                break;
            }
            case 'tel': {
                if (v.length > 0 && v.length <= 30) 
                    return true;
                break; 
            }
        }
        return false;
    }

    /**
     * Сообщение об ошибках при отправке формы
     * @param msg text
     */
    sendErrMessage(typeErr: Error = Error.ERR, msg: string = '') {
        const errmsg = document.getElementById('spanerr');
        errmsg!.textContent = msg;
        errmsg!.setAttribute('style', `display: block; color: ${typeErr}; font-size: 0.8em;`)
    }


    // выборка данных из всех шагов и миним. валидация формы "отправить"
    // span id=spanerr - сообщение ошибки 
    stepsDataResult() {
        this.sendData = null;
        const sendData: SendData = {
            name: '',
            phone: '',
            color_fence_block: '',
            height_fence: '',
            total_lenght_fence: '',
            lenght_between_colls: '',
            how_many_wickets: '',
            width_wicket: '',
            width_second_wicket: '',
            how_many_gates: '',
            width_gates: '',
            width_second_gates: '',
            var_comp_coll : '',
            fill_between_coll : '',
            isAutomatic : '',
            isMount: '',
            city: ''
        }; // формирование данных из шагов для отправки

        this.sendErrMessage();
        
        for (let s of this.steps) {
            if (s.form!.id === 'form-step-finish') {
                const formfin = s.form;
                if (formfin) {
                    for (let elem of formfin) {
                        if (elem instanceof HTMLInputElement && ((elem.type === 'text' || elem.type === 'tel'))) {
                            if (!this.isValid(elem.type, elem.value)) {
                                    this.sendErrMessage(Error.ERR, 'Заполните поля "имя" и "№ телефона"');
                                    this.sendData = null;
                                    return;
                            } 
                        } 
                    }  
                }  
            }
            const sname = s.nameStep;
            const sdata = s.getStepData();

            if (sname === 'step3')
                sendData.color_fence_block = sdata.variant || '';
            else if (sname === 'step4')
                sendData.height_fence = parseFloat(sdata.height_zabor || '');
            else if (sname === 'step5')
                sendData.total_lenght_fence = parseFloat(sdata.length_zabora || '1');
            else if (sname === 'step6')
                sendData.lenght_between_colls = parseFloat(sdata.length_between_stolbami_zabora || '');
            else if (sname === 'step7')
                sendData.how_many_wickets = parseInt(sdata.how_many_wickets || '');
            else if (sname === 'step9') {
                sendData.width_gates = `откатные: ${parseFloat((sdata.otkatnie != 'не надо')? sdata.otkatnie:'0')}/распашные: ${parseFloat((sdata.raspashnie != 'не надо')?sdata.raspashnie:'0')}`;
                sendData.width_wicket = parseFloat((sdata.kalitka != 'не надо')?sdata.kalitka:'0');
            }
            else if (sname === 'step99') {
                sendData.width_second_gates = `откатные: ${parseFloat((sdata.second_otkatnie != 'не надо')? sdata.second_otkatnie:'0')}/распашные: ${parseFloat((sdata.second_raspashnie != 'не надо')?sdata.second_raspashnie:'0')}`; 
                sendData.width_second_wicket = parseFloat((sdata.second_kalitka != 'не надо')?sdata.second_kalitka:'0'); 
            }
            else if (sname === 'step8') {
                sendData.how_many_gates = parseInt(sdata.how_many_gates || '');
            }
            else if (sname === 'step_finish') {
                sendData.name = sdata.clientName || '';
                sendData.phone = sdata.clientTel || '';
            }
            else if (sname === 'step1')
                sendData.var_comp_coll = sdata.variant || '';
            else if (sname === 'step2')
                sendData.fill_between_coll = sdata.variant || '';
            else if (sname === 'step10')
                sendData.isAutomatic = sdata.isAutmatic || '';
            else if (sname === 'step11')
                sendData.isMount = sdata.isMounth || '';
            else if (sname === 'step12')
                sendData.city = sdata.adress || '';
             
            // console.log(s.nameStep, s.getStepData())
        } // efor
        this.sendData = sendData;
        
    }
}