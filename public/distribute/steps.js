/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/src/QuizeResult.ts":
/*!***********************************!*\
  !*** ./public/src/QuizeResult.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuizeResult = void 0;
const domStep1_1 = __webpack_require__(/*! ./domManip/domStep1 */ "./public/src/domManip/domStep1.ts");
const domStep2_1 = __webpack_require__(/*! ./domManip/domStep2 */ "./public/src/domManip/domStep2.ts");
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
        this.steps.forEach(s => {
            (0, domStep1_1.disableButton)(s.button, true);
        });
        (_a = this.btnPrev) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.prevStep.bind(this));
        (_b = this.btnNext) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.nextStep.bind(this));
        this.currentStep = this.steps[this.counter];
        this.selectNavButtonCurrentStep(this.currentStep);
        this.currentStep.step();
    }
    selectNavButtonCurrentStep(cs) {
        var _a;
        this.steps.forEach(s => {
            var _a;
            (0, domStep1_1.disableButton)(s.button, true);
            (_a = cs.button) === null || _a === void 0 ? void 0 : _a.classList.remove('select-border-focus-on');
        });
        (0, domStep1_1.disableButton)(cs.button, false);
        (_a = cs.button) === null || _a === void 0 ? void 0 : _a.classList.add('select-border-focus-on');
    }
    prevStep() {
        if (this.counter < 0) {
            this.counter = 0;
        }
        else {
            this.currentStep.selectData();
            this.counter--;
            if (this.counter >= 0) {
                this.currentStep = this.steps[this.counter];
                this.selectNavButtonCurrentStep(this.currentStep);
                this.currentStep.step();
            }
            else {
                this.counter = 0;
            }
        }
        this.stepsDataResult();
    }
    nextStep() {
        var _a;
        if (this.counter >= this.steps.length - 1) {
            return;
        }
        else {
            this.currentStep.selectData();
            if (this.currentStep.isBlockNext) {
                const err = (0, domStep2_1.blockedNextStep)('Пожалуйста укажите местоположение');
                (_a = this.currentStep) === null || _a === void 0 ? void 0 : _a.cnt.appendChild(err);
                (0, domStep2_1.deleteErrorBlock)(this.currentStep.cnt, err, 2000);
                return;
            }
            this.counter++;
            if (this.counter <= this.steps.length) {
                this.currentStep = this.steps[this.counter];
                this.selectNavButtonCurrentStep(this.currentStep);
                this.currentStep.step();
            }
            else {
                this.counter = this.steps.length - 1;
            }
        }
        this.stepsDataResult();
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
exports.domStep1 = exports.setTitleStep = exports.disableButton = void 0;
function disableButton(btn, isDisable = true) {
    if (btn) {
        if (isDisable) {
            btn.classList.remove('button-nav-disable-false', 'button-nav-disable-false:focus');
            btn.classList.add('button-nav-disable-true');
        }
        else {
            btn.classList.remove('button-nav-disable-true');
            btn.classList.add('button-nav-disable-false', 'button-nav-disable-false:focus');
        }
        btn.disabled = isDisable;
    }
}
exports.disableButton = disableButton;
function setTitleStep(title = '') {
    const ptitle = document.getElementById('titleStep');
    ptitle.textContent = title;
}
exports.setTitleStep = setTitleStep;
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

/***/ "./public/src/domManip/domStep2.ts":
/*!*****************************************!*\
  !*** ./public/src/domManip/domStep2.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteErrorBlock = exports.blockedNextStep = exports.domStep2 = void 0;
function domStep2(domData) {
    const form = document.createElement('form');
    form.setAttribute('id', domData.idForm);
    const cntdiv = document.createElement('div');
    cntdiv.classList.add('container');
    const divg = document.createElement('div');
    divg.classList.add('form-group', 'step-2-area-div');
    const label = document.createElement('label');
    label.setAttribute('for', domData.idInput);
    label.textContent = "Напишите Ваше примерное местоположение:";
    const inputarea = document.createElement('textarea');
    inputarea.setAttribute('rows', '5');
    inputarea.setAttribute('placeholder', domData.titleInput);
    inputarea.setAttribute('id', domData.idInput);
    inputarea.setAttribute('name', 'address');
    divg.appendChild(label);
    divg.appendChild(inputarea);
    cntdiv.appendChild(divg);
    form.appendChild(cntdiv);
    return form;
}
exports.domStep2 = domStep2;
function blockedNextStep(message) {
    const div = document.createElement('div');
    div.classList.add('error-next');
    const p = document.createElement('p');
    p.textContent = message;
    div.appendChild(p);
    return div;
}
exports.blockedNextStep = blockedNextStep;
function deleteErrorBlock(cnt, err, delayDel) {
    if (cnt)
        window.setTimeout(() => {
            cnt.removeChild(err);
        }, delayDel);
}
exports.deleteErrorBlock = deleteErrorBlock;
// <textarea class="form-control" rows="5" id="comment"></textarea>
// <div class="form-group">
//     <label for="email">Email:</label>
//     <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
// </div>


/***/ }),

