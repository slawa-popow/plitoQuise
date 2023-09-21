import { Request, Response } from 'express';
import { FromBot, QuizeSendData } from '../types/appT';
import { db } from '../database/db';


class MainController {

    async getIndexPage(_request: Request, response: Response) {

        return response.status(200).render('index', {
            layout: 'main', }); 
    }


    async startQuizes(_request: Request, response: Response) {
        return response.status(200).render('runsteps', {
            layout: 'main_steps', }); 
    }


    async getUserInfo(request: Request, response: Response) {
        const uidClient: string = request.params.uri;
        const botData: FromBot = request.body;
        if (uidClient && botData) {
            const isValid = await db.checkClient(uidClient);

            console.log('isValid: ', isValid, 'uidClient: ', uidClient, 'botData: ',  botData);

            if (isValid) {
                request.session!.client = botData;                  // session

                console.log('sesion: ', request.session);

                return response.status(200).json({status: 200})
            }
        }
        request.session = null;
        return response.status(403).json({status: 0}) 
    }


    async sendQuizData(request: Request, response: Response) {
        const data = request.body as QuizeSendData;
        let isFrom: string = '';
        //width_gates: 'откатные: 3.5/распашные: 3.5',
        //width_second_gates: 'откатные: 0/распашные: 0',
        // console.log(data)
        if (data) {

            console.log(request.session, request.session!.client)

            if (request.session && request.session.client) {
                const client: FromBot = request.session.client;
                const uid = client.uid;
                const isValid = await db.checkClient(uid);
                if (isValid) {
                    isFrom = 'TELEGRAM';
                    const curdate = client.date;
                    data.date = curdate;
                    data.isFrom = isFrom;
                    data.telegram = client.telegram_id || ''; 
                    data.uid = uid || '';

                    console.log('enter to TELEGRAM block');
                }
            } else {
                isFrom = 'WEB';
                data.isFrom = isFrom;
                data.clients_id = null;
                const curdate = new Date().toLocaleString("ru-RU", {timeZone: "Europe/Moscow"});
                data.date = curdate.split(', ')[0];
            }
            const res = await db.writeQuizData(data);
            if (res)
                return response.status(200).json({status: 'ok'});
        }
        return response.status(400).json({status: ''});
    }
   

}


export const mainController = new MainController();