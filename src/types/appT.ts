
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
