import { setTitleStep } from "../domManip/domStep1";
import { domStep5 } from "../domManip/domStep5";
import { StepsSelectData5 } from "../types/stepsT";
import { Step } from "./Step";

export class SecondStep5 extends Step {
    RADIO_NAME = "step-s5";

    domData: StepsSelectData5 = {
        idForm: 'form-step-s5',
        variants: [
            // {
            //     imgSrc: 'styles/stepsimg/s5/it-3-1.jpg',
            //     titleRadioGroup: 'Вторые откатные ворота (выбрать длину)',
            //     nameRadioGroup: 'second_vorota',
            //     dataLabel: 'second_otkatnie',
            //     radios: ['3,5 м', '4 м', '4,5 м', '5 м', ]
            // },
            // {
            //     imgSrc: 'styles/stepsimg/s5/it-3-2.jpg',
            //     titleRadioGroup: 'Вторые распашные ворота (выбрать длину)',
            //     nameRadioGroup: 'second_vorota',
            //     dataLabel: 'second_raspashnie',
            //     radios: [ '3,5 м', '4 м', '4,5 м', ]
            // },
            // {
            //     imgSrc: 'styles/stepsimg/s5/it-3-3.jpg',
            //     titleRadioGroup: 'Вторая калитка (выбрать ширину)',
            //     nameRadioGroup: 'second_kalitka',
            //     dataLabel: 'second_kalitka',
            //     radios: [ '1 м', '1,2 м', ]
            // },
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
        this.stepData = {}
        this.nameStep = nameStep;
    }

    step(): void {
        this.clearContainer();
        setTitleStep();
        this.form = domStep5(this.domData);
        setTitleStep(this.title);
        this.fillContainer(this.form);
        this.checkedBack();
        this.bodyScrollTop();
    }

    clearStepData() {
        this.stepData = {};
    }

    selectData(): void {
        
         if (this.form) {
            this.clearStepData();
            for (let el of this.form.elements) {
                if (el instanceof HTMLInputElement && el.type === "radio" ) {
                    if (el.checked) { 
                        if (el.dataset) {
                            const alias = el.dataset.alias || ''; // data-alias="..." в domStep5.ts setAttribure input type=radio
                            this.stepData[alias] = el.value;
                        }
                     }
                }
            }
         }
    }
}