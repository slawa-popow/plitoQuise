/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/src/QuizeResult.ts":
/*!***********************************!*\
  !*** ./public/src/QuizeResult.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuizeResult = void 0;
class QuizeResult {
    constructor(steps, btnPrev, btnNext) {
        this.cnt = null;
        this.btnPrev = null;
        this.btnNext = null;
        this.steps = [];
        this.counter = 0;
        this.currentStep = null;
        this.steps = [...steps];
        this.btnPrev = btnPrev;
        this.btnNext = btnNext;
        this.counter = 0;
    }
    init() {
        var _a, _b;
        (_a = this.btnPrev) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.prevStep.bind(this));
        (_b = this.btnNext) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.nextStep.bind(this));
        this.currentStep = this.steps[this.counter];
        this.currentStep.step();
    }
    prevStep() {
        console.log(this.counter);
        if (this.counter < 0) {
            this.counter = 0;
        }
        else {
            this.currentStep.selectData();
            this.counter--;
            if (this.counter >= 0) {
                this.currentStep = this.steps[this.counter];
                this.currentStep.step();
            }
            else {
                this.counter = 0;
            }
        }
    }
    nextStep() {
        console.log(this.counter);
        if (this.counter >= this.steps.length - 1) {
            return;
        }
        else {
            this.currentStep.selectData();
            this.counter++;
            if (this.counter <= this.steps.length) {
                this.currentStep = this.steps[this.counter];
                this.currentStep.step();
            }
            else {
                this.counter = this.steps.length - 1;
            }
        }
    }
    change(form) {
        for (let s of this.steps) {
            if (s.form && form.id === s.form.id)
                s.selectData();
        }
    }
    stepsDataResult() {
        for (let s of this.steps) {
            console.log(s.nameStep, s.getStepData());
        }
    }
}
exports.QuizeResult = QuizeResult;


/***/ }),

/***/ "./public/src/domManip/domStep1.ts":
/*!*****************************************!*\
  !*** ./public/src/domManip/domStep1.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.domStep1 = void 0;
function domStep1(domData) {
    const form = document.createElement('form');
    form.setAttribute('id', domData.idForm);
    const ul = document.createElement('ul');
    ul.classList.add('image-gallery');
    for (let vars of domData.variants) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.setAttribute('src', vars.imgSrc);
        const div = document.createElement('div');
        div.classList.add('check-in');
        const rinput = document.createElement('input');
        rinput.setAttribute('type', 'radio');
        rinput.setAttribute('id', vars.radioId);
        rinput.setAttribute('name', vars.radioName);
        rinput.setAttribute('value', vars.radioValue);
        rinput.checked = vars.isChecked;
        const span = document.createElement('span');
        span.textContent = vars.titleSpan;
        div.appendChild(rinput);
        div.appendChild(span);
        li.appendChild(img);
        li.appendChild(div);
        ul.appendChild(li);
    }
    form.appendChild(ul);
    return form;
}
exports.domStep1 = domStep1;


/***/ }),

/***/ "./public/src/steppers/Step.ts":
/*!*************************************!*\
  !*** ./public/src/steppers/Step.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Step = void 0;
class Step {
    constructor(container) {
        this.cnt = null;
        this.stepData = {};
        this.form = null;
        this.nameStep = '';
        this.cnt = container;
    }
    getStepData() {
        return this.stepData;
    }
    fillContainer(obj) {
        if (this.cnt)
            this.cnt.appendChild(obj);
    }
    clearContainer() {
        if (this.cnt)
            for (let domElem of Array.from(this.cnt.children)) {
                this.cnt.removeChild(domElem);
            }
    }
    addData(key, value) {
        this.stepData[key] = value;
    }
}
exports.Step = Step;


/***/ }),

