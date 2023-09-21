import { setTitleStep } from "../domManip/domStep1";
import { domStepFinish } from "../domManip/domStepFinish";
import { StepFinishtData } from "../types/stepsT";
import { Step } from "./Step";

export class StepFinish extends Step {
    RADIO_NAME = "";

    domData: StepFinishtData = {
        idForm: 'form-step-finish',
        imgSrc: 'styles/stepsimg/ava.png',
        inputNameName: 'clientName',
        inputTelName: 'clientTel',
         
    };

    button: HTMLButtonElement | null = null;
    form: HTMLFormElement | null = null;
    title: string = '';
    isFirst: boolean = false;
    nameStep: string = '';
    callbackQuizeResult: (e: Event) => Promise<any>;  // callback от QuizeResult собирает данные и отправка на бек

    constructor(nameStep: string,
                container: HTMLElement | null,
                button: HTMLButtonElement | null,
                title: string = '', 
                isFirst: boolean = false) {
 
        super(container);
        this.button = button;
        this.title = title;
        this.isFirst = isFirst;
        this.stepData = {}
        this.nameStep = nameStep;
    }

    // задать калбацк this.submitCallback() -> QuizeResult.sendFinish()
    setCallbackButtonSubmit(clb: (e: Event) => Promise<any>) {
        this.callbackQuizeResult = clb;
    }


    step(): void {
        this.clearContainer();
        setTitleStep();
        this.form = domStepFinish(this.domData, this.submitCallback.bind(this));
        setTitleStep(this.title);
        this.fillContainer(this.form);         
        this.checkedBack();
    }


    // кнопка "Отправить" финиш
    async submitCallback(e: Event) {
        e.preventDefault();
        this.selectData();
        await this.callbackQuizeResult(e);
    }
    

    selectData(): void {
         if (this.form) {
            for (let el of this.form.elements) {
                if (el instanceof HTMLInputElement && (el.type === "text" || el.type === "tel")) {
                    if (el.value.trim().length > 0) {
                        this.stepData[el.id] = el.value;
                    }
                }
            }
         }
    }
}