/***/ "./public/src/domManip/domStep5.ts":
/*!*****************************************!*\
  !*** ./public/src/domManip/domStep5.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.domStep6 = exports.domStep5 = void 0;
function domStep5(domData) {
    const form = document.createElement('form');
    form.setAttribute('id', domData.idForm);
    for (let vars of domData.variants) {
        const block = createDiv5(vars.imgSrc, vars.titleRadioGroup, vars.nameRadioGroup, vars.radios, domData.idForm);
        form.appendChild(block);
    }
    return form;
}
exports.domStep5 = domStep5;
function createDiv5(imgsrc, titleRadio, nameRadioG, radios, id) {
    const div = document.createElement('div');
    div.classList.add('div-main-rgroup');
    const divImg = document.createElement('div');
    divImg.classList.add('div-img');
    const img = document.createElement('img');
    img.setAttribute('src', imgsrc);
    divImg.appendChild(img);
    const divRadioGroup = document.createElement('div');
    divRadioGroup.classList.add('div-rgroup');
    const titleRadioGroup = document.createElement('div');
    const ptitle = document.createElement('p');
    ptitle.textContent = titleRadio;
    titleRadioGroup.appendChild(ptitle);
    const divGroup = document.createElement('div');
    radios.forEach((r, i) => {
        const rinput = document.createElement('input');
        const rlabel = document.createElement('label');
        rinput.setAttribute('type', 'radio');
        rinput.setAttribute('id', `${id}-rg-${i}`);
        rinput.setAttribute('name', nameRadioG);
        rinput.setAttribute('value', r);
        rlabel.setAttribute('for', `${id}-rg-${i}`);
        rlabel.textContent = r;
        if (i === 0)
            rinput.checked = true;
        rlabel.appendChild(rinput);
        divGroup.appendChild(rlabel);
    });
    divRadioGroup.appendChild(titleRadioGroup);
    divRadioGroup.appendChild(divGroup);
    div.appendChild(divImg);
    div.appendChild(divRadioGroup);
    return div;
}
// <input type="radio" id="contactChoice1" name="contact" value="email" />
// <label for="contactChoice1">Email</label>
function domStep6(domData) {
    const form = document.createElement('form');
    form.setAttribute('id', domData.idForm);
    domData.variants.forEach((v) => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        div.classList.add('step-6-style');
        img.setAttribute('src', v.imgSrc);
        div.appendChild(img);
        const divGroup = document.createElement('div');
        divGroup.classList.add('step-6-radgroup');
        v.radios.forEach((r, i) => {
            const rinput = document.createElement('input');
            const rlabel = document.createElement('label');
            rinput.setAttribute('type', 'radio');
            rinput.setAttribute('id', `${domData.idForm}-rg-${i}`);
            rinput.setAttribute('name', v.nameRadioGroup);
            rinput.setAttribute('value', r);
            rlabel.setAttribute('for', `${domData.idForm}-rg-${i}`);
            rlabel.textContent = r;
            if (i === 0)
                rinput.checked = true;
            rlabel.appendChild(rinput);
            divGroup.appendChild(rlabel);
        });
        form.appendChild(divGroup);
        form.appendChild(div);
    });
    return form;
}
exports.domStep6 = domStep6;


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
        this.button = null;
        this.isBlockNext = false;
        this.cnt = container;
    }
    evnImg(e) {
        var _a;
        const input = (_a = e.target.nextSibling) === null || _a === void 0 ? void 0 : _a.childNodes;
        input === null || input === void 0 ? void 0 : input.forEach(i => {
            if (i instanceof HTMLInputElement) {
                i.checked = true;
            }
        });
    }
    getStepData() {
        return this.stepData;
    }
    fillContainer(obj) {
        if (this.cnt)
            this.cnt.appendChild(obj);
        const tagImg = document.querySelectorAll('img');
        if (tagImg) {
            tagImg.forEach((el) => {
                el.addEventListener('click', this.evnImg.bind(this));
            });
        }
    }
    clearContainer() {
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
    addData(key, value) {
        this.stepData[key] = value;
    }
    checkedBack() {
        if (this.form && this.stepData.variant != '') {
            for (let elem of this.form.elements) {
                if (elem instanceof HTMLInputElement && elem.type === "radio" &&
                    (elem.value === this.stepData[elem.name] || elem.value === this.stepData.variant)) {
                    elem.checked = true;
                }
            }
        }
        if (this.form && this.stepData['adress']) {
            for (let elem of this.form.elements) {
                if (elem instanceof HTMLTextAreaElement) {
                    elem.textContent = this.stepData['adress'];
                }
            }
        }
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
        (0, domStep1_1.setTitleStep)();
        this.form = (0, domStep1_1.domStep1)(this.domData);
        (0, domStep1_1.setTitleStep)(this.title);
        this.fillContainer(this.form);
        this.checkedBack();
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

/***/ "./public/src/steppers/Step2.ts":
/*!**************************************!*\
  !*** ./public/src/steppers/Step2.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Step2 = void 0;
const domStep1_1 = __webpack_require__(/*! ../domManip/domStep1 */ "./public/src/domManip/domStep1.ts");
const domStep2_1 = __webpack_require__(/*! ../domManip/domStep2 */ "./public/src/domManip/domStep2.ts");
const Step_1 = __webpack_require__(/*! ./Step */ "./public/src/steppers/Step.ts");
class Step2 extends Step_1.Step {
    constructor(nameStep, container, button, title = '', isFirst = false) {
        super(container);
        this.RADIO_NAME = "step-2";
        this.domData = {
            idForm: 'form-step-2',
            titleInput: 'Укажите Ваше примерное или точное местоположение',
            nameInput: 'sity',
            idInput: 'step-2-input-form'
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
        (0, domStep1_1.setTitleStep)();
        this.form = (0, domStep2_1.domStep2)(this.domData);
        (0, domStep1_1.setTitleStep)(this.title);
        this.fillContainer(this.form);
        this.checkedBack();
    }
    selectData() {
        if (this.form) {
            for (let el of this.form.elements) {
                if (el instanceof HTMLInputElement && el.type === "radio") {
                    if (el.checked) {
                        this.stepData[el.name] = el.value;
                    }
                }
                else if (el instanceof HTMLTextAreaElement) {
                    if (el.value.trim().length > 0) {
                        this.stepData['adress'] = el.value;
                        this.isBlockNext = false;
                    }
                    else {
                        this.isBlockNext = true;
                    }
                }
            }
        }
    }
}
exports.Step2 = Step2;


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
        (0, domStep1_1.setTitleStep)();
        this.form = (0, domStep1_1.domStep1)(this.domData);
        (0, domStep1_1.setTitleStep)(this.title);
        this.fillContainer(this.form);
        this.checkedBack();
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


/***/ }),

