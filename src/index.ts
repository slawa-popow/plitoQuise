
import cors from 'cors';
import path  from 'path';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import { engine } from 'express-handlebars';
import { mainRouter } from './routes/mainRouter';
import cookieParser from 'cookie-parser';

dotenv.config();

export const app = express();

const secret = process.env.SECRET || '';

app.use(express.static(path.join(__dirname, '../public'))); 
app.engine('handlebars', engine());
app.set('view engine', 'handlebars'); 
app.set('views', __dirname + '/../views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

app.use(cookieParser(secret));



app.use(bodyParser.urlencoded({extended: true}));  
app.use(cors({credentials: true}));



app.use('/', mainRouter);
 

const port = process.env.PORT;

app.listen(port, () => { 
  console.log(`\nRunning App at localhost:${port}\n`)   
});  