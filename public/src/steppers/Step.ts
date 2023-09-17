import { StepData } from "../types/stepsT";


export abstract class Step {

    protected cnt: HTMLElement | null = null;
    protected stepData: StepData = {};
    form: HTMLFormElement | null = null;
    nameStep: string = '';

    constructor(container: HTMLElement | null) {
        this.cnt = container;
    }

    getStepData() {
        return this.stepData;
    }

    fillContainer(obj: HTMLElement): void {
        if (this.cnt) 
            this.cnt.appendChild(obj);
    }

    clearContainer(): void {
        if (this.cnt)
            for (let domElem of Array.from(this.cnt.children)) {
                this.cnt.removeChild(domElem);
            }
    }

    addData(key: string, value: string) {
        this.stepData[key] = value;
    }

    abstract step(): void;
    abstract selectData(): void;

}