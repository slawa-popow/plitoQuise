 
import { QuizeResult } from "./src/QuizeResult";
import { disableButton } from "./src/domManip/domStep1";
import { Step1 } from "./src/steppers/Step1";
import { Step2 } from "./src/steppers/Step2";
import { Step3 } from "./src/steppers/Step3";
import { Step5 } from "./src/steppers/Step5";
import { Step6 } from "./src/steppers/Step6";
import { Step7 } from "./src/steppers/Step7";

const CONTAINER = document.getElementById('content-container');

const navButton1 = document.getElementById('step-1') as HTMLButtonElement;
const navButton2 = document.getElementById('step-2') as HTMLButtonElement;
const navButton3 = document.getElementById('step-3') as HTMLButtonElement;
const navButton4 = document.getElementById('step-4') as HTMLButtonElement;
const navButton5 = document.getElementById('step-5') as HTMLButtonElement;
const navButton6 = document.getElementById('step-6') as HTMLButtonElement;
const navButton7 = document.getElementById('step-7') as HTMLButtonElement;
const navButton8 = document.getElementById('step-8') as HTMLButtonElement;

const navButtons = [navButton1, navButton2, navButton3, navButton4, navButton5,
                    navButton6, navButton7, navButton8];
navButtons.forEach(v => {
    disableButton(v, true);
});

const buttonPrev = document.getElementById('prev-step') as HTMLButtonElement;
const buttonNext = document.getElementById('next-step') as HTMLButtonElement;



const s1 = new Step1('step1', CONTAINER , navButton1, 'Выберите вариант компоновки столбов', true);
const s2 = new Step2('step2', CONTAINER, navButton2, 'Пожалуйста, укажите Ваше примерное или точное местоположение', false);
const s3 = new Step3('step3', CONTAINER, navButton3, 'Выберите заполнение между столбами', false);
const s5 = new Step5('step5', CONTAINER, navButton5, 'Выберите тип ворот, калитку и их размер', false);
const s6 = new Step6('step6', CONTAINER, navButton6, 'Нужна ли автоматика для ворот?', false);
const s7 = new Step7('step7', CONTAINER, navButton7, 'Нужен ли монтаж забора?', false);

const quize = new QuizeResult([s1, s2, s3, s5, s6, s7], buttonPrev, buttonNext);
quize.init();


const tagInput = document.querySelectorAll('input[type="radio"]');
tagInput.forEach((elem) => {
    elem.addEventListener("change", (e: Event) => {
        const form = (<HTMLFormElement> e.target).form as HTMLFormElement;
        quize.change(form)
    });
});




