
import cors from 'cors';
import path  from 'path';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import { engine } from 'express-handlebars';
import { mainRouter } from './routes/mainRouter';
import { MysqlClient } from './database/MysqlClient';
import session from 'express-session';
import { funcs } from './utils/funcs';
import { Db } from './database/db';
 
declare module 'express-session' {
  interface SessionData {
    clientData: any;
  }
}


dotenv.config();

export const app = express();

const secret = process.env.SECRET || '';
export const mysqlc = new MysqlClient();
export const db = new Db(mysqlc);


app.use(express.static(path.join(__dirname, '../public'))); 
app.engine('handlebars', engine());
app.set('view engine', 'handlebars'); 
app.set('views', __dirname + '/../views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 


app.use(bodyParser.urlencoded({extended: true}));  
app.use(cors({credentials: true}));
app.use(session({
  genid: function(_req) {
    return funcs.getUID();
  },
  name: 'connect.sid',
	secret: secret,
	store: mysqlc.sessionStore,
	resave: false,
  unset: 'destroy',
	saveUninitialized: false,
  
}));



app.use('/', mainRouter);
 

const port = process.env.PORT;

app.listen(port, () => { 
  console.log(`\nRunning App at localhost:${port}\n`)   
});  