/***/ "./public/src/steppers/Step5.ts":
/*!**************************************!*\
  !*** ./public/src/steppers/Step5.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Step5 = void 0;
const domStep1_1 = __webpack_require__(/*! ../domManip/domStep1 */ "./public/src/domManip/domStep1.ts");
const domStep5_1 = __webpack_require__(/*! ../domManip/domStep5 */ "./public/src/domManip/domStep5.ts");
const Step_1 = __webpack_require__(/*! ./Step */ "./public/src/steppers/Step.ts");
class Step5 extends Step_1.Step {
    constructor(nameStep, container, button, title = '', isFirst = false) {
        super(container);
        this.RADIO_NAME = "step-5";
        this.domData = {
            idForm: 'form-step-5',
            variants: [
                {
                    imgSrc: 'styles/stepsimg/s5/it-3-1.jpg',
                    titleRadioGroup: 'Откатные ворота (выбрать длину)',
                    nameRadioGroup: 'otkatnie',
                    radios: ['3.5 м', '4 м', '4.5 м', '5 м', 'не надо']
                },
                {
                    imgSrc: 'styles/stepsimg/s5/it-3-2.jpg',
                    titleRadioGroup: 'Распашные ворота (выбрать длину)',
                    nameRadioGroup: 'raspashnie',
                    radios: ['3.5 м', '4 м', '4.5 м', 'не надо']
                },
                {
                    imgSrc: 'styles/stepsimg/s5/it-3-3.jpg',
                    titleRadioGroup: 'Калитка (выбрать ширину)',
                    nameRadioGroup: 'kalitka',
                    radios: ['1 м', '1.2 м', 'не надо']
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
        (0, domStep1_1.setTitleStep)();
        this.form = (0, domStep5_1.domStep5)(this.domData);
        (0, domStep1_1.setTitleStep)(this.title);
        this.fillContainer(this.form);
        this.checkedBack();
    }
    selectData() {
        if (this.form) {
            for (let el of this.form.elements) {
                if (el instanceof HTMLInputElement && el.type === "radio") {
                    if (el.checked) {
                        this.stepData[el.name] = el.value;
                    }
                }
            }
        }
    }
}
exports.Step5 = Step5;


/***/ }),

/***/ "./public/src/steppers/Step6.ts":
/*!**************************************!*\
  !*** ./public/src/steppers/Step6.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Step6 = void 0;
const domStep1_1 = __webpack_require__(/*! ../domManip/domStep1 */ "./public/src/domManip/domStep1.ts");
const domStep5_1 = __webpack_require__(/*! ../domManip/domStep5 */ "./public/src/domManip/domStep5.ts");
const Step_1 = __webpack_require__(/*! ./Step */ "./public/src/steppers/Step.ts");
class Step6 extends Step_1.Step {
    constructor(nameStep, container, button, title = '', isFirst = false) {
        super(container);
        this.RADIO_NAME = "step-6";
        this.domData = {
            idForm: 'form-step-6',
            variants: [
                {
                    imgSrc: 'styles/stepsimg/s6/it-5-1.jpg',
                    titleRadioGroup: '',
                    nameRadioGroup: 'isAutmatic',
                    radios: ['Да', 'Нет']
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
        (0, domStep1_1.setTitleStep)();
        this.form = (0, domStep5_1.domStep6)(this.domData);
        (0, domStep1_1.setTitleStep)(this.title);
        this.fillContainer(this.form);
        this.checkedBack();
    }
    selectData() {
        if (this.form) {
            for (let el of this.form.elements) {
                if (el instanceof HTMLInputElement && el.type === "radio") {
                    if (el.checked) {
                        this.stepData[el.name] = el.value;
                    }
                }
            }
        }
    }
}
exports.Step6 = Step6;


/***/ }),

/***/ "./public/src/steppers/Step7.ts":
/*!**************************************!*\
  !*** ./public/src/steppers/Step7.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Step7 = void 0;
const domStep1_1 = __webpack_require__(/*! ../domManip/domStep1 */ "./public/src/domManip/domStep1.ts");
const domStep5_1 = __webpack_require__(/*! ../domManip/domStep5 */ "./public/src/domManip/domStep5.ts");
const Step_1 = __webpack_require__(/*! ./Step */ "./public/src/steppers/Step.ts");
class Step7 extends Step_1.Step {
    constructor(nameStep, container, button, title = '', isFirst = false) {
        super(container);
        this.RADIO_NAME = "step-7";
        this.domData = {
            idForm: 'form-step-7',
            variants: [
                {
                    imgSrc: 'styles/stepsimg/s7/it-6-2.png',
                    titleRadioGroup: '',
                    nameRadioGroup: 'isMounth',
                    radios: ['Да', 'Нет']
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
        (0, domStep1_1.setTitleStep)();
        this.form = (0, domStep5_1.domStep6)(this.domData);
        (0, domStep1_1.setTitleStep)(this.title);
        this.fillContainer(this.form);
        this.checkedBack();
    }
    selectData() {
        if (this.form) {
            for (let el of this.form.elements) {
                if (el instanceof HTMLInputElement && el.type === "radio") {
                    if (el.checked) {
                        this.stepData[el.name] = el.value;
                    }
                }
            }
        }
    }
}
exports.Step7 = Step7;


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
const domStep1_1 = __webpack_require__(/*! ./src/domManip/domStep1 */ "./public/src/domManip/domStep1.ts");
const Step1_1 = __webpack_require__(/*! ./src/steppers/Step1 */ "./public/src/steppers/Step1.ts");
const Step2_1 = __webpack_require__(/*! ./src/steppers/Step2 */ "./public/src/steppers/Step2.ts");
const Step3_1 = __webpack_require__(/*! ./src/steppers/Step3 */ "./public/src/steppers/Step3.ts");
const Step5_1 = __webpack_require__(/*! ./src/steppers/Step5 */ "./public/src/steppers/Step5.ts");
const Step6_1 = __webpack_require__(/*! ./src/steppers/Step6 */ "./public/src/steppers/Step6.ts");
const Step7_1 = __webpack_require__(/*! ./src/steppers/Step7 */ "./public/src/steppers/Step7.ts");
const CONTAINER = document.getElementById('content-container');
const navButton1 = document.getElementById('step-1');
const navButton2 = document.getElementById('step-2');
const navButton3 = document.getElementById('step-3');
const navButton4 = document.getElementById('step-4');
const navButton5 = document.getElementById('step-5');
const navButton6 = document.getElementById('step-6');
const navButton7 = document.getElementById('step-7');
const navButton8 = document.getElementById('step-8');
const navButtons = [navButton1, navButton2, navButton3, navButton4, navButton5,
    navButton6, navButton7, navButton8];
navButtons.forEach(v => {
    (0, domStep1_1.disableButton)(v, true);
});
const buttonPrev = document.getElementById('prev-step');
const buttonNext = document.getElementById('next-step');
const s1 = new Step1_1.Step1('step1', CONTAINER, navButton1, 'Выберите вариант компоновки столбов', true);
const s2 = new Step2_1.Step2('step2', CONTAINER, navButton2, 'Пожалуйста, укажите Ваше примерное или точное местоположение', false);
const s3 = new Step3_1.Step3('step3', CONTAINER, navButton3, 'Выберите заполнение между столбами', false);
const s5 = new Step5_1.Step5('step5', CONTAINER, navButton5, 'Выберите тип ворот, калитку и их размер', false);
const s6 = new Step6_1.Step6('step6', CONTAINER, navButton6, 'Нужна ли автоматика для ворот?', false);
const s7 = new Step7_1.Step7('step7', CONTAINER, navButton7, 'Нужен ли монтаж забора?', false);
const quize = new QuizeResult_1.QuizeResult([s1, s2, s3, s5, s6, s7], buttonPrev, buttonNext);
quize.init();
const tagInput = document.querySelectorAll('input[type="radio"]');
tagInput.forEach((elem) => {
    elem.addEventListener("change", (e) => {
        const form = e.target.form;
        quize.change(form);
    });
});

})();

/******/ })()
;
//# sourceMappingURL=steps.js.map