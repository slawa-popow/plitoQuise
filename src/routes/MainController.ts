import { Request, Response } from 'express';
import { QuizeSendData } from '../types/appT';
import { telegram } from './telegram';
import { db } from '..';
import { gdoc } from '../utils/gsheets';





class MainController {

    async getIndexPage(_request: Request, response: Response) {
        // const tgid = request.query.tgid;
        // if (!tgid) {
        //     request.session.clientData = {tgid: '#' }
        // } else
        //     request.session.clientData = {tgid: tgid}

        // console.log('getIndexPage ', request.session)

        return response.status(200).render('index', {
            layout: 'main', }); 
    }


    async startQuizes(_request: Request, response: Response) {  
        // const sessionData = request.session.clientData;
        // request.session.clientData = sessionData;       
        // request.session.save();

        // console.log('startQuizes ',  request.session) 
        return response.status(200).render('runsteps', {
            layout: 'main_steps', }); 
    }


    async sendQuizData(request: Request, response: Response) {
        // const sessionData = request.session.clientData;
        

        // console.log('sendQuizData ',  request.session)
        const data = request.body as QuizeSendData;
        let isFrom: string = '';
        
        if (data ) {
            
            data.isFrom = isFrom;
            const curdate = new Date().toLocaleString("ru-RU", {timeZone: "Europe/Moscow"});
            data.date = curdate.split(', ')[0];
            data.clients_id = new Date().getTime().toString(16);
            const res = await db.writeQuizData(data);
            if (Array.isArray(res) && res.length > 0) {
                const d = await telegram.tgMessage(res[0]);
                await gdoc(res[0], d);
                // console.log(d) 
                // request.session.clientData = null;
                // request.session.save();
                
                return response.status(200).json({status: 'ok', rowId: res[0]});

            }
        }
        return response.status(300).json({status: 'redirect', rowId: ''});
    }
   

}


export const mainController = new MainController();