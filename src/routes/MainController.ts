import { Request, Response } from 'express';
import { QuizeSendData } from '../types/appT';
import { db } from '../database/db';
import { telegram } from './telegram';



class MainController {

    

    async getIndexPage(_request: Request, response: Response) {

        return response.status(200).render('index', {
            layout: 'main', }); 
    }


    async startQuizes(_request: Request, response: Response) {
        return response.status(200).render('runsteps', {
            layout: 'main_steps', }); 
    }


    async sendQuizData(request: Request, response: Response) {
        const data = request.body as QuizeSendData;
        let isFrom: string = '';
       
        if (data) {
            isFrom = 'WEB';
            data.isFrom = isFrom;
            data.clients_id = null;
            const curdate = new Date().toLocaleString("ru-RU", {timeZone: "Europe/Moscow"});
            data.date = curdate.split(', ')[0];
            data.clients_id = new Date().getTime().toString(16);
            const res = await db.writeQuizData(data);
            if (Array.isArray(res) && res.length > 0)
                await telegram.tgMessage(res[0]);
                return response.status(200).json({status: 'ok', rowId: res[0]});
           
        }
        return response.status(400).json({status: '', rowId: ''});
    }
   

}


export const mainController = new MainController();