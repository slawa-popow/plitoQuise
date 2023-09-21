import { Request } from "express";

export interface MRequest extends Request {
    session: any;
}


/**
 * Запрос от бота в первый запуск бота
 */
export interface FromBot {
    uid: string; 
    from: string;
    date: string;
    telegram_id: string;
    telegram_name: string;
    telegram_nick_name: string;

}

export interface QuizeSendData {
    clients_id: string | null;
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
    type_gates ?: string;
    width_second_gates: string | number;
    type_second_gates ?: string;
    var_comp_coll : string;
    fill_between_coll : string;
    isAutomatic : string;
    isMount: string;
    city: string;
    isFrom ?: string;
    telegram ?: string;
    date ?: string;
    time ?: string;
    uid ?: string;
}