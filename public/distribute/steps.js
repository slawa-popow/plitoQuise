/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/src/QuizeResult.ts":
/*!***********************************!*\
  !*** ./public/src/QuizeResult.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuizeResult = void 0;
const domStep1_1 = __webpack_require__(/*! ./domManip/domStep1 */ "./public/src/domManip/domStep1.ts");
const domStep2_1 = __webpack_require__(/*! ./domManip/domStep2 */ "./public/src/domManip/domStep2.ts");
const settings_1 = __webpack_require__(/*! ./settings */ "./public/src/settings.ts");
const StepFinish_1 = __webpack_require__(/*! ./steppers/StepFinish */ "./public/src/steppers/StepFinish.ts");
var Error;
(function (Error) {
    Error["ERR"] = "red";
    Error["OK"] = "green";
})(Error || (Error = {}));
class QuizeResult {
    constructor(steps, btnPrev, btnNext) {
        this.cnt = null; // контейнер
        this.btnPrev = null; // кнопка назад
        this.btnNext = null; // кнопка вперед
        this.steps = []; // шаги
        this.counter = 0; // счетчик шагов
        this.currentStep = null; // текущий шаг
        this.sendData = null; // данные из шагов для отправки на сервер 
        this.steps = [...steps];
        this.btnPrev = btnPrev;
        this.btnNext = btnNext;
        this.counter = 0;
    }
    init() {
        var _a, _b;
        // заблочить все кнопки навигации и кнопке финиш назначить колбек отправки формы
        this.steps.forEach(s => {
            (0, domStep1_1.disableButton)(s.button, true);
            if (s instanceof StepFinish_1.StepFinish && s.nameStep === 'step_finish') {
                s.setCallbackButtonSubmit(this.sendFinish.bind(this));
            }
        });
        (_a = this.btnPrev) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.prevStep.bind(this)); // обработчик назад
        (_b = this.btnNext) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.nextStep.bind(this)); // обработчик вперед
        this.currentStep = this.steps[this.counter]; // выбрать текущий шаг № 1
        this.selectNavButtonCurrentStep(this.currentStep); // выделить кнопку текущего шага
        this.currentStep.step(); // наполнить контейнер текущим шагом
    }
    /**
     *
     * Сформировать ответ для сервера и отправить
     * данные выбранных шагов. (шаг финиш, кнопка отправить)
     */
    sendFinish(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            this.stepsDataResult();
            if (this.sendData) {
                const response = yield fetch(settings_1.settings.HOST + 'sendQuizData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(this.sendData)
                });
                const result = yield response.json();
                if (result && result.status && result.status != '') {
                    this.sendErrMessage(Error.OK, result.status);
                }
                else {
                    this.sendErrMessage(Error.ERR, 'Ошибка. Попробуйте отправить еще раз.');
                }
            }
        });
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
    /**
     * назад
     */
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
    }
    /**
     * вперед
     */
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
    }
    // при нажатии на radio input в текущий шаг записывается результат выбора
    change(form) {
        for (let s of this.steps) {
            if (s.form && form.id === s.form.id)
                s.selectData();
        }
    }
    isValid(eltype, elvalue) {
        const v = elvalue.trim();
        switch (eltype) {
            case 'text': {
                if (v.length > 0 && v.length <= 25)
                    return true;
                break;
            }
            case 'tel': {
                if (v.length > 0 && v.length <= 30)
                    return true;
                break;
            }
        }
        return false;
    }
    /**
     * Сообщение об ошибках при отправке формы
     * @param msg text
     */
    sendErrMessage(typeErr = Error.ERR, msg = '') {
        const errmsg = document.getElementById('spanerr');
        errmsg.textContent = msg;
        errmsg.setAttribute('style', `display: block; color: ${typeErr}; font-size: 0.8em;`);
    }
    // выборка данных из всех шагов и миним. валидация формы "отправить"
    // span id=spanerr - сообщение ошибки 
    stepsDataResult() {
        this.sendData = null;
        const sendData = {
            name: '',
            phone: '',
            color_fence_block: '',
            height_fence: '',
            total_lenght_fence: '',
            lenght_between_colls: '',
            how_many_wickets: '',
            width_wicket: '',
            width_second_wicket: '',
            how_many_gates: '',
            width_gates: '',
            width_second_gates: '',
            var_comp_coll: '',
            fill_between_coll: '',
            isAutomatic: '',
            isMount: '',
            city: ''
        }; // формирование данных из шагов для отправки
        this.sendErrMessage();
        for (let s of this.steps) {
            if (s.form.id === 'form-step-finish') {
                const formfin = s.form;
                if (formfin) {
                    for (let elem of formfin) {
                        if (elem instanceof HTMLInputElement && ((elem.type === 'text' || elem.type === 'tel'))) {
                            if (!this.isValid(elem.type, elem.value)) {
                                this.sendErrMessage(Error.ERR, 'Заполните поля "имя" и "№ телефона"');
                                this.sendData = null;
                                return;
                            }
                        }
                    }
                }
            }
            const sname = s.nameStep;
            const sdata = s.getStepData();
            if (sname === 'step3')
                sendData.color_fence_block = sdata.variant || '';
            else if (sname === 'step4')
                sendData.height_fence = parseFloat(sdata.height_zabor || '');
            else if (sname === 'step5')
                sendData.total_lenght_fence = parseFloat(sdata.length_zabora || '0');
            else if (sname === 'step6')
                sendData.lenght_between_colls = parseFloat(sdata.length_between_stolbami_zabora || '');
            else if (sname === 'step7')
                sendData.how_many_wickets = parseInt(sdata.how_many_wickets || '');
            else if (sname === 'step9') {
                sendData.width_gates = `откатные: ${parseFloat((sdata.otkatnie != 'не надо') ? sdata.otkatnie : '0')}/распашные: ${parseFloat((sdata.raspashnie != 'не надо') ? sdata.raspashnie : '0')}`;
                sendData.width_wicket = parseFloat((sdata.kalitka != 'не надо') ? sdata.kalitka : '0');
            }
            else if (sname === 'step99') {
                sendData.width_second_gates = `откатные: ${parseFloat((sdata.second_otkatnie != 'не надо') ? sdata.second_otkatnie : '0')}/распашные: ${parseFloat((sdata.second_raspashnie != 'не надо') ? sdata.second_raspashnie : '0')}`;
                sendData.width_second_wicket = parseFloat((sdata.second_kalitka != 'не надо') ? sdata.second_kalitka : '0');
            }
            else if (sname === 'step8') {
                sendData.how_many_gates = parseInt(sdata.how_many_gates || '');
            }
            else if (sname === 'step_finish') {
                sendData.name = sdata.clientName || '';
                sendData.phone = sdata.clientTel || '';
            }
            else if (sname === 'step1')
                sendData.var_comp_coll = sdata.variant || '';
            else if (sname === 'step2')
                sendData.fill_between_coll = sdata.variant || '';
            else if (sname === 'step10')
                sendData.isAutomatic = sdata.isAutmatic || '';
            else if (sname === 'step11')
                sendData.isMount = sdata.isMounth || '';
            else if (sname === 'step12')
                sendData.city = sdata.adress || '';
            // console.log(s.nameStep, s.getStepData())
        } // efor
        this.sendData = sendData;
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
exports.domStep6 = exports.domStepN6 = exports.domStep5 = void 0;
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
function domStepN6(domData) {
    const form = document.createElement('form');
    form.setAttribute('id', domData.idForm);
    const cdiv = document.createElement('div');
    cdiv.classList.add('container');
    const div = document.createElement('div');
    div.classList.add('form-group', 'step-2-area-div');
    domData.variants.forEach((v, i) => {
        const rinput = document.createElement('input');
        const rlabel = document.createElement('label');
        rinput.setAttribute('type', 'text');
        rinput.setAttribute('style', 'max-width: 200px;');
        rinput.setAttribute('id', `${domData.idForm}-N-${i}`);
        rinput.setAttribute('name', v.nameRadioGroup);
        rinput.setAttribute('placeholder', v.titleRadioGroup);
        rlabel.setAttribute('for', `${domData.idForm}-N-${i}`);
        rlabel.textContent = v.titleRadioGroup;
        div.appendChild(rlabel);
        div.appendChild(rinput);
    });
    cdiv.appendChild(div);
    form.appendChild(cdiv);
    return form;
}
exports.domStepN6 = domStepN6;
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

/***/ "./public/src/domManip/domStepFinish.ts":
/*!**********************************************!*\
  !*** ./public/src/domManip/domStepFinish.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.domStepFinish = void 0;
function domStepFinish(domData, callback) {
    const form = document.createElement('form');
    form.setAttribute('id', domData.idForm);
    const div = document.createElement('div');
    div.classList.add('formdiv');
    const ddiv = document.createElement('div');
    const fdata = `
        <div class="form-group form-div-send">
            <span id="spanerr" style="display: block; color: red; font-size: 0.8em;"></span>
            <label for="${domData.inputNameName}">Ваше имя:</label>
            <input type="text" class="form-control" id="${domData.inputNameName}" required placeholder="Ваше имя">
        
            <label for="${domData.inputTelName}">Ваш № телефона:</label>
            <input type="tel" class="form-control" id="${domData.inputTelName}" required placeholder="+375 (_ _) _ _ _ - _ _ - _ _">
        </div>
    `;
    ddiv.innerHTML = fdata;
    const button = document.createElement('button');
    button.setAttribute('id', 'button-submit-steps');
    button.textContent = 'Отправить';
    button.addEventListener('click', callback);
    ddiv.appendChild(button);
    div.appendChild(ddiv);
    const idiv = document.createElement('div');
    const ico = document.createElement('img');
    ico.setAttribute('src', domData.imgSrc || '');
    idiv.appendChild(ico);
    div.appendChild(idiv);
    form.appendChild(div);
    return form;
}
exports.domStepFinish = domStepFinish;


/***/ }),