/***/ "./public/src/steppers/Step1.ts":
/*!**************************************!*\
  !*** ./public/src/steppers/Step1.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Step1 = void 0;
const domStep1_1 = __webpack_require__(/*! ../domManip/domStep1 */ "./public/src/domManip/domStep1.ts");
const Step_1 = __webpack_require__(/*! ./Step */ "./public/src/steppers/Step.ts");
class Step1 extends Step_1.Step {
    constructor(nameStep, container, button, title = '', isFirst = false) {
        super(container);
        this.RADIO_NAME = "step-1";
        this.domData = {
            idForm: 'form-step-1',
            variants: [
                {
                    imgSrc: "styles/stepsimg/s1/stolb_v1.jpg",
                    titleSpan: "Вариант 1. Все столбы из камня",
                    radioId: "stolb-1",
                    radioName: this.RADIO_NAME,
                    radioValue: "Все столбы из камня",
                    isChecked: true
                },
                {
                    imgSrc: "styles/stepsimg/s1/stolb_v2.jpg",
                    titleSpan: "Вариант 2. Каменный столб через один или несколько металлических",
                    radioId: "stolb-2",
                    radioName: this.RADIO_NAME,
                    radioValue: "Каменный столб через один или несколько металлических",
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/s1/stolb_v3.jpg",
                    titleSpan: "Вариант 3. Каменные столбы на входе и по краям",
                    radioId: "stolb-3",
                    radioName: this.RADIO_NAME,
                    radioValue: "Каменные столбы на входе и по краям",
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/s1/zapolneniev4.jpg",
                    titleSpan: "Вариант 4. Отдельностоящие каменные столбы",
                    radioId: "stolb-4",
                    radioName: this.RADIO_NAME,
                    radioValue: "Отдельностоящие каменные столбы",
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/s1/stolb_v5.jpg",
                    titleSpan: "Вариант 5. Каменные столбы только на входной группе",
                    radioId: "stolb-5",
                    radioName: this.RADIO_NAME,
                    radioValue: "Каменные столбы только на входной группе",
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/s1/stolb_v6.jpg",
                    titleSpan: "Вариант 6. Только металлические столбы",
                    radioId: "stolb-6",
                    radioName: this.RADIO_NAME,
                    radioValue: "Только металлические столбы",
                    isChecked: false
                },
            ],
        };
        this.button = null;
        this.form = null;
        this.title = '';
        this.isFirst = false;
        this.nameStep = '';
        this.button = button;
        this.title = title;
        this.isFirst = isFirst;
        this.stepData = {};
        this.nameStep = nameStep;
    }
    step() {
        this.clearContainer();
        this.form = (0, domStep1_1.domStep1)(this.domData);
        this.fillContainer(this.form);
    }
    selectData() {
        if (this.form) {
            for (let el of this.form.elements) {
                if (el instanceof HTMLInputElement && el.type === "radio") {
                    if (el.checked) {
                        this.stepData.variant = el.value;
                    }
                }
            }
        }
    }
}
exports.Step1 = Step1;


/***/ }),

