import { Request, Response } from 'express';
import { QuizeSendData } from '../types/appT';
import { telegram } from './telegram';
import { db } from '..';
// import { funcs } from '../utils/funcs';



class MainController {

    async getIndexPage(request: Request, response: Response) {
        request.session.clientData = {tgid: 'index' }
        console.log('getIndexPage ', request.session.id)

        return response.status(200).render('index', {
            layout: 'main', }); 
    }


    async startQuizes(request: Request, response: Response) { 
        request.session.clientData = {tgid: 'start quize' }
        console.log('startQuizes ', request.session.id) 
        return response.status(200).render('runsteps', {
            layout: 'main_steps', }); 
    }


    async sendQuizData(request: Request, response: Response) {
         
        const data = request.body as QuizeSendData;
        let isFrom: string = '';
        console.log('sess bef del ', request.session)
        if (data && request.session.clientData) {
            isFrom = 'WEB';
            data.isFrom = isFrom;
            const curdate = new Date().toLocaleString("ru-RU", {timeZone: "Europe/Moscow"});
            data.date = curdate.split(', ')[0];
            data.clients_id = new Date().getTime().toString(16);
            const res = await db.writeQuizData(data);
            if (Array.isArray(res) && res.length > 0)
                await telegram.tgMessage(res[0]);
                request.session.clientData = null;
                request.sessionStore.destroy(request.session.id);
                console.log('sess after del ', request.session);

                return response.status(200).json({status: 'ok', rowId: res[0]});
           
        }
        return response.status(300).json({status: 'redirect', rowId: ''});
    }
   

}


export const mainController = new MainController();