import { setTitleStep } from "../domManip/domStep1";
import { domStep2 } from "../domManip/domStep2";
import { StepsFormSity } from "../types/stepsT";
import { Step } from "./Step";

export class Step2 extends Step {
    RADIO_NAME = "step-2";

    domData: StepsFormSity = {
        idForm: 'form-step-2',
        titleInput: 'Укажите Ваше примерное или точное местоположение',
        nameInput: 'sity',
        idInput: 'step-2-input-form'
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
        this.clearContainer();
        setTitleStep();
        this.form = domStep2(this.domData);
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
                } else if (el instanceof HTMLTextAreaElement) {
                    if (el.value.trim().length > 0) {
                        this.stepData['adress'] = el.value;
                        this.isBlockNext = false;
                    } else { this.isBlockNext = true }
                }
            }
         }
    }
}