/***/ "./public/src/steppers/Step3.ts":
/*!**************************************!*\
  !*** ./public/src/steppers/Step3.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Step3 = void 0;
const domStep1_1 = __webpack_require__(/*! ../domManip/domStep1 */ "./public/src/domManip/domStep1.ts");
const Step_1 = __webpack_require__(/*! ./Step */ "./public/src/steppers/Step.ts");
class Step3 extends Step_1.Step {
    constructor(nameStep, container, button, title = '', isFirst = false) {
        super(container);
        this.RADIO_NAME = "step-3";
        this.domData = {
            idForm: 'form-step-3',
            variants: [
                {
                    imgSrc: "styles/stepsimg/s3/zabor-sparta_photo_9.jpg",
                    titleSpan: 'Горизонтальные ламели в стиле Ранчо, модель "Спарта"',
                    radioId: "lamel-1",
                    radioName: this.RADIO_NAME,
                    radioValue: 'Горизонтальные ламели в стиле Ранчо, модель "Спарта"',
                    isChecked: true
                },
                {
                    imgSrc: "styles/stepsimg/s3/line_kviz.jpg",
                    titleSpan: 'Горизонтальные ламели в стиле Ранчо с малозаметными бортами, модель "Лайн"',
                    radioId: "lamel-2",
                    radioName: this.RADIO_NAME,
                    radioValue: 'Горизонтальные ламели в стиле Ранчо с малозаметными бортами, модель "Лайн"',
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/s3/shvec-rancho_kviz.jpg",
                    titleSpan: 'Разноширокие горизонтальные ламели, "Швецкое" ранчо',
                    radioId: "lamel-3",
                    radioName: this.RADIO_NAME,
                    radioValue: 'Разноширокие горизонтальные ламели, "Швецкое" ранчо',
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/s3/portfolio_kolodishi-gorc-de-luxe-22_3.jpg",
                    titleSpan: 'Горизонтальные ламели в стиле Ранчо, модель "Рома"',
                    radioId: "lamel-4",
                    radioName: this.RADIO_NAME,
                    radioValue: 'Горизонтальные ламели в стиле Ранчо, модель "Рома"',
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/s3/zabor-shahmatka_photo_13.jpg",
                    titleSpan: 'Горизонтальные ламели в стиле Ранчо с двухсторонней зашивкой (шахматка), модель "Рома"',
                    radioId: "lamel-5",
                    radioName: this.RADIO_NAME,
                    radioValue: 'Горизонтальные ламели в стиле Ранчо с двухсторонней зашивкой (шахматка), модель "Рома"',
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/s3/jalousie-fence-photo-7.jpg",
                    titleSpan: 'Горизонтальные ламели в стиле Жалюзи',
                    radioId: "lamel-6",
                    radioName: this.RADIO_NAME,
                    radioValue: "Горизонтальные ламели в стиле Жалюзи",
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/s3/kviz-rascheska.jpg",
                    titleSpan: 'Алюминиевое вертикальное заполнение "Расческа"',
                    radioId: "lamel-7",
                    radioName: this.RADIO_NAME,
                    radioValue: 'Алюминиевое вертикальное заполнение "Расческа"',
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/s3/rombus_kviz.jpg",
                    titleSpan: 'Алюминиевые горизонтальные ламели "Ромбус"',
                    radioId: "lamel-8",
                    radioName: this.RADIO_NAME,
                    radioValue: 'Алюминиевые горизонтальные ламели "Ромбус"',
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/s3/alum-rancho-kviz.jpg",
                    titleSpan: 'Алюминиевые горизонтальные ламели в стиле Ранчо',
                    radioId: "lamel-9",
                    radioName: this.RADIO_NAME,
                    radioValue: 'Алюминиевые горизонтальные ламели в стиле Ранчо',
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/s3/shtaketnik-photo-7.jpg",
                    titleSpan: 'Вертикальный металлический штактетник с односторонней зашивкой',
                    radioId: "lamel-10",
                    radioName: this.RADIO_NAME,
                    radioValue: 'Вертикальный металлический штактетник с односторонней зашивкой',
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/s3/shtaketnik2.jpg",
                    titleSpan: 'Вертикальный металлический штактетник с двухсторонней зашивкой',
                    radioId: "lamel-11",
                    radioName: this.RADIO_NAME,
                    radioValue: 'Вертикальный металлический штактетник с двухсторонней зашивкой',
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/s3/3d-fence_photo_5.jpg",
                    titleSpan: '3D-сетка',
                    radioId: "lamel-12",
                    radioName: this.RADIO_NAME,
                    radioValue: '3D-сетка',
                    isChecked: false
                },
            ],
        };
        this.button = null;
        this.form = null;
        this.title = '';
        this.isFirst = false;
        this.nameStep = '';
        this.button = button;
        this.title = title;
        this.isFirst = isFirst;
        this.stepData = {};
        this.nameStep = nameStep;
    }
    step() {
        this.clearContainer();
        this.form = (0, domStep1_1.domStep1)(this.domData);
        this.fillContainer(this.form);
    }
    selectData() {
        if (this.form) {
            for (let el of this.form.elements) {
                if (el instanceof HTMLInputElement && el.type === "radio") {
                    if (el.checked) {
                        this.stepData.variant = el.value;
                    }
                }
            }
        }
    }
}
exports.Step3 = Step3;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*************************!*\
  !*** ./public/steps.ts ***!
  \*************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const QuizeResult_1 = __webpack_require__(/*! ./src/QuizeResult */ "./public/src/QuizeResult.ts");
const Step1_1 = __webpack_require__(/*! ./src/steppers/Step1 */ "./public/src/steppers/Step1.ts");
const Step3_1 = __webpack_require__(/*! ./src/steppers/Step3 */ "./public/src/steppers/Step3.ts");
const CONTAINER = document.getElementById('content-container');
const navButton1 = document.getElementById('step-1');
// const navButton2 = document.getElementById('step-2') as HTMLButtonElement;
const navButton3 = document.getElementById('step-3');
// const navButton4 = document.getElementById('step-4') as HTMLButtonElement;
// const navButton5 = document.getElementById('step-5') as HTMLButtonElement;
// const navButton6 = document.getElementById('step-6') as HTMLButtonElement;
// const navButton7 = document.getElementById('step-7') as HTMLButtonElement;
// const navButton8 = document.getElementById('step-8') as HTMLButtonElement;
const buttonPrev = document.getElementById('prev-step');
const buttonNext = document.getElementById('next-step');
const s1 = new Step1_1.Step1('step1', CONTAINER, navButton1, 'Выберите вариант компоновки столбов', true);
const s3 = new Step3_1.Step3('step3', CONTAINER, navButton3, 'Выберите заполнение между столбами', false);
const quize = new QuizeResult_1.QuizeResult([s1, s3], buttonPrev, buttonNext);
quize.init();
const tagInput = document.querySelectorAll('input[type="radio"]');
tagInput.forEach((elem) => {
    elem.addEventListener("change", (e) => {
        const form = e.target.form;
        quize.change(form);
        quize.stepsDataResult();
    });
});

})();

/******/ })()
;
//# sourceMappingURL=steps.js.map