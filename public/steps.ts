 
import { QuizeResult } from "./src/QuizeResult";
import { disableButton } from "./src/domManip/domStep1";
import { HowManyGates } from "./src/steppers/HowManyGates";
import { HowManyWickets } from "./src/steppers/HowManyWickets";
import { SecondStep5 } from "./src/steppers/SecondStep5";
import { Step1 } from "./src/steppers/Step1";
import { Step2 } from "./src/steppers/Step2";
import { Step3 } from "./src/steppers/Step3";
import { Step5 } from "./src/steppers/Step5";
import { Step6 } from "./src/steppers/Step6";
import { Step7 } from "./src/steppers/Step7";
import { StepFinish } from "./src/steppers/StepFinish";
import { StepN4 } from "./src/steppers/StepN4";
import { StepN5 } from "./src/steppers/StepN5";
import { StepN6 } from "./src/steppers/StepN6";
import { StepN7 } from "./src/steppers/StepN7";

// div блок-контейнер дин. контента
const CONTAINER = document.getElementById('content-container');

// кнопки навигации (в этом приложении только как подсветка шагов)
const navButton1 = document.getElementById('step-1') as HTMLButtonElement;
const navButton2 = document.getElementById('step-2') as HTMLButtonElement;
const navButton3 = document.getElementById('step-3') as HTMLButtonElement;
const navButton4 = document.getElementById('step-4') as HTMLButtonElement;
const navButton5 = document.getElementById('step-5') as HTMLButtonElement;

const navButton6 = document.getElementById('step-6') as HTMLButtonElement;
const navButton7 = document.getElementById('step-7') as HTMLButtonElement;
const navButton8 = document.getElementById('step-8') as HTMLButtonElement;
const navButton9 = document.getElementById('step-9') as HTMLButtonElement;
const navButton99 = document.getElementById('step-s9') as HTMLButtonElement;
const navButton10 = document.getElementById('step-10') as HTMLButtonElement;

const navButton11 = document.getElementById('step-11') as HTMLButtonElement;
const navButton12 = document.getElementById('step-12') as HTMLButtonElement;
const navButton13 = document.getElementById('step-13') as HTMLButtonElement;

// массив кнопок. Сначала все кнопки заблочены
const navButtons = [ navButton1, navButton2, navButton3, navButton4, navButton5,
                    navButton6, navButton7, navButton8, navButton9, navButton99, navButton10, navButton11, navButton12, navButton13 ];

navButtons.forEach(v => {
    disableButton(v, true);
});


// кнопки "назад" "вперед"
const buttonPrev = document.getElementById('prev-step') as HTMLButtonElement;
const buttonNext = document.getElementById('next-step') as HTMLButtonElement;


// шаги. экземпляры abstrack class Step
const s1 = new Step1('step1', CONTAINER , navButton1, 'Выберите вариант компоновки столбов', true);
const s2 = new Step3('step2', CONTAINER, navButton2, 'Выберите заполнение между столбами', false);
const s3 = new StepN4('step3', CONTAINER, navButton3, 'Выберите цвет заборного блока', false);
const s4 = new StepN5('step4', CONTAINER, navButton4, 'Выберите высоту забора (м)', false);
const s5 = new StepN6('step5', CONTAINER, navButton5, 'Какая общая длина забора в метрах?', false);
const s6 = new StepN7('step6', CONTAINER, navButton6, 'Выберите желаемое расстояние между столбами (м)', false);
const s7 = new HowManyWickets('step7', CONTAINER, navButton7, 'Сколько у вас будет калиток?', false);
const s8 = new HowManyGates('step8', CONTAINER, navButton8, 'Сколько у вас будет ворот?', false);
const s9 = new Step5('step9', CONTAINER, navButton9, 'Выберите тип первых ворот, первую калитку и их размер', false);
const s99 = new SecondStep5('step99', CONTAINER, navButton99, 'Выберите тип вторых ворот, вторую калитку и их размер', false);
const s10 = new Step6('step10', CONTAINER, navButton10, 'Нужна ли автоматика для ворот?', false);
const s11 = new Step7('step11', CONTAINER, navButton11, 'Нужен ли монтаж забора?', false);
const s12 = new Step2('step12', CONTAINER, navButton12, 'Пожалуйста, укажите Ваше примерное или точное местоположение', false);
const finish = new StepFinish('step_finish', CONTAINER, navButton13, 'Введите, пожалуйста, Ваше имя и контактный номер. Мы свяжемся в Вами в течении нескольких минут.', false);

// объект управляющий шагами
const quize = new QuizeResult([s1, s2, s3, s4, s5, s6, s7, s8, s9, s99, s10, s11, s12, finish], buttonPrev, buttonNext);
quize.init();

// при нажатии на radio input в текущий шаг записывается результат выбора
const tagInput = document.querySelectorAll('input[type="radio"]');
tagInput.forEach((elem) => {
    elem.addEventListener("change", (e: Event) => {
        const form = (<HTMLFormElement> e.target).form as HTMLFormElement;
        quize.change(form)
    });
});