/***/ "./public/src/settings.ts":
/*!********************************!*\
  !*** ./public/src/settings.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.settings = void 0;
exports.settings = (() => {
    const HOST = '/';
    // const HOST = '';
    return {
        HOST
    };
})();


/***/ }),

/***/ "./public/src/steppers/HowManyGates.ts":
/*!*********************************************!*\
  !*** ./public/src/steppers/HowManyGates.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HowManyGates = void 0;
const domStep1_1 = __webpack_require__(/*! ../domManip/domStep1 */ "./public/src/domManip/domStep1.ts");
const domStep5_1 = __webpack_require__(/*! ../domManip/domStep5 */ "./public/src/domManip/domStep5.ts");
const Step_1 = __webpack_require__(/*! ./Step */ "./public/src/steppers/Step.ts");
class HowManyGates extends Step_1.Step {
    constructor(nameStep, container, button, title = '', isFirst = false) {
        super(container);
        this.RADIO_NAME = "step-N-how-many-gates";
        this.domData = {
            idForm: 'form-step-N-how-gates',
            variants: [
                {
                    imgSrc: '',
                    titleRadioGroup: '',
                    nameRadioGroup: 'how_many_gates',
                    radios: ['1', '2']
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
exports.HowManyGates = HowManyGates;
//


/***/ }),

/***/ "./public/src/steppers/HowManyWickets.ts":
/*!***********************************************!*\
  !*** ./public/src/steppers/HowManyWickets.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HowManyWickets = void 0;
const domStep1_1 = __webpack_require__(/*! ../domManip/domStep1 */ "./public/src/domManip/domStep1.ts");
const domStep5_1 = __webpack_require__(/*! ../domManip/domStep5 */ "./public/src/domManip/domStep5.ts");
const Step_1 = __webpack_require__(/*! ./Step */ "./public/src/steppers/Step.ts");
class HowManyWickets extends Step_1.Step {
    constructor(nameStep, container, button, title = '', isFirst = false) {
        super(container);
        this.RADIO_NAME = "step-N-how-many-wickets";
        this.domData = {
            idForm: 'form-step-N-how-wickets',
            variants: [
                {
                    imgSrc: '',
                    titleRadioGroup: '',
                    nameRadioGroup: 'how_many_wickets',
                    radios: ['1', '2']
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
exports.HowManyWickets = HowManyWickets;
//


/***/ }),

/***/ "./public/src/steppers/SecondStep5.ts":
/*!********************************************!*\
  !*** ./public/src/steppers/SecondStep5.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SecondStep5 = void 0;
const domStep1_1 = __webpack_require__(/*! ../domManip/domStep1 */ "./public/src/domManip/domStep1.ts");
const domStep5_1 = __webpack_require__(/*! ../domManip/domStep5 */ "./public/src/domManip/domStep5.ts");
const Step_1 = __webpack_require__(/*! ./Step */ "./public/src/steppers/Step.ts");
class SecondStep5 extends Step_1.Step {
    constructor(nameStep, container, button, title = '', isFirst = false) {
        super(container);
        this.RADIO_NAME = "step-s5";
        this.domData = {
            idForm: 'form-step-s5',
            variants: [
                {
                    imgSrc: 'styles/stepsimg/s5/it-3-1.jpg',
                    titleRadioGroup: 'Вторые откатные ворота (выбрать длину)',
                    nameRadioGroup: 'second_otkatnie',
                    radios: ['не надо', '3.5 м', '4 м', '4.5 м', '5 м',]
                },
                {
                    imgSrc: 'styles/stepsimg/s5/it-3-2.jpg',
                    titleRadioGroup: 'Вторые распашные ворота (выбрать длину)',
                    nameRadioGroup: 'second_raspashnie',
                    radios: ['не надо', '3.5 м', '4 м', '4.5 м',]
                },
                {
                    imgSrc: 'styles/stepsimg/s5/it-3-3.jpg',
                    titleRadioGroup: 'Вторая калитка (выбрать ширину)',
                    nameRadioGroup: 'second_kalitka',
                    radios: ['не надо', '1 м', '1.2 м',]
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
exports.SecondStep5 = SecondStep5;


/***/ }),

/***/ "./public/src/steppers/Step.ts":
/*!*************************************!*\
  !*** ./public/src/steppers/Step.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Step = void 0;
/**
 * Шаг абстрактный
 */
class Step {
    constructor(container) {
        this.cnt = null; // div контейнер
        this.stepData = {}; // данные шага
        this.form = null; // форма хтмл шага
        this.nameStep = ''; // имя шага
        this.button = null; // кнопка навигации
        this.isBlockNext = false; // для блокировки кнопки "вперед" (шаг напишите местоположение)
        this.cnt = container;
    }
    /**
     * Если нажали на картинку, то ищем в "братьях"
     * input radio и выделяем (выбираем пункт)
     * @param e EventListener
     */
    evnImg(e) {
        var _a;
        const input = (_a = e.target.nextSibling) === null || _a === void 0 ? void 0 : _a.childNodes;
        input === null || input === void 0 ? void 0 : input.forEach(i => {
            if (i instanceof HTMLInputElement) {
                i.checked = true;
            }
        });
    }
    /**
     *
     * Получить данные шага
     */
    getStepData() {
        return this.stepData;
    }
    /**
     * Заполнить контейнер и задать обработчик нажатия на
     * картинку.
     * @param obj - заполнить контейнер этим html объектом
     */
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
    /**
     * Очистить контейнер и удалить обработчик
     * нажатия на картинку
     */
    clearContainer() {
        if (this.cnt)
            for (let domElem of Array.from(this.cnt.children)) {
                this.cnt.removeChild(domElem);
            }
        const tagImg = document.querySelectorAll('img');
        try {
            if (tagImg) {
                tagImg.forEach((el) => {
                    el.removeEventListener('click', this.evnImg.bind(this));
                });
            }
        }
        catch (e) {
            console.log('clearContainer() -> do not remove evn listener img');
        }
    }
    addData(key, value) {
        this.stepData[key] = value;
    }
    /**
     * При перемещении назад-вперед нужно чтобы
     * выбранные данные на каждом шаге не пропали
     * (т-к содержимое шагов динамически наполняется и очищается
     * по нажатии "вперед")
     */
    checkedBack() {
        // && this.stepData.variant != ''
        if (this.form) {
            for (let elem of this.form.elements) {
                if (elem instanceof HTMLInputElement && elem.type === "radio" &&
                    (elem.value === this.stepData[elem.name] || elem.value === this.stepData.variant)) {
                    elem.checked = true;
                }
                if (elem instanceof HTMLInputElement && elem.type === "text" && this.stepData[elem.name]) {
                    elem.value = this.stepData[elem.name];
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
        // данные для отправки "генератору" (формирователю) хтмл 
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
        this.clearContainer(); // очисть контейнер
        (0, domStep1_1.setTitleStep)(); // очистить заголовок шага
        this.form = (0, domStep1_1.domStep1)(this.domData); // сгенерировать хтмл объект формы
        (0, domStep1_1.setTitleStep)(this.title); // задать заголовок шага
        this.fillContainer(this.form); // заполнить контейнер формой с картинками, кнопками итд
        this.checkedBack(); // если в шаг было что-то записано (вернулись сюда) то показать что выбирали
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


/***/ }),

/***/ "./public/src/steppers/StepFinish.ts":
/*!*******************************************!*\
  !*** ./public/src/steppers/StepFinish.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StepFinish = void 0;
const domStep1_1 = __webpack_require__(/*! ../domManip/domStep1 */ "./public/src/domManip/domStep1.ts");
const domStepFinish_1 = __webpack_require__(/*! ../domManip/domStepFinish */ "./public/src/domManip/domStepFinish.ts");
const Step_1 = __webpack_require__(/*! ./Step */ "./public/src/steppers/Step.ts");
class StepFinish extends Step_1.Step {
    constructor(nameStep, container, button, title = '', isFirst = false) {
        super(container);
        this.RADIO_NAME = "";
        this.domData = {
            idForm: 'form-step-finish',
            imgSrc: 'styles/stepsimg/ava.png',
            inputNameName: 'clientName',
            inputTelName: 'clientTel',
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
    // задать калбацк this.submitCallback() -> QuizeResult.sendFinish()
    setCallbackButtonSubmit(clb) {
        this.callbackQuizeResult = clb;
    }
    step() {
        this.clearContainer();
        (0, domStep1_1.setTitleStep)();
        this.form = (0, domStepFinish_1.domStepFinish)(this.domData, this.submitCallback.bind(this));
        (0, domStep1_1.setTitleStep)(this.title);
        this.fillContainer(this.form);
        this.checkedBack();
    }
    // кнопка "Отправить" финиш
    submitCallback(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            this.selectData();
            yield this.callbackQuizeResult(e);
        });
    }
    selectData() {
        if (this.form) {
            for (let el of this.form.elements) {
                if (el instanceof HTMLInputElement && (el.type === "text" || el.type === "tel")) {
                    if (el.value.trim().length > 0) {
                        this.stepData[el.id] = el.value;
                    }
                }
            }
        }
    }
}
exports.StepFinish = StepFinish;


/***/ }),

/***/ "./public/src/steppers/StepN4.ts":
/*!***************************************!*\
  !*** ./public/src/steppers/StepN4.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StepN4 = void 0;
const domStep1_1 = __webpack_require__(/*! ../domManip/domStep1 */ "./public/src/domManip/domStep1.ts");
const Step_1 = __webpack_require__(/*! ./Step */ "./public/src/steppers/Step.ts");
class StepN4 extends Step_1.Step {
    constructor(nameStep, container, button, title = '', isFirst = false) {
        super(container);
        this.RADIO_NAME = "step-N-4";
        // данные для отправки "генератору" (формирователю) хтмл 
        this.domData = {
            idForm: 'form-step-N-1',
            variants: [
                {
                    imgSrc: "styles/stepsimg/nashi/s1/a1.jpg",
                    titleSpan: "Оникс",
                    radioId: "nashi-1-1",
                    radioName: this.RADIO_NAME,
                    radioValue: "Оникс",
                    isChecked: true
                },
                {
                    imgSrc: "styles/stepsimg/nashi/s1/a2.jpg",
                    titleSpan: "Черный микс",
                    radioId: "nashi-1-2",
                    radioName: this.RADIO_NAME,
                    radioValue: "Черный микс",
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/nashi/s1/a3.webp",
                    titleSpan: "Сахара",
                    radioId: "nashi-1-3",
                    radioName: this.RADIO_NAME,
                    radioValue: "Сахара",
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/nashi/s1/a4.webp",
                    titleSpan: "Графит",
                    radioId: "nashi-1-4",
                    radioName: this.RADIO_NAME,
                    radioValue: "Графит",
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/nashi/s1/a5.webp",
                    titleSpan: "Кварц",
                    radioId: "nashi-1-5",
                    radioName: this.RADIO_NAME,
                    radioValue: "Кварц",
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/nashi/s1/a6.webp",
                    titleSpan: "Капучино",
                    radioId: "nashi-1-6",
                    radioName: this.RADIO_NAME,
                    radioValue: "Капучино",
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/nashi/s1/a7.webp",
                    titleSpan: "Шоколад",
                    radioId: "nashi-1-7",
                    radioName: this.RADIO_NAME,
                    radioValue: "Шоколад",
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/nashi/s1/a8.webp",
                    titleSpan: "Тёмный шоколад",
                    radioId: "nashi-1-8",
                    radioName: this.RADIO_NAME,
                    radioValue: "Тёмный шоколад",
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/nashi/s1/a9.webp",
                    titleSpan: "Грей",
                    radioId: "nashi-1-9",
                    radioName: this.RADIO_NAME,
                    radioValue: "Грей",
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/nashi/s1/a10.webp",
                    titleSpan: "Гранат",
                    radioId: "nashi-1-10",
                    radioName: this.RADIO_NAME,
                    radioValue: "Гранат",
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/nashi/s1/a11.webp",
                    titleSpan: "Лава",
                    radioId: "nashi-1-11",
                    radioName: this.RADIO_NAME,
                    radioValue: "Лава",
                    isChecked: false
                },
                {
                    imgSrc: "styles/stepsimg/nashi/s1/a12.webp",
                    titleSpan: "Медный",
                    radioId: "nashi-1-12",
                    radioName: this.RADIO_NAME,
                    radioValue: "Медный",
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
        this.clearContainer(); // очисть контейнер
        (0, domStep1_1.setTitleStep)(); // очистить заголовок шага
        this.form = (0, domStep1_1.domStep1)(this.domData); // сгенерировать хтмл объект формы
        (0, domStep1_1.setTitleStep)(this.title); // задать заголовок шага
        this.fillContainer(this.form); // заполнить контейнер формой с картинками, кнопками итд
        this.checkedBack(); // если в шаг было что-то записано (вернулись сюда) то показать что выбирали
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
exports.StepN4 = StepN4;


/***/ }),

/***/ "./public/src/steppers/StepN5.ts":
/*!***************************************!*\
  !*** ./public/src/steppers/StepN5.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StepN5 = void 0;
const domStep1_1 = __webpack_require__(/*! ../domManip/domStep1 */ "./public/src/domManip/domStep1.ts");
const domStep5_1 = __webpack_require__(/*! ../domManip/domStep5 */ "./public/src/domManip/domStep5.ts");
const Step_1 = __webpack_require__(/*! ./Step */ "./public/src/steppers/Step.ts");
class StepN5 extends Step_1.Step {
    constructor(nameStep, container, button, title = '', isFirst = false) {
        super(container);
        this.RADIO_NAME = "step-N-5";
        this.domData = {
            idForm: 'form-step-N-5',
            variants: [
                {
                    imgSrc: 'styles/stepsimg/nashi/s2/hz.webp',
                    titleRadioGroup: '',
                    nameRadioGroup: 'height_zabor',
                    radios: ['1.6 м', '1.8 м', '2.0 м']
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
exports.StepN5 = StepN5;


/***/ }),

/***/ "./public/src/steppers/StepN6.ts":
/*!***************************************!*\
  !*** ./public/src/steppers/StepN6.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StepN6 = void 0;
const domStep1_1 = __webpack_require__(/*! ../domManip/domStep1 */ "./public/src/domManip/domStep1.ts");
const domStep5_1 = __webpack_require__(/*! ../domManip/domStep5 */ "./public/src/domManip/domStep5.ts");
const Step_1 = __webpack_require__(/*! ./Step */ "./public/src/steppers/Step.ts");
class StepN6 extends Step_1.Step {
    constructor(nameStep, container, button, title = '', isFirst = false) {
        super(container);
        this.RADIO_NAME = "step-N-6";
        this.domData = {
            idForm: 'form-step-N-6',
            variants: [
                {
                    imgSrc: '',
                    titleRadioGroup: 'Введите длину забора (м):',
                    nameRadioGroup: 'length_zabora',
                    radios: []
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
        this.form = (0, domStep5_1.domStepN6)(this.domData);
        (0, domStep1_1.setTitleStep)(this.title);
        this.fillContainer(this.form);
        this.checkedBack();
    }
    selectData() {
        if (this.form) {
            for (let el of this.form.elements) {
                if (el instanceof HTMLInputElement && el.type === "text") {
                    this.stepData[el.name] = el.value;
                }
            }
        }
    }
}
exports.StepN6 = StepN6;


/***/ }),

/***/ "./public/src/steppers/StepN7.ts":
/*!***************************************!*\
  !*** ./public/src/steppers/StepN7.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StepN7 = void 0;
const domStep1_1 = __webpack_require__(/*! ../domManip/domStep1 */ "./public/src/domManip/domStep1.ts");
const domStep5_1 = __webpack_require__(/*! ../domManip/domStep5 */ "./public/src/domManip/domStep5.ts");
const Step_1 = __webpack_require__(/*! ./Step */ "./public/src/steppers/Step.ts");
class StepN7 extends Step_1.Step {
    constructor(nameStep, container, button, title = '', isFirst = false) {
        super(container);
        this.RADIO_NAME = "step-N-7";
        this.domData = {
            idForm: 'form-step-N-7',
            variants: [
                {
                    imgSrc: '',
                    titleRadioGroup: '',
                    nameRadioGroup: 'length_between_stolbami_zabora',
                    radios: ['2.0 м', '2.5 м', '2.75 м', '3.0 м']
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
exports.StepN7 = StepN7;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
const HowManyGates_1 = __webpack_require__(/*! ./src/steppers/HowManyGates */ "./public/src/steppers/HowManyGates.ts");
const HowManyWickets_1 = __webpack_require__(/*! ./src/steppers/HowManyWickets */ "./public/src/steppers/HowManyWickets.ts");
const SecondStep5_1 = __webpack_require__(/*! ./src/steppers/SecondStep5 */ "./public/src/steppers/SecondStep5.ts");
const Step1_1 = __webpack_require__(/*! ./src/steppers/Step1 */ "./public/src/steppers/Step1.ts");
const Step2_1 = __webpack_require__(/*! ./src/steppers/Step2 */ "./public/src/steppers/Step2.ts");
const Step3_1 = __webpack_require__(/*! ./src/steppers/Step3 */ "./public/src/steppers/Step3.ts");
const Step5_1 = __webpack_require__(/*! ./src/steppers/Step5 */ "./public/src/steppers/Step5.ts");
const Step6_1 = __webpack_require__(/*! ./src/steppers/Step6 */ "./public/src/steppers/Step6.ts");
const Step7_1 = __webpack_require__(/*! ./src/steppers/Step7 */ "./public/src/steppers/Step7.ts");
const StepFinish_1 = __webpack_require__(/*! ./src/steppers/StepFinish */ "./public/src/steppers/StepFinish.ts");
const StepN4_1 = __webpack_require__(/*! ./src/steppers/StepN4 */ "./public/src/steppers/StepN4.ts");
const StepN5_1 = __webpack_require__(/*! ./src/steppers/StepN5 */ "./public/src/steppers/StepN5.ts");
const StepN6_1 = __webpack_require__(/*! ./src/steppers/StepN6 */ "./public/src/steppers/StepN6.ts");
const StepN7_1 = __webpack_require__(/*! ./src/steppers/StepN7 */ "./public/src/steppers/StepN7.ts");
// div блок-контейнер дин. контента
const CONTAINER = document.getElementById('content-container');
// кнопки навигации (в этом приложении только как подсветка шагов)
const navButton1 = document.getElementById('step-1');
const navButton2 = document.getElementById('step-2');
const navButton3 = document.getElementById('step-3');
const navButton4 = document.getElementById('step-4');
const navButton5 = document.getElementById('step-5');
const navButton6 = document.getElementById('step-6');
const navButton7 = document.getElementById('step-7');
const navButton8 = document.getElementById('step-8');
const navButton9 = document.getElementById('step-9');
const navButton99 = document.getElementById('step-s9');
const navButton10 = document.getElementById('step-10');
const navButton11 = document.getElementById('step-11');
const navButton12 = document.getElementById('step-12');
const navButton13 = document.getElementById('step-13');
// массив кнопок. Сначала все кнопки заблочены
const navButtons = [navButton1, navButton2, navButton3, navButton4, navButton5,
    navButton6, navButton7, navButton8, navButton9, navButton99, navButton10, navButton11, navButton12, navButton13];
navButtons.forEach(v => {
    (0, domStep1_1.disableButton)(v, true);
});
// кнопки "назад" "вперед"
const buttonPrev = document.getElementById('prev-step');
const buttonNext = document.getElementById('next-step');
// шаги. экземпляры abstrack class Step
const s1 = new Step1_1.Step1('step1', CONTAINER, navButton1, 'Выберите вариант компоновки столбов', true);
const s2 = new Step3_1.Step3('step2', CONTAINER, navButton2, 'Выберите заполнение между столбами', false);
const s3 = new StepN4_1.StepN4('step3', CONTAINER, navButton3, 'Выберите цвет заборного блока', false);
const s4 = new StepN5_1.StepN5('step4', CONTAINER, navButton4, 'Выберите высоту забора', false);
const s5 = new StepN6_1.StepN6('step5', CONTAINER, navButton5, 'Какая общая длина забора в метрах?', false);
const s6 = new StepN7_1.StepN7('step6', CONTAINER, navButton6, 'Выберите желаемое расстояние между столбами', false);
const s7 = new HowManyWickets_1.HowManyWickets('step7', CONTAINER, navButton7, 'Сколько у вас будет калиток?', false);
const s8 = new HowManyGates_1.HowManyGates('step8', CONTAINER, navButton8, 'Сколько у вас будет ворот?', false);
const s9 = new Step5_1.Step5('step9', CONTAINER, navButton9, 'Выберите тип первых ворот, первую калитку и их размер', false);
const s99 = new SecondStep5_1.SecondStep5('step99', CONTAINER, navButton99, 'Выберите тип вторых ворот, вторую калитку и их размер', false);
const s10 = new Step6_1.Step6('step10', CONTAINER, navButton10, 'Нужна ли автоматика для ворот?', false);
const s11 = new Step7_1.Step7('step11', CONTAINER, navButton11, 'Нужен ли монтаж забора?', false);
const s12 = new Step2_1.Step2('step12', CONTAINER, navButton12, 'Пожалуйста, укажите Ваше примерное или точное местоположение', false);
const finish = new StepFinish_1.StepFinish('step_finish', CONTAINER, navButton13, 'Введите, пожалуйста, Ваше имя и контактный номер. Мы свяжемся в Вами в течении нескольких минут.', false);
// объект управляющий шагами
const quize = new QuizeResult_1.QuizeResult([s1, s2, s3, s4, s5, s6, s7, s8, s9, s99, s10, s11, s12, finish], buttonPrev, buttonNext);
quize.init();
// при нажатии на radio input в текущий шаг записывается результат выбора
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