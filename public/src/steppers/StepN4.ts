import { domStep1, setTitleStep } from "../domManip/domStep1";
import { StepsSelectData } from "../types/stepsT";
import { Step } from "./Step";


export class StepN4 extends Step {
    RADIO_NAME = "step-N-4";

    // данные для отправки "генератору" (формирователю) хтмл 
    domData: StepsSelectData = {
        
        idForm: 'form-step-N-1',
        variants: [
            {
                imgSrc: "styles/stepsimg/nashi/s1/a1.jpg",
                titleSpan: "Оникс",
                radioId: "nashi-1-1",
                radioName: this.RADIO_NAME,
                radioValue: "Оникс",
                isChecked: true
            },
            {
                imgSrc: "styles/stepsimg/nashi/s1/a2.jpg",
                titleSpan: "Черный микс",
                radioId: "nashi-1-2",
                radioName: this.RADIO_NAME,
                radioValue: "Черный микс",
                isChecked: false
            },
            {
                imgSrc: "styles/stepsimg/nashi/s1/a3.webp",
                titleSpan: "Сахара",
                radioId: "nashi-1-3",
                radioName: this.RADIO_NAME,
                radioValue: "Сахара",
                isChecked: false
            },
            {
                imgSrc: "styles/stepsimg/nashi/s1/a4.webp",
                titleSpan: "Графит",
                radioId: "nashi-1-4",
                radioName: this.RADIO_NAME,
                radioValue: "Графит",
                isChecked: false
            },
            {
                imgSrc: "styles/stepsimg/nashi/s1/a5.webp",
                titleSpan: "Кварц",
                radioId: "nashi-1-5",
                radioName: this.RADIO_NAME,
                radioValue: "Кварц",
                isChecked: false
            },
            {
                imgSrc: "styles/stepsimg/nashi/s1/a6.webp",
                titleSpan: "Капучино",
                radioId: "nashi-1-6",
                radioName: this.RADIO_NAME,
                radioValue: "Капучино",
                isChecked: false
            },
            {
                imgSrc: "styles/stepsimg/nashi/s1/a7.webp",
                titleSpan: "Шоколад",
                radioId: "nashi-1-7",
                radioName: this.RADIO_NAME,
                radioValue: "Шоколад",
                isChecked: false
            },
            {
                imgSrc: "styles/stepsimg/nashi/s1/a8.webp",
                titleSpan: "Тёмный шоколад",
                radioId: "nashi-1-8",
                radioName: this.RADIO_NAME,
                radioValue: "Тёмный шоколад",
                isChecked: false
            },
            {
                imgSrc: "styles/stepsimg/nashi/s1/a9.webp",
                titleSpan: "Грей",
                radioId: "nashi-1-9",
                radioName: this.RADIO_NAME,
                radioValue: "Грей",
                isChecked: false
            },
            {
                imgSrc: "styles/stepsimg/nashi/s1/a10.webp",
                titleSpan: "Гранат",
                radioId: "nashi-1-10",
                radioName: this.RADIO_NAME,
                radioValue: "Гранат",
                isChecked: false
            },
            {
                imgSrc: "styles/stepsimg/nashi/s1/a11.webp",
                titleSpan: "Лава",
                radioId: "nashi-1-11",
                radioName: this.RADIO_NAME,
                radioValue: "Лава",
                isChecked: false
            },
            {
                imgSrc: "styles/stepsimg/nashi/s1/a12.webp",
                titleSpan: "Медный",
                radioId: "nashi-1-12",
                radioName: this.RADIO_NAME,
                radioValue: "Медный",
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
        this.bodyScrollTop();
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