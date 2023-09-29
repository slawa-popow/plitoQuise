import { Request, Response } from 'express';
import { QuizeSendData } from '../types/appT';
import { telegram } from './telegram';
import { db } from '..';
import { gdoc } from '../utils/gsheets';





class MainController {

    async getIndexPage(request: Request, response: Response) {
        try {
            const tgid = request.query.tgid;
            if (!tgid) {
                request.session.clientData = {tgid: '#' }
            } else {
                request.session.clientData = {tgid: tgid}
            }
            request.session.save();
             
        } catch (e) {console.log('try-catch getIndexpage ', e)}

        return response.status(200).render('index', {
            layout: 'main', }); 
    }


    async startQuizes(request: Request, response: Response) {
        const sess = request.session;
        console.log('startQuizes ',  sess, request.sessionID); 
        return response.status(200).render('runsteps', {
            layout: 'main_steps', }); 
    }


    async sendQuizData(request: Request, response: Response) {
        const sessionData = request.session;
        const data = request.body as QuizeSendData;
        let isFrom: string = '';
        
        if (data) {
            if (sessionData.clientData && sessionData.clientData.tgid != '#') {
                isFrom = 'telegram';
                data.telegram = sessionData.clientData.tgid;
            } else { isFrom = 'web'; }
            data.isFrom = isFrom;
            const curdate = new Date().toLocaleString("ru-RU", {timeZone: "Europe/Moscow"}); 
            data.date = curdate.split(', ')[0];
            data.clients_id = new Date().getTime().toString(16);
            const res = await db.writeQuizData(data);
            if (Array.isArray(res) && res.length > 0) {
                const d = await telegram.tgMessage(res[0]);
                 
                if (sessionData.clientData && sessionData.clientData.tgid === '#') 
                    await gdoc(res[0], d);
                                 
                return response.status(200).json({status: 'ok', rowId: res[0]});

            }
        }
        return response.status(300).json({status: 'redirect', rowId: ''});
    }
   

}


export const mainController = new MainController();