import { StepData } from "../types/stepsT";


/**
 * Шаг абстрактный
 */
export abstract class Step {

    public cnt: HTMLElement | null = null;      // div контейнер
    protected stepData: StepData = {};          // данные шага
    form: HTMLFormElement | null = null;        // форма хтмл шага
    nameStep: string = '';                      // имя шага
    button: HTMLButtonElement | null = null;    // кнопка навигации
    isBlockNext: boolean = false;               // для блокировки кнопки "вперед" (шаг напишите местоположение)

    constructor(container: HTMLElement | null) {
        this.cnt = container;
    }

    /**
     * Если нажали на картинку, то ищем в "братьях"
     * input radio и выделяем (выбираем пункт)
     * @param e EventListener
     */
    evnImg(e: Event) {
        const input = (<HTMLImageElement> e.target).nextSibling?.childNodes;
        input?.forEach(i => {
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


    /**
     * Очистить контейнер и удалить обработчик
     * нажатия на картинку
     */
    clearContainer(): void {
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
        } catch (e) {console.log('clearContainer() -> do not remove evn listener img')}
    }


    addData(key: string, value: string) {
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
        if (this.form ) { 
            for (let elem of this.form.elements) {
                if (elem instanceof HTMLInputElement && elem.type === "radio" && 
                    (elem.value === this.stepData[elem.name] || elem.value === this.stepData.variant )) {
                        elem.checked = true;
                    } 
                if (elem instanceof HTMLInputElement && elem.type === "text" && this.stepData[elem.name]) {
                     
                    elem.value = this.stepData[elem.name];
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

    scrollTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
    }

    abstract step(): void;          // очистить, наполнить содержимым контейне и др
    abstract selectData(): void;    // сохранить выбранные данные шага в объекте

}