import { setTitleStep } from "../domManip/domStep1";
import { domStep6 } from "../domManip/domStep5";
import { StepsSelectData5 } from "../types/stepsT";
import { Step } from "./Step";

export class StepN7 extends Step {
    RADIO_NAME = "step-N-7";

    domData: StepsSelectData5 = {
        idForm: 'form-step-N-7',
        variants: [
            {
                imgSrc: '',
                titleRadioGroup: '',
                nameRadioGroup: 'length_between_stolbami_zabora',
                radios: ['2.0 м', '2.5 м', '2.75 м', '3.0 м']
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
        this.stepData = {}
        this.nameStep = nameStep;
    }

    step(): void {
        this.clearContainer();
        setTitleStep();
        this.form = domStep6(this.domData);
        setTitleStep(this.title);
        this.fillContainer(this.form);
        this.checkedBack();
    }

    selectData(): void {
        
         if (this.form) {
            for (let el of this.form.elements) {
                if (el instanceof HTMLInputElement && el.type === "radio" ) {
                    if (el.checked) { 
                        this.stepData[el.name] = el.value;
                     }
                }
            }
         }
    }
}