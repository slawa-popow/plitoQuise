import { db } from "../database/db";
import dotenv from 'dotenv';
import { QuizeSendData } from "../types/appT";
import axios from "axios";



export const telegram = (() => {

    function createMessage(data_quiz: QuizeSendData, rowId: string): string {
        const msg = `
<b>Новый квиз из WEB:</b> <i>id = ${rowId}</i>%0A
<b>uid: </b>${data_quiz.clients_id}%0A
<b>Имя: </b>${data_quiz.name || ''}%0A
<b>Тел: </b>${data_quiz.phone || ''}%0A
<b>Цвет забор блока: </b>${data_quiz.color_fence_block || ''}%0A
<b>Компоновка столбов: </b>${data_quiz.var_comp_coll || ''}%0A
<b>Наполнение между столбами: </b>${data_quiz.fill_between_coll || ''}%0A
<b>Нужна автоматика?: </b>${data_quiz.isAutomatic || ''}%0A
<b>Нужен монтаж забора?: </b>${data_quiz.isMount || ''}%0A
<b>Высота забора: </b>${data_quiz.height_fence || ''}%0A
<b>Общ. длина забора: </b>${data_quiz.total_lenght_fence || ''}%0A
<b>Длина между столбами: </b>${data_quiz.lenght_between_colls || ''}%0A
<b>Кол-во калиток: </b>${data_quiz.how_many_wickets || ''}%0A
<b>Ширина калитки: </b>${data_quiz.width_wicket || ''}%0A
<b>Ширина второй калитки: </b>${data_quiz.width_second_wicket || ''}%0A
<b>Сколько ворот: </b>${data_quiz.how_many_gates || ''}%0A
<b>Ширина ворот: </b>${data_quiz.width_gates || ''}%0A
<b>Ширина вторых ворот: </b>${data_quiz.width_second_gates || ''}%0A
<b>Местоположение: </b>${data_quiz.city || ''}%0A
<b>Дата: </b>${data_quiz.date || ''}%0A
        `;

        return msg;
    }

    async function tgMessage(rowId: string) {
        dotenv.config();
        const token = process.env.TELEGRAM_TOKEN || "";
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        const data = await db.getRowData(rowId);
        const managers = await db.getManagers();
        if (Array.isArray(data) && data.length > 0) {
            if (Array.isArray(managers) && managers.length > 0) {
                for (let m of managers) {
                    const managerid = m.telegram_id;
                    const message = createMessage(data[0], rowId);
                    const sendUrl = url + `?chat_id=${managerid}&text=${message}&parse_mode=HTML`;
                    await axios.get(sendUrl);
                    
        
        
                }
            }
        }
        
    }

    return { tgMessage }
})();