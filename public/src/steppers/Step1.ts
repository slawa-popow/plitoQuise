import { domStep1, setTitleStep } from "../domManip/domStep1";
import { StepsSelectData } from "../types/stepsT";
import { Step } from "./Step";


export class Step1 extends Step {
    RADIO_NAME = "step-1";

    // данные для отправки "генератору" (формирователю) хтмл 
    domData: StepsSelectData = {
        
        idForm: 'form-step-1',
        variants: [
            {
                imgSrc: "styles/stepsimg/s1/stolb_v1.jpg",
                titleSpan: "Вариант 1. Все столбы из камня",
                radioId: "stolb-1",
                radioName: this.RADIO_NAME,
                radioValue: "Все столбы из камня",
                isChecked: true
            },
            {
                imgSrc: "styles/stepsimg/s1/stolb_v2.jpg",
                titleSpan: "Вариант 2. Каменный столб через один или несколько металлических",
                radioId: "stolb-2",
                radioName: this.RADIO_NAME,
                radioValue: "Каменный столб через один или несколько металлических",
                isChecked: false
            },
            {
                imgSrc: "styles/stepsimg/s1/stolb_v3.jpg",
                titleSpan: "Вариант 3. Каменные столбы на входе и по краям",
                radioId: "stolb-3",
                radioName: this.RADIO_NAME,
                radioValue: "Каменные столбы на входе и по краям",
                isChecked: false
            },
            {
                imgSrc: "styles/stepsimg/s1/zapolneniev4.jpg",
                titleSpan: "Вариант 4. Отдельностоящие каменные столбы",
                radioId: "stolb-4",
                radioName: this.RADIO_NAME,
                radioValue: "Отдельностоящие каменные столбы",
                isChecked: false
            },
            {
                imgSrc: "styles/stepsimg/s1/stolb_v5.jpg",
                titleSpan: "Вариант 5. Каменные столбы только на входной группе",
                radioId: "stolb-5",
                radioName: this.RADIO_NAME,
                radioValue: "Каменные столбы только на входной группе",
                isChecked: false
            },
            {
                imgSrc: "styles/stepsimg/s1/stolb_v6.jpg",
                titleSpan: "Вариант 6. Только металлические столбы",
                radioId: "stolb-6",
                radioName: this.RADIO_NAME,
                radioValue: "Только металлические столбы",
                isChecked: false
            },
        ],
    };
    button: HTMLButtonElement | null = null;
    form: HTMLFormElement | null = null;
    title: string = '';
    isFirst: boolean = false;
    nameStep: string = '';

    constructor(nameStep: string,
                container: HTMLElement | null,
                button: HTMLButtonElement | null,
                title: string = '', 
                isFirst: boolean = false) {

        super(container);
        this.button = button;
        this.title = title;
        this.isFirst = isFirst;
        this.stepData = {};
        this.nameStep = nameStep;
    }

    step(): void {
        this.clearContainer();                  // очисть контейнер
        setTitleStep();                         // очистить заголовок шага
        this.form = domStep1(this.domData);     // сгенерировать хтмл объект формы
        setTitleStep(this.title);               // задать заголовок шага
        this.fillContainer(this.form);          // заполнить контейнер формой с картинками, кнопками итд
        this.checkedBack();                     // если в шаг было что-то записано (вернулись сюда) то показать что выбирали
        window.scrollTo(0, 60);
    }

    selectData(): void {
        
         if (this.form) {
            for (let el of this.form.elements) {
                if (el instanceof HTMLInputElement && el.type === "radio" ) {
                    if (el.checked) { 
                        this.stepData.variant = el.value;
                     }
                }
            }
         }
    }
}