import { Step } from "./steppers/Step";



export class QuizeResult {

    cnt: HTMLElement | null = null;
    btnPrev: HTMLButtonElement | null = null;
    btnNext: HTMLButtonElement | null = null;
    steps: Step[] = [];
    counter: number = 0;
    currentStep: Step | null = null;

    constructor(steps: Step[], btnPrev: HTMLButtonElement | null, btnNext: HTMLButtonElement | null) {
        this.steps = [...steps];
        this.btnPrev = btnPrev;
        this.btnNext = btnNext;
        this.counter = 0;
    }

    init() {
        this.btnPrev?.addEventListener('click', this.prevStep.bind(this));
        this.btnNext?.addEventListener('click', this.nextStep.bind(this));
        this.currentStep = this.steps[this.counter];
        this.currentStep.step();
        
    }

    prevStep() {
        console.log(this.counter)
        if (this.counter < 0) {
            this.counter = 0
        } else {
            this.currentStep!.selectData();
            this.counter--;
            if (this.counter >= 0) {
                this.currentStep = this.steps[this.counter];
                this.currentStep.step();
            } else { 
                this.counter = 0; 
            }
        }
    }
    

    nextStep() {
        console.log(this.counter)
        if (this.counter >= this.steps.length-1) {
           return;  
        } else {
            this.currentStep!.selectData();
            this.counter++;
            if (this.counter <= this.steps.length) {
                this.currentStep = this.steps[this.counter];
                this.currentStep.step();
            } else { 
                this.counter = this.steps.length-1;
            }
        }
        
    }


    change(form: HTMLFormElement) {
        for (let s of this.steps) {
            if (s.form && form.id === s.form.id)
                s.selectData();
        }
    }

    stepsDataResult() {
        for (let s of this.steps) {
            console.log(s.nameStep, s.getStepData())
        }
    }
}