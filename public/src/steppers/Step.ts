import { StepData } from "../types/stepsT";


export abstract class Step {

    public cnt: HTMLElement | null = null;
    protected stepData: StepData = {};
    form: HTMLFormElement | null = null;
    nameStep: string = '';
    button: HTMLButtonElement | null = null;
    isBlockNext: boolean = false;

    constructor(container: HTMLElement | null) {
        this.cnt = container;
    }

    evnImg(e: Event) {
        const input = (<HTMLImageElement> e.target).nextSibling?.childNodes;
        input?.forEach(i => {
            if (i instanceof HTMLInputElement) {
                i.checked = true;
            }
        });
    }
    

    getStepData() {
        return this.stepData;
    }


    fillContainer(obj: HTMLElement): void {
        if (this.cnt) 
            this.cnt.appendChild(obj);
        const tagImg = document.querySelectorAll('img');
        if (tagImg) {
            tagImg.forEach((el) => {
                el.addEventListener('click', this.evnImg.bind(this));
            });
        }
    }


    clearContainer(): void {
        if (this.cnt)
            for (let domElem of Array.from(this.cnt.children)) {
                this.cnt.removeChild(domElem);
            }
        const tagImg = document.querySelectorAll('img');
        if (tagImg) {
            tagImg.forEach((el) => {
                el.removeEventListener('click', this.evnImg.bind(this));
            });
        }
    }


    addData(key: string, value: string) {
        this.stepData[key] = value;
    }

    
    checkedBack() {
        if (this.form && this.stepData.variant != '') {
            for (let elem of this.form.elements) {
                if (elem instanceof HTMLInputElement && elem.type === "radio" && 
                    (elem.value === this.stepData[elem.name] || elem.value === this.stepData.variant )) {
                        elem.checked = true;
                    }
            }
        } if (this.form && this.stepData['adress']) {
            for (let elem of this.form.elements) {
                 
                if (elem instanceof HTMLTextAreaElement) {
                            elem.textContent = this.stepData['adress'];
                            
                }
            }
        }
    }

    abstract step(): void;
    abstract selectData(): void;

}