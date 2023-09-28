(()=>{"use strict";var t={186:function(t,e,s){var i=this&&this.__awaiter||function(t,e,s,i){return new(s||(s=Promise))((function(a,o){function n(t){try{l(i.next(t))}catch(t){o(t)}}function r(t){try{l(i.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?a(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(n,r)}l((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.QuizeResult=void 0;const a=s(566),o=s(133),n=s(336),r=s(425);var l;!function(t){t.ERR="red",t.OK="green"}(l||(l={})),e.QuizeResult=class{constructor(t,e,s){this.cnt=null,this.btnPrev=null,this.btnNext=null,this.steps=[],this.counter=0,this.currentStep=null,this.sendData=null,this.steps=[...t],this.btnPrev=e,this.btnNext=s,this.counter=0}init(){var t,e;this.steps.forEach((t=>{(0,a.disableButton)(t.button,!0),t instanceof r.StepFinish&&"step_finish"===t.nameStep&&t.setCallbackButtonSubmit(this.sendFinish.bind(this))})),null===(t=this.btnPrev)||void 0===t||t.addEventListener("click",this.prevStep.bind(this)),null===(e=this.btnNext)||void 0===e||e.addEventListener("click",this.nextStep.bind(this)),this.currentStep=this.steps[this.counter],this.selectNavButtonCurrentStep(this.currentStep),this.currentStep.step()}sendFinish(t){return i(this,void 0,void 0,(function*(){if(t.preventDefault(),this.stepsDataResult(),this.sendData){const t=yield fetch(n.settings.HOST+"sendquizdata",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(this.sendData)}),e=yield t.json();if(console.log(e.status),e&&e.status&&""!=e.status)if("ok"===e.status){this.sendErrMessage(l.OK,e.status);const t=e.rowId;try{window.Telegram.WebApp.ready(),window.Telegram.WebApp.sendData(t),window.Telegram.WebApp.close(),setTimeout((()=>{console.log("redirect to url"),window.location.href="https://plitochka-quiz.vercel.app"}),4e3)}catch(t){}}else"redirect"===e.status&&(window.location.href=n.settings.HOST);else this.sendErrMessage(l.ERR,"Ошибка. Попробуйте отправить еще раз.")}}))}selectNavButtonCurrentStep(t){var e;this.steps.forEach((e=>{var s;(0,a.disableButton)(e.button,!0),null===(s=t.button)||void 0===s||s.classList.remove("select-border-focus-on")})),(0,a.disableButton)(t.button,!1),null===(e=t.button)||void 0===e||e.classList.add("select-border-focus-on")}prevStep(){this.counter<0?this.counter=0:(this.currentStep.selectData(),this.counter--,this.counter>=0?(this.currentStep=this.steps[this.counter],this.selectNavButtonCurrentStep(this.currentStep),this.currentStep.step()):this.counter=0)}nextStep(){var t;if(!(this.counter>=this.steps.length-1)){if(this.currentStep.selectData(),this.currentStep.isBlockNext){const e=(0,o.blockedNextStep)("Пожалуйста укажите местоположение");return null===(t=this.currentStep)||void 0===t||t.cnt.appendChild(e),void(0,o.deleteErrorBlock)(this.currentStep.cnt,e,2e3)}this.counter++,this.counter<=this.steps.length?(this.currentStep=this.steps[this.counter],this.selectNavButtonCurrentStep(this.currentStep),this.currentStep.step()):this.counter=this.steps.length-1}}change(t){for(let e of this.steps)e.form&&t.id===e.form.id&&e.selectData(),e.bodyScrollDown()}isValid(t,e){const s=e.trim();switch(t){case"text":if(s.length>0&&s.length<=25)return!0;break;case"tel":if(s.length>0&&s.length<=30)return!0}return!1}sendErrMessage(t=l.ERR,e=""){const s=document.getElementById("spanerr");s.textContent=e,s.setAttribute("style",`display: block; color: ${t}; font-size: 0.8em;`)}stepsDataResult(){this.sendData=null;const t={name:"",phone:"",color_fence_block:"",height_fence:"",total_lenght_fence:"",lenght_between_colls:"",how_many_wickets:"",width_wicket:"",width_second_wicket:"",how_many_gates:"",width_gates:"",width_second_gates:"",var_comp_coll:"",fill_between_coll:"",isAutomatic:"",isMount:"",city:""};this.sendErrMessage();for(let e of this.steps){if("form-step-finish"===e.form.id){const t=e.form;if(t)for(let e of t)if(e instanceof HTMLInputElement&&("text"===e.type||"tel"===e.type)&&!this.isValid(e.type,e.value))return this.sendErrMessage(l.ERR,'Заполните поля "имя" и "№ телефона"'),void(this.sendData=null)}const s=e.nameStep,i=e.getStepData();"step3"===s?t.color_fence_block=i.variant||"":"step4"===s?t.height_fence=parseFloat(i.height_zabor||""):"step5"===s?t.total_lenght_fence=parseFloat(i.length_zabora||"1"):"step6"===s?t.lenght_between_colls=parseFloat(i.length_between_stolbami_zabora||""):"step7"===s?t.how_many_wickets=parseInt(i.how_many_wickets||""):"step9"===s?(t.width_gates=`откатные: ${parseFloat("не надо"!=i.otkatnie?i.otkatnie:"0")}/распашные: ${parseFloat("не надо"!=i.raspashnie?i.raspashnie:"0")}`,t.width_wicket=parseFloat("не надо"!=i.kalitka?i.kalitka:"0")):"step99"===s?(t.width_second_gates=`откатные: ${parseFloat("не надо"!=i.second_otkatnie?i.second_otkatnie:"0")}/распашные: ${parseFloat("не надо"!=i.second_raspashnie?i.second_raspashnie:"0")}`,t.width_second_wicket=parseFloat("не надо"!=i.second_kalitka?i.second_kalitka:"0")):"step8"===s?t.how_many_gates=parseInt(i.how_many_gates||""):"step_finish"===s?(t.name=i.clientName||"",t.phone=i.clientTel||""):"step1"===s?t.var_comp_coll=i.variant||"":"step2"===s?t.fill_between_coll=i.variant||"":"step10"===s?t.isAutomatic=i.isAutmatic||"":"step11"===s?t.isMount=i.isMounth||"":"step12"===s&&(t.city=i.adress||"")}this.sendData=t}}},566:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.domStep1=e.setTitleStep=e.disableButton=void 0,e.disableButton=function(t,e=!0){t&&(e?(t.classList.remove("button-nav-disable-false","button-nav-disable-false:focus"),t.classList.add("button-nav-disable-true")):(t.classList.remove("button-nav-disable-true"),t.classList.add("button-nav-disable-false","button-nav-disable-false:focus")),t.disabled=e)},e.setTitleStep=function(t=""){document.getElementById("titleStep").textContent=t},e.domStep1=function(t){const e=document.createElement("form");e.setAttribute("id",t.idForm);const s=document.createElement("ul");s.classList.add("image-gallery");for(let e of t.variants){const t=document.createElement("li"),i=document.createElement("img");i.setAttribute("src",e.imgSrc);const a=document.createElement("div");a.classList.add("check-in");const o=document.createElement("input");o.setAttribute("type","radio"),o.setAttribute("id",e.radioId),o.setAttribute("name",e.radioName),o.setAttribute("value",e.radioValue),o.checked=e.isChecked;const n=document.createElement("span");n.textContent=e.titleSpan,a.appendChild(o),a.appendChild(n),t.appendChild(i),t.appendChild(a),s.appendChild(t)}return e.appendChild(s),e}},133:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.deleteErrorBlock=e.blockedNextStep=e.domStep2=void 0,e.domStep2=function(t){const e=document.createElement("form");e.setAttribute("id",t.idForm);const s=document.createElement("div");s.classList.add("container");const i=document.createElement("div");i.classList.add("form-group","step-2-area-div");const a=document.createElement("label");a.setAttribute("for",t.idInput),a.textContent="Напишите Ваше примерное местоположение:";const o=document.createElement("textarea");return o.setAttribute("rows","5"),o.setAttribute("placeholder",t.titleInput),o.setAttribute("id",t.idInput),o.setAttribute("name","address"),i.appendChild(a),i.appendChild(o),s.appendChild(i),e.appendChild(s),e},e.blockedNextStep=function(t){const e=document.createElement("div");e.classList.add("error-next");const s=document.createElement("p");return s.textContent=t,e.appendChild(s),e},e.deleteErrorBlock=function(t,e,s){t&&window.setTimeout((()=>{t.removeChild(e)}),s)}},78:(t,e)=>{function s(t,e,s,i,a){const o=document.createElement("div");o.classList.add("div-main-rgroup");const n=document.createElement("div");n.classList.add("div-img");const r=document.createElement("img");r.setAttribute("src",t),n.appendChild(r);const l=document.createElement("div");l.classList.add("div-rgroup");const d=document.createElement("div"),c=document.createElement("p");c.textContent=e,d.appendChild(c);const p=document.createElement("div");return i.forEach(((t,e)=>{const i=document.createElement("input"),o=document.createElement("label");i.setAttribute("type","radio"),i.setAttribute("id",`${a}-rg-${e}`),i.setAttribute("name",s),i.setAttribute("value",t),o.setAttribute("for",`${a}-rg-${e}`),o.textContent=t,0===e&&(i.checked=!0),o.appendChild(i),p.appendChild(o)})),l.appendChild(d),l.appendChild(p),o.appendChild(n),o.appendChild(l),o}Object.defineProperty(e,"__esModule",{value:!0}),e.domStep6=e.domStepN6=e.domStep5=void 0,e.domStep5=function(t){const e=document.createElement("form");e.setAttribute("id",t.idForm);for(let i of t.variants){const a=s(i.imgSrc,i.titleRadioGroup,i.nameRadioGroup,i.radios,t.idForm);e.appendChild(a)}return e},e.domStepN6=function(t){const e=document.createElement("form");e.setAttribute("id",t.idForm);const s=document.createElement("div");s.classList.add("container");const i=document.createElement("div");return i.classList.add("form-group","step-2-area-div"),t.variants.forEach(((e,s)=>{const a=document.createElement("input"),o=document.createElement("label");a.setAttribute("type","text"),a.setAttribute("style","max-width: 200px;"),a.setAttribute("id",`${t.idForm}-N-${s}`),a.setAttribute("name",e.nameRadioGroup),a.setAttribute("placeholder",e.titleRadioGroup),o.setAttribute("for",`${t.idForm}-N-${s}`),o.textContent=e.titleRadioGroup,i.appendChild(o),i.appendChild(a)})),s.appendChild(i),e.appendChild(s),e},e.domStep6=function(t){const e=document.createElement("form");return e.setAttribute("id",t.idForm),t.variants.forEach((s=>{const i=document.createElement("div"),a=document.createElement("img");i.classList.add("step-6-style"),a.setAttribute("src",s.imgSrc),i.appendChild(a);const o=document.createElement("div");o.classList.add("step-6-radgroup"),s.radios.forEach(((e,i)=>{const a=document.createElement("input"),n=document.createElement("label");a.setAttribute("type","radio"),a.setAttribute("id",`${t.idForm}-rg-${i}`),a.setAttribute("name",s.nameRadioGroup),a.setAttribute("value",e),n.setAttribute("for",`${t.idForm}-rg-${i}`),n.textContent=e,0===i&&(a.checked=!0),n.appendChild(a),o.appendChild(n)})),e.appendChild(o),e.appendChild(i)})),e}},269:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.domStepFinish=void 0,e.domStepFinish=function(t,e){const s=document.createElement("form");s.setAttribute("id",t.idForm);const i=document.createElement("div");i.classList.add("formdiv");const a=document.createElement("div"),o=`\n        <div class="form-group form-div-send">\n            <span id="spanerr" style="display: block; color: red; font-size: 0.8em;"></span>\n            <label for="${t.inputNameName}">Ваше имя:</label>\n            <input type="text" class="form-control" id="${t.inputNameName}" required placeholder="Ваше имя">\n        \n            <label for="${t.inputTelName}">Ваш № телефона:</label>\n            <input type="tel" class="form-control" id="${t.inputTelName}" required placeholder="+375 (_ _) _ _ _ - _ _ - _ _">\n        </div>\n    `;a.innerHTML=o;const n=document.createElement("button");n.setAttribute("id","button-submit-steps"),n.setAttribute("type","button"),n.textContent="Отправить",n.addEventListener("click",e),a.appendChild(n),i.appendChild(a);const r=document.createElement("div"),l=document.createElement("img");return l.setAttribute("src",t.imgSrc||""),r.appendChild(l),i.appendChild(r),s.appendChild(i),s}},336:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.settings=void 0,e.settings={HOST:"https://plitochka-quiz.vercel.app/"}},787:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.HowManyGates=void 0;const i=s(566),a=s(78),o=s(868);class n extends o.Step{constructor(t,e,s,i="",a=!1){super(e),this.RADIO_NAME="step-N-how-many-gates",this.domData={idForm:"form-step-N-how-gates",variants:[{imgSrc:"",titleRadioGroup:"",nameRadioGroup:"how_many_gates",radios:["1","2"]}]},this.button=null,this.form=null,this.title="",this.isFirst=!1,this.nameStep="",this.button=s,this.title=i,this.isFirst=a,this.stepData={},this.nameStep=t}step(){this.clearContainer(),(0,i.setTitleStep)(),this.form=(0,a.domStep6)(this.domData),(0,i.setTitleStep)(this.title),this.fillContainer(this.form),this.checkedBack(),this.bodyScrollTop()}selectData(){if(this.form)for(let t of this.form.elements)t instanceof HTMLInputElement&&"radio"===t.type&&t.checked&&(this.stepData[t.name]=t.value)}}e.HowManyGates=n},451:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.HowManyWickets=void 0;const i=s(566),a=s(78),o=s(868);class n extends o.Step{constructor(t,e,s,i="",a=!1){super(e),this.RADIO_NAME="step-N-how-many-wickets",this.domData={idForm:"form-step-N-how-wickets",variants:[{imgSrc:"",titleRadioGroup:"",nameRadioGroup:"how_many_wickets",radios:["1","2"]}]},this.button=null,this.form=null,this.title="",this.isFirst=!1,this.nameStep="",this.button=s,this.title=i,this.isFirst=a,this.stepData={},this.nameStep=t}step(){this.clearContainer(),(0,i.setTitleStep)(),this.form=(0,a.domStep6)(this.domData),(0,i.setTitleStep)(this.title),this.fillContainer(this.form),this.checkedBack(),this.bodyScrollTop()}selectData(){if(this.form)for(let t of this.form.elements)t instanceof HTMLInputElement&&"radio"===t.type&&t.checked&&(this.stepData[t.name]=t.value)}}e.HowManyWickets=n},612:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.SecondStep5=void 0;const i=s(566),a=s(78),o=s(868);class n extends o.Step{constructor(t,e,s,i="",a=!1){super(e),this.RADIO_NAME="step-s5",this.domData={idForm:"form-step-s5",variants:[{imgSrc:"styles/stepsimg/s5/it-3-1.jpg",titleRadioGroup:"Вторые откатные ворота (выбрать длину)",nameRadioGroup:"second_otkatnie",radios:["не надо","3,5 м","4 м","4,5 м","5 м"]},{imgSrc:"styles/stepsimg/s5/it-3-2.jpg",titleRadioGroup:"Вторые распашные ворота (выбрать длину)",nameRadioGroup:"second_raspashnie",radios:["не надо","3,5 м","4 м","4,5 м"]},{imgSrc:"styles/stepsimg/s5/it-3-3.jpg",titleRadioGroup:"Вторая калитка (выбрать ширину)",nameRadioGroup:"second_kalitka",radios:["не надо","1 м","1,2 м"]}]},this.button=null,this.form=null,this.title="",this.isFirst=!1,this.nameStep="",this.button=s,this.title=i,this.isFirst=a,this.stepData={},this.nameStep=t}step(){this.clearContainer(),(0,i.setTitleStep)(),this.form=(0,a.domStep5)(this.domData),(0,i.setTitleStep)(this.title),this.fillContainer(this.form),this.checkedBack(),this.bodyScrollTop()}selectData(){if(this.form)for(let t of this.form.elements)t instanceof HTMLInputElement&&"radio"===t.type&&t.checked&&(this.stepData[t.name]=t.value)}}e.SecondStep5=n},868:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Step=void 0,e.Step=class{constructor(t){this.cnt=null,this.stepData={},this.form=null,this.nameStep="",this.button=null,this.isBlockNext=!1,this.cnt=t}evnImg(t){var e;const s=null===(e=t.target.nextSibling)||void 0===e?void 0:e.childNodes;null==s||s.forEach((t=>{t instanceof HTMLInputElement&&(t.checked=!0,this.bodyScrollDown())}))}getStepData(){return this.stepData}fillContainer(t){this.cnt&&this.cnt.appendChild(t);const e=document.querySelectorAll("img");e&&e.forEach((t=>{t.addEventListener("click",this.evnImg.bind(this))}))}clearContainer(){if(this.cnt)for(let t of Array.from(this.cnt.children))this.cnt.removeChild(t);const t=document.querySelectorAll("img");try{t&&t.forEach((t=>{t.removeEventListener("click",this.evnImg.bind(this))}))}catch(t){console.log("clearContainer() -> do not remove evn listener img")}}addData(t,e){this.stepData[t]=e}checkedBack(){if(this.form)for(let t of this.form.elements)t instanceof HTMLInputElement&&"radio"===t.type&&(t.value===this.stepData[t.name]||t.value===this.stepData.variant)&&(t.checked=!0),t instanceof HTMLInputElement&&"text"===t.type&&this.stepData[t.name]&&(t.value=this.stepData[t.name]);if(this.form&&this.stepData.adress)for(let t of this.form.elements)t instanceof HTMLTextAreaElement&&(t.textContent=this.stepData.adress)}cntScrollTop(){var t;null===(t=this.cnt)||void 0===t||t.scrollTo({top:0,left:0,behavior:"smooth"})}bodyScrollDown(){const t=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;window.scrollTo({top:t,left:0,behavior:"smooth"})}bodyScrollTop(){window.scrollTo({top:0,left:0,behavior:"smooth"}),this.cntScrollTop()}}},917:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Step1=void 0;const i=s(566),a=s(868);class o extends a.Step{constructor(t,e,s,i="",a=!1){super(e),this.RADIO_NAME="step-1",this.domData={idForm:"form-step-1",variants:[{imgSrc:"styles/stepsimg/s1/stolb_v1.jpg",titleSpan:"Вариант 1. Все столбы из камня",radioId:"stolb-1",radioName:this.RADIO_NAME,radioValue:"Все столбы из камня",isChecked:!0},{imgSrc:"styles/stepsimg/s1/stolb_v2.jpg",titleSpan:"Вариант 2. Каменный столб через один или несколько металлических",radioId:"stolb-2",radioName:this.RADIO_NAME,radioValue:"Каменный столб через один или несколько металлических",isChecked:!1},{imgSrc:"styles/stepsimg/s1/stolb_v3.jpg",titleSpan:"Вариант 3. Каменные столбы на входе и по краям",radioId:"stolb-3",radioName:this.RADIO_NAME,radioValue:"Каменные столбы на входе и по краям",isChecked:!1},{imgSrc:"styles/stepsimg/s1/zapolneniev4.jpg",titleSpan:"Вариант 4. Отдельностоящие каменные столбы",radioId:"stolb-4",radioName:this.RADIO_NAME,radioValue:"Отдельностоящие каменные столбы",isChecked:!1},{imgSrc:"styles/stepsimg/s1/stolb_v5.jpg",titleSpan:"Вариант 5. Каменные столбы только на входной группе",radioId:"stolb-5",radioName:this.RADIO_NAME,radioValue:"Каменные столбы только на входной группе",isChecked:!1},{imgSrc:"styles/stepsimg/s1/stolb_v6.jpg",titleSpan:"Вариант 6. Только металлические столбы",radioId:"stolb-6",radioName:this.RADIO_NAME,radioValue:"Только металлические столбы",isChecked:!1}]},this.button=null,this.form=null,this.title="",this.isFirst=!1,this.nameStep="",this.button=s,this.title=i,this.isFirst=a,this.stepData={},this.nameStep=t}step(){this.clearContainer(),(0,i.setTitleStep)(),this.form=(0,i.domStep1)(this.domData),(0,i.setTitleStep)(this.title),this.fillContainer(this.form),this.checkedBack(),this.bodyScrollTop()}selectData(){if(this.form)for(let t of this.form.elements)t instanceof HTMLInputElement&&"radio"===t.type&&t.checked&&(this.stepData.variant=t.value)}}e.Step1=o},393:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Step2=void 0;const i=s(566),a=s(133),o=s(868);class n extends o.Step{constructor(t,e,s,i="",a=!1){super(e),this.RADIO_NAME="step-2",this.domData={idForm:"form-step-2",titleInput:"Укажите Ваше примерное или точное местоположение",nameInput:"sity",idInput:"step-2-input-form"},this.button=null,this.form=null,this.title="",this.isFirst=!1,this.nameStep="",this.button=s,this.title=i,this.isFirst=a,this.stepData={},this.nameStep=t}step(){this.clearContainer(),(0,i.setTitleStep)(),this.form=(0,a.domStep2)(this.domData),(0,i.setTitleStep)(this.title),this.fillContainer(this.form),this.checkedBack(),this.bodyScrollTop()}selectData(){if(this.form)for(let t of this.form.elements)t instanceof HTMLInputElement&&"radio"===t.type?t.checked&&(this.stepData[t.name]=t.value):t instanceof HTMLTextAreaElement&&(t.value.trim().length>0?(this.stepData.adress=t.value,this.isBlockNext=!1):this.isBlockNext=!0)}}e.Step2=n},428:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Step3=void 0;const i=s(566),a=s(868);class o extends a.Step{constructor(t,e,s,i="",a=!1){super(e),this.RADIO_NAME="step-3",this.domData={idForm:"form-step-3",variants:[{imgSrc:"styles/stepsimg/no.png",titleSpan:"Не надо",radioId:"lamel-0",radioName:this.RADIO_NAME,radioValue:"Не надо",isChecked:!0},{imgSrc:"styles/stepsimg/s3/zabor-sparta_photo_9.jpg",titleSpan:'Горизонтальные ламели в стиле Ранчо, модель "Спарта"',radioId:"lamel-1",radioName:this.RADIO_NAME,radioValue:'Горизонтальные ламели в стиле Ранчо, модель "Спарта"',isChecked:!1},{imgSrc:"styles/stepsimg/s3/line_kviz.jpg",titleSpan:'Горизонтальные ламели в стиле Ранчо с малозаметными бортами, модель "Лайн"',radioId:"lamel-2",radioName:this.RADIO_NAME,radioValue:'Горизонтальные ламели в стиле Ранчо с малозаметными бортами, модель "Лайн"',isChecked:!1},{imgSrc:"styles/stepsimg/s3/shvec-rancho_kviz.jpg",titleSpan:'Разноширокие горизонтальные ламели, "Швецкое" ранчо',radioId:"lamel-3",radioName:this.RADIO_NAME,radioValue:'Разноширокие горизонтальные ламели, "Швецкое" ранчо',isChecked:!1},{imgSrc:"styles/stepsimg/s3/portfolio_kolodishi-gorc-de-luxe-22_3.jpg",titleSpan:'Горизонтальные ламели в стиле Ранчо, модель "Рома"',radioId:"lamel-4",radioName:this.RADIO_NAME,radioValue:'Горизонтальные ламели в стиле Ранчо, модель "Рома"',isChecked:!1},{imgSrc:"styles/stepsimg/s3/zabor-shahmatka_photo_13.jpg",titleSpan:'Горизонтальные ламели в стиле Ранчо с двухсторонней зашивкой (шахматка), модель "Рома"',radioId:"lamel-5",radioName:this.RADIO_NAME,radioValue:'Горизонтальные ламели в стиле Ранчо с двухсторонней зашивкой (шахматка), модель "Рома"',isChecked:!1},{imgSrc:"styles/stepsimg/s3/jalousie-fence-photo-7.jpg",titleSpan:"Горизонтальные ламели в стиле Жалюзи",radioId:"lamel-6",radioName:this.RADIO_NAME,radioValue:"Горизонтальные ламели в стиле Жалюзи",isChecked:!1},{imgSrc:"styles/stepsimg/s3/kviz-rascheska.jpg",titleSpan:'Алюминиевое вертикальное заполнение "Расческа"',radioId:"lamel-7",radioName:this.RADIO_NAME,radioValue:'Алюминиевое вертикальное заполнение "Расческа"',isChecked:!1},{imgSrc:"styles/stepsimg/s3/rombus_kviz.jpg",titleSpan:'Алюминиевые горизонтальные ламели "Ромбус"',radioId:"lamel-8",radioName:this.RADIO_NAME,radioValue:'Алюминиевые горизонтальные ламели "Ромбус"',isChecked:!1},{imgSrc:"styles/stepsimg/s3/alum-rancho-kviz.jpg",titleSpan:"Алюминиевые горизонтальные ламели в стиле Ранчо",radioId:"lamel-9",radioName:this.RADIO_NAME,radioValue:"Алюминиевые горизонтальные ламели в стиле Ранчо",isChecked:!1},{imgSrc:"styles/stepsimg/s3/shtaketnik-photo-7.jpg",titleSpan:"Вертикальный металлический штактетник с односторонней зашивкой",radioId:"lamel-10",radioName:this.RADIO_NAME,radioValue:"Вертикальный металлический штактетник с односторонней зашивкой",isChecked:!1},{imgSrc:"styles/stepsimg/s3/shtaketnik2.jpg",titleSpan:"Вертикальный металлический штактетник с двухсторонней зашивкой",radioId:"lamel-11",radioName:this.RADIO_NAME,radioValue:"Вертикальный металлический штактетник с двухсторонней зашивкой",isChecked:!1},{imgSrc:"styles/stepsimg/s3/3d-fence_photo_5.jpg",titleSpan:"3D-сетка",radioId:"lamel-12",radioName:this.RADIO_NAME,radioValue:"3D-сетка",isChecked:!1}]},this.button=null,this.form=null,this.title="",this.isFirst=!1,this.nameStep="",this.button=s,this.title=i,this.isFirst=a,this.stepData={},this.nameStep=t}step(){this.clearContainer(),(0,i.setTitleStep)(),this.form=(0,i.domStep1)(this.domData),(0,i.setTitleStep)(this.title),this.fillContainer(this.form),this.checkedBack(),this.bodyScrollTop()}selectData(){if(this.form)for(let t of this.form.elements)t instanceof HTMLInputElement&&"radio"===t.type&&t.checked&&(this.stepData.variant=t.value)}}e.Step3=o},327:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Step5=void 0;const i=s(566),a=s(78),o=s(868);class n extends o.Step{constructor(t,e,s,i="",a=!1){super(e),this.RADIO_NAME="step-5",this.domData={idForm:"form-step-5",variants:[{imgSrc:"styles/stepsimg/s5/it-3-1.jpg",titleRadioGroup:"Откатные ворота (выбрать длину)",nameRadioGroup:"otkatnie",radios:["3,5 м","4 м","4,5 м","5 м","не надо"]},{imgSrc:"styles/stepsimg/s5/it-3-2.jpg",titleRadioGroup:"Распашные ворота (выбрать длину)",nameRadioGroup:"raspashnie",radios:["3,5 м","4 м","4,5 м","не надо"]},{imgSrc:"styles/stepsimg/s5/it-3-3.jpg",titleRadioGroup:"Калитка (выбрать ширину)",nameRadioGroup:"kalitka",radios:["1 м","1,2 м","не надо"]}]},this.button=null,this.form=null,this.title="",this.isFirst=!1,this.nameStep="",this.button=s,this.title=i,this.isFirst=a,this.stepData={},this.nameStep=t}step(){this.clearContainer(),(0,i.setTitleStep)(),this.form=(0,a.domStep5)(this.domData),(0,i.setTitleStep)(this.title),this.fillContainer(this.form),this.checkedBack(),this.bodyScrollTop()}selectData(){if(this.form)for(let t of this.form.elements)t instanceof HTMLInputElement&&"radio"===t.type&&t.checked&&(this.stepData[t.name]=t.value)}}e.Step5=n},498:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Step6=void 0;const i=s(566),a=s(78),o=s(868);class n extends o.Step{constructor(t,e,s,i="",a=!1){super(e),this.RADIO_NAME="step-6",this.domData={idForm:"form-step-6",variants:[{imgSrc:"styles/stepsimg/s6/it-5-1.jpg",titleRadioGroup:"",nameRadioGroup:"isAutmatic",radios:["Да","Нет"]}]},this.button=null,this.form=null,this.title="",this.isFirst=!1,this.nameStep="",this.button=s,this.title=i,this.isFirst=a,this.stepData={},this.nameStep=t}step(){this.clearContainer(),(0,i.setTitleStep)(),this.form=(0,a.domStep6)(this.domData),(0,i.setTitleStep)(this.title),this.fillContainer(this.form),this.checkedBack(),this.bodyScrollTop()}selectData(){if(this.form)for(let t of this.form.elements)t instanceof HTMLInputElement&&"radio"===t.type&&t.checked&&(this.stepData[t.name]=t.value)}}e.Step6=n},984:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Step7=void 0;const i=s(566),a=s(78),o=s(868);class n extends o.Step{constructor(t,e,s,i="",a=!1){super(e),this.RADIO_NAME="step-7",this.domData={idForm:"form-step-7",variants:[{imgSrc:"styles/stepsimg/s7/it-6-2.png",titleRadioGroup:"",nameRadioGroup:"isMounth",radios:["Да","Нет"]}]},this.button=null,this.form=null,this.title="",this.isFirst=!1,this.nameStep="",this.button=s,this.title=i,this.isFirst=a,this.stepData={},this.nameStep=t}step(){this.clearContainer(),(0,i.setTitleStep)(),this.form=(0,a.domStep6)(this.domData),(0,i.setTitleStep)(this.title),this.fillContainer(this.form),this.checkedBack(),this.bodyScrollTop()}selectData(){if(this.form)for(let t of this.form.elements)t instanceof HTMLInputElement&&"radio"===t.type&&t.checked&&(this.stepData[t.name]=t.value)}}e.Step7=n},425:function(t,e,s){var i=this&&this.__awaiter||function(t,e,s,i){return new(s||(s=Promise))((function(a,o){function n(t){try{l(i.next(t))}catch(t){o(t)}}function r(t){try{l(i.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?a(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(n,r)}l((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.StepFinish=void 0;const a=s(566),o=s(269),n=s(868);class r extends n.Step{constructor(t,e,s,i="",a=!1){super(e),this.RADIO_NAME="",this.domData={idForm:"form-step-finish",imgSrc:"styles/stepsimg/ava.png",inputNameName:"clientName",inputTelName:"clientTel"},this.button=null,this.form=null,this.title="",this.isFirst=!1,this.nameStep="",this.button=s,this.title=i,this.isFirst=a,this.stepData={},this.nameStep=t}setCallbackButtonSubmit(t){this.callbackQuizeResult=t}step(){this.clearContainer(),(0,a.setTitleStep)(),this.form=(0,o.domStepFinish)(this.domData,this.submitCallback.bind(this)),(0,a.setTitleStep)(this.title),this.fillContainer(this.form),this.checkedBack(),this.bodyScrollTop()}submitCallback(t){return i(this,void 0,void 0,(function*(){t.preventDefault(),this.selectData(),yield this.callbackQuizeResult(t)}))}selectData(){if(this.form)for(let t of this.form.elements)t instanceof HTMLInputElement&&("text"===t.type||"tel"===t.type)&&t.value.trim().length>0&&(this.stepData[t.id]=t.value)}}e.StepFinish=r},370:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.StepN4=void 0;const i=s(566),a=s(868);class o extends a.Step{constructor(t,e,s,i="",a=!1){super(e),this.RADIO_NAME="step-N-4",this.domData={idForm:"form-step-N-1",variants:[{imgSrc:"styles/stepsimg/nashi/s1/a1.jpg",titleSpan:"Оникс",radioId:"nashi-1-1",radioName:this.RADIO_NAME,radioValue:"Оникс",isChecked:!0},{imgSrc:"styles/stepsimg/nashi/s1/a2.jpg",titleSpan:"Черный микс",radioId:"nashi-1-2",radioName:this.RADIO_NAME,radioValue:"Черный микс",isChecked:!1},{imgSrc:"styles/stepsimg/nashi/s1/a3.webp",titleSpan:"Сахара",radioId:"nashi-1-3",radioName:this.RADIO_NAME,radioValue:"Сахара",isChecked:!1},{imgSrc:"styles/stepsimg/nashi/s1/a4.webp",titleSpan:"Графит",radioId:"nashi-1-4",radioName:this.RADIO_NAME,radioValue:"Графит",isChecked:!1},{imgSrc:"styles/stepsimg/nashi/s1/a5.webp",titleSpan:"Кварц",radioId:"nashi-1-5",radioName:this.RADIO_NAME,radioValue:"Кварц",isChecked:!1},{imgSrc:"styles/stepsimg/nashi/s1/a6.webp",titleSpan:"Капучино",radioId:"nashi-1-6",radioName:this.RADIO_NAME,radioValue:"Капучино",isChecked:!1},{imgSrc:"styles/stepsimg/nashi/s1/a7.webp",titleSpan:"Шоколад",radioId:"nashi-1-7",radioName:this.RADIO_NAME,radioValue:"Шоколад",isChecked:!1},{imgSrc:"styles/stepsimg/nashi/s1/a8.webp",titleSpan:"Тёмный шоколад",radioId:"nashi-1-8",radioName:this.RADIO_NAME,radioValue:"Тёмный шоколад",isChecked:!1},{imgSrc:"styles/stepsimg/nashi/s1/a9.webp",titleSpan:"Грей",radioId:"nashi-1-9",radioName:this.RADIO_NAME,radioValue:"Грей",isChecked:!1},{imgSrc:"styles/stepsimg/nashi/s1/a10.webp",titleSpan:"Гранат",radioId:"nashi-1-10",radioName:this.RADIO_NAME,radioValue:"Гранат",isChecked:!1},{imgSrc:"styles/stepsimg/nashi/s1/a11.webp",titleSpan:"Лава",radioId:"nashi-1-11",radioName:this.RADIO_NAME,radioValue:"Лава",isChecked:!1},{imgSrc:"styles/stepsimg/nashi/s1/a12.webp",titleSpan:"Медный",radioId:"nashi-1-12",radioName:this.RADIO_NAME,radioValue:"Медный",isChecked:!1}]},this.button=null,this.form=null,this.title="",this.isFirst=!1,this.nameStep="",this.button=s,this.title=i,this.isFirst=a,this.stepData={},this.nameStep=t}step(){this.clearContainer(),(0,i.setTitleStep)(),this.form=(0,i.domStep1)(this.domData),(0,i.setTitleStep)(this.title),this.fillContainer(this.form),this.checkedBack(),this.bodyScrollTop()}selectData(){if(this.form)for(let t of this.form.elements)t instanceof HTMLInputElement&&"radio"===t.type&&t.checked&&(this.stepData.variant=t.value)}}e.StepN4=o},489:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.StepN5=void 0;const i=s(566),a=s(78),o=s(868);class n extends o.Step{constructor(t,e,s,i="",a=!1){super(e),this.RADIO_NAME="step-N-5",this.domData={idForm:"form-step-N-5",variants:[{imgSrc:"styles/stepsimg/nashi/s2/hz.webp",titleRadioGroup:"",nameRadioGroup:"height_zabor",radios:["1,6 м","1,8 м","2,0 м"]}]},this.button=null,this.form=null,this.title="",this.isFirst=!1,this.nameStep="",this.button=s,this.title=i,this.isFirst=a,this.stepData={},this.nameStep=t}step(){this.clearContainer(),(0,i.setTitleStep)(),this.form=(0,a.domStep6)(this.domData),(0,i.setTitleStep)(this.title),this.fillContainer(this.form),this.checkedBack(),this.bodyScrollTop()}selectData(){if(this.form)for(let t of this.form.elements)t instanceof HTMLInputElement&&"radio"===t.type&&t.checked&&(this.stepData[t.name]=t.value)}}e.StepN5=n},131:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.StepN6=void 0;const i=s(566),a=s(78),o=s(868);class n extends o.Step{constructor(t,e,s,i="",a=!1){super(e),this.RADIO_NAME="step-N-6",this.domData={idForm:"form-step-N-6",variants:[{imgSrc:"",titleRadioGroup:"Введите длину забора (м):",nameRadioGroup:"length_zabora",radios:[]}]},this.button=null,this.form=null,this.title="",this.isFirst=!1,this.nameStep="",this.button=s,this.title=i,this.isFirst=a,this.stepData={},this.nameStep=t}step(){this.clearContainer(),(0,i.setTitleStep)(),this.form=(0,a.domStepN6)(this.domData),(0,i.setTitleStep)(this.title),this.fillContainer(this.form),this.checkedBack(),this.bodyScrollTop()}selectData(){if(this.form)for(let t of this.form.elements)t instanceof HTMLInputElement&&"text"===t.type&&(this.stepData[t.name]=""===t.value?"1":t.value)}}e.StepN6=n},392:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.StepN7=void 0;const i=s(566),a=s(78),o=s(868);class n extends o.Step{constructor(t,e,s,i="",a=!1){super(e),this.RADIO_NAME="step-N-7",this.domData={idForm:"form-step-N-7",variants:[{imgSrc:"",titleRadioGroup:"",nameRadioGroup:"length_between_stolbami_zabora",radios:["2,0 м","2,5 м","2,75 м","3,0 м"]}]},this.button=null,this.form=null,this.title="",this.isFirst=!1,this.nameStep="",this.button=s,this.title=i,this.isFirst=a,this.stepData={},this.nameStep=t}step(){this.clearContainer(),(0,i.setTitleStep)(),this.form=(0,a.domStep6)(this.domData),(0,i.setTitleStep)(this.title),this.fillContainer(this.form),this.checkedBack(),this.bodyScrollTop()}selectData(){if(this.form)for(let t of this.form.elements)t instanceof HTMLInputElement&&"radio"===t.type&&t.checked&&(this.stepData[t.name]=t.value)}}e.StepN7=n}},e={};function s(i){var a=e[i];if(void 0!==a)return a.exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,s),o.exports}(()=>{const t=s(186),e=s(566),i=s(787),a=s(451),o=s(612),n=s(917),r=s(393),l=s(428),d=s(327),c=s(498),p=s(984),h=s(425),m=s(370),u=s(489),f=s(131),S=s(392),b=document.getElementById("content-container"),g=document.getElementById("step-1"),v=document.getElementById("step-2"),_=document.getElementById("step-3"),y=document.getElementById("step-4"),E=document.getElementById("step-5"),k=document.getElementById("step-6"),D=document.getElementById("step-7"),A=document.getElementById("step-8"),N=document.getElementById("step-9"),I=document.getElementById("step-s9"),C=document.getElementById("step-10"),M=document.getElementById("step-11"),w=document.getElementById("step-12"),R=document.getElementById("step-13");[g,v,_,y,E,k,D,A,N,I,C,M,w,R].forEach((t=>{(0,e.disableButton)(t,!0)}));const T=document.getElementById("prev-step"),O=document.getElementById("next-step"),F=new n.Step1("step1",b,g,"Выберите вариант компоновки столбов",!0),x=new l.Step3("step2",b,v,"Выберите заполнение между столбами",!1),B=new m.StepN4("step3",b,_,"Выберите цвет заборного блока",!1),j=new u.StepN5("step4",b,y,"Выберите высоту забора",!1),L=new f.StepN6("step5",b,E,"Какая общая длина забора в метрах?",!1),G=new S.StepN7("step6",b,k,"Выберите желаемое расстояние между столбами",!1),V=new a.HowManyWickets("step7",b,D,"Сколько у вас будет калиток?",!1),H=new i.HowManyGates("step8",b,A,"Сколько у вас будет ворот?",!1),P=new d.Step5("step9",b,N,"Выберите тип первых ворот, первую калитку и их размер",!1),z=new o.SecondStep5("step99",b,I,"Выберите тип вторых ворот, вторую калитку и их размер",!1),$=new c.Step6("step10",b,C,"Нужна ли автоматика для ворот?",!1),q=new p.Step7("step11",b,M,"Нужен ли монтаж забора?",!1),W=new r.Step2("step12",b,w,"Пожалуйста, укажите Ваше примерное или точное местоположение",!1),Q=new h.StepFinish("step_finish",b,R,"Введите, пожалуйста, Ваше имя и контактный номер. Мы свяжемся в Вами в течении нескольких минут.",!1),K=new t.QuizeResult([F,x,B,j,L,G,V,H,P,z,$,q,W,Q],T,O);K.init(),document.querySelectorAll('input[type="radio"]').forEach((t=>{t.addEventListener("change",(t=>{const e=t.target.form;K.change(e)}))}))})()})();
//# sourceMappingURL=stepsy.js.map