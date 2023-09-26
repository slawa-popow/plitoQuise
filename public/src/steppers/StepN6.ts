import { setTitleStep } from "../domManip/domStep1";
import { domStepN6 } from "../domManip/domStep5";
import { StepsSelectData5 } from "../types/stepsT";
import { Step } from "./Step";

export class StepN6 extends Step {
    RADIO_NAME = "step-N-6";

    domData: StepsSelectData5 = {
        idForm: 'form-step-N-6',
        variants: [
            {
                imgSrc: '',
                titleRadioGroup: 'Введите длину забора (м):',
                nameRadioGroup: 'length_zabora',
                radios: []
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
        this.form = domStepN6(this.domData);
        setTitleStep(this.title);
        this.fillContainer(this.form);
        this.checkedBack();
        this.bodyScrollTop();
    }

    selectData(): void {
        
         if (this.form) {
            for (let el of this.form.elements) {
                if (el instanceof HTMLInputElement && el.type === "text" ) {
                    this.stepData[el.name] = el.value;
                }
            }
         }
    }
}