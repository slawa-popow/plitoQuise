import { domStep1, setTitleStep } from "../domManip/domStep1";
import { StepsSelectData } from "../types/stepsT";
import { Step } from "./Step";


export class Step3 extends Step {
    RADIO_NAME = "step-3";

    domData: StepsSelectData = {
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
    button: HTMLButtonElement | null = null;
    form: HTMLFormElement | null = null;
    title: string = '';
    isFirst: boolean = false;
    nameStep: string = '';

    constructor(nameStep: string,
                container: HTMLElement | null,
                button: HTMLButtonElement | null,
                title: string = '', 
                isFirst: boolean = false) {

        super(container);
        this.button = button;
        this.title = title;
        this.isFirst = isFirst;
        this.stepData = {};
        this.nameStep = nameStep;
    }

    step(): void {
        this.clearContainer();
        setTitleStep();
        this.form = domStep1(this.domData);
        setTitleStep(this.title);
        this.fillContainer(this.form);
        this.checkedBack();
    }

    selectData(): void {
         if (this.form) {
            for (let el of this.form.elements) {
                if (el instanceof HTMLInputElement && el.type === "radio" ) {
                    if (el.checked) { 
                        this.stepData.variant = el.value;
                     }
                }
            }
         }
    }
}