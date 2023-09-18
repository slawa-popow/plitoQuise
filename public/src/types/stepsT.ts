

export interface StepData {
    [key: string]: string;
}


export interface Variant {
    imgSrc: string;
    titleSpan: string;
    radioId: string;
    radioName: string;
    radioValue: string;
    isChecked: boolean;
}
export interface StepsSelectData {
    idForm: string;
    variants: Variant[];
}


export interface Variant5 {
    imgSrc: string;
    titleRadioGroup: string;
    nameRadioGroup: string;
    radios: string[];
}

export interface StepsSelectData5 {
    idForm: string;
    variants: Variant5[];
}


export interface StepsFormSity {
    imgSrc ?: string;
    idForm: string,
    titleInput: string;
    nameInput: string;
    idInput: string;
}