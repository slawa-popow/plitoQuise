import { Request, Response } from 'express';
import { FromBot } from '../types/appT';
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
            if (isValid) {
                request.session!.client = botData;                  // session
                return response.status(200).json({status: 200})
            }
        }
        request.session = undefined;
        return response.status(403).json({status: 0}) 
    }

   

}


export const mainController = new MainController();