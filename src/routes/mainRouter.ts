import { Router } from "express";
import { mainController } from "./MainController";



const mainRouter = Router(); 

mainRouter.get('/',  mainController.getIndexPage);
mainRouter.get('/startQuize', mainController.startQuizes);
mainRouter.post('/user/:uri', mainController.getUserInfo);
mainRouter.post('/sendQuizData', mainController.sendQuizData);


export { mainRouter }