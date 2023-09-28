

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
    dataLabel ?: string;
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


export interface StepFinishtData {
    imgSrc ?: string;
    idForm: string;
    inputNameName: string;
    inputTelName: string;
    
}


export interface SendData {
    name: string;
    phone: string;
    color_fence_block: string;
    height_fence: string | number;
    total_lenght_fence: string | number;
    lenght_between_colls: string | number;
    how_many_wickets: string | number;
    width_wicket: string | number;
    width_second_wicket: string | number;
    how_many_gates: string | number;
    width_gates: string | number;
    width_second_gates: string | number;
    var_comp_coll : string;
    fill_between_coll : string;
    isAutomatic : string;
    isMount: string;
    city: string;

}