import { Router } from "express";
import { mainController } from "./MainController";
// import { authSession } from "./authSession"; 



const mainRouter = Router(); 

mainRouter.get('/',  mainController.getIndexPage);
mainRouter.get('/startquize', mainController.startQuizes);

mainRouter.post('/sendquizdata',  mainController.sendQuizData);


export { mainRouter }