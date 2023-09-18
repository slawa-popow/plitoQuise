import { disableButton } from "./domManip/domStep1";
import { blockedNextStep, deleteErrorBlock } from "./domManip/domStep2";
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
        this.steps.forEach(s => {
            disableButton(s.button, true);
        });
        this.btnPrev?.addEventListener('click', this.prevStep.bind(this));
        this.btnNext?.addEventListener('click', this.nextStep.bind(this));
        this.currentStep = this.steps[this.counter];
        this.selectNavButtonCurrentStep(this.currentStep);
        this.currentStep.step();
    }

    selectNavButtonCurrentStep(cs: Step) {
        this.steps.forEach(s => {
            disableButton(s.button, true);
            cs.button?.classList.remove('select-border-focus-on')
        });
        disableButton(cs.button, false);
        cs.button?.classList.add('select-border-focus-on')
    }

    prevStep() {
        
        if (this.counter < 0) {
            this.counter = 0
        } else {
            this.currentStep!.selectData();
            this.counter--;
            if (this.counter >= 0) {
                this.currentStep = this.steps[this.counter];
                this.selectNavButtonCurrentStep(this.currentStep!);
                this.currentStep.step();
            } else { 
                this.counter = 0; 
            }
        }
        this.stepsDataResult();
    }


    nextStep() {
         
        if (this.counter >= this.steps.length-1) {
           return;  
        } else {
            this.currentStep!.selectData();
            
            if (this.currentStep!.isBlockNext) {
                const err = blockedNextStep('Пожалуйста укажите местоположение');
                this.currentStep?.cnt!.appendChild(err);
                deleteErrorBlock(this.currentStep!.cnt, err, 2000);
                return;
            }
            
            this.counter++;
            if (this.counter <= this.steps.length) {
                this.currentStep = this.steps[this.counter];
                this.selectNavButtonCurrentStep(this.currentStep);
                
                 this.currentStep.step(); 
                
            } else { 
                this.counter = this.steps.length-1;
            }
        }
        this.stepsDataResult();
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