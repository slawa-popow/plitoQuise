

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
    variants: Variant[]
}