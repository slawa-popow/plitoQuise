 
import { QuizeResult } from "./src/QuizeResult";
import { Step1 } from "./src/steppers/Step1";
import { Step3 } from "./src/steppers/Step3";

const CONTAINER = document.getElementById('content-container');

const navButton1 = document.getElementById('step-1') as HTMLButtonElement;
// const navButton2 = document.getElementById('step-2') as HTMLButtonElement;
const navButton3 = document.getElementById('step-3') as HTMLButtonElement;
// const navButton4 = document.getElementById('step-4') as HTMLButtonElement;
// const navButton5 = document.getElementById('step-5') as HTMLButtonElement;
// const navButton6 = document.getElementById('step-6') as HTMLButtonElement;
// const navButton7 = document.getElementById('step-7') as HTMLButtonElement;
// const navButton8 = document.getElementById('step-8') as HTMLButtonElement;

const buttonPrev = document.getElementById('prev-step') as HTMLButtonElement;
const buttonNext = document.getElementById('next-step') as HTMLButtonElement;



const s1 = new Step1('step1', CONTAINER , navButton1, 'Выберите вариант компоновки столбов', true);
const s3 = new Step3('step3', CONTAINER, navButton3, 'Выберите заполнение между столбами', false);


const quize = new QuizeResult([s1, s3], buttonPrev, buttonNext);
quize.init();

const tagInput = document.querySelectorAll('input[type="radio"]');
tagInput.forEach((elem) => {
    elem.addEventListener("change", (e: Event) => {
        const form = (<HTMLFormElement> e.target).form as HTMLFormElement;
        quize.change(form)
        quize.stepsDataResult();
    });
});


