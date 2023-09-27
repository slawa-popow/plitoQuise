
import cors from 'cors';
import path  from 'path';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import { engine } from 'express-handlebars';
import { mainRouter } from './routes/mainRouter';
import { MysqlClient } from './database/MysqlClient';
import session from 'express-session';
// import { funcs } from './utils/funcs';
import { Db } from './database/db';
 
declare module 'express-session' {
  interface SessionData {
    clientData: any;
  }
}


dotenv.config();

export const app = express();


const secret = process.env.SECRET || '123';
export const mysqlc = new MysqlClient();
export const db = new Db(mysqlc);

app.use(cors({credentials: true, origin: ['/', 
    '/startquize', '/sendquizdata']}));

app.use(express.static(path.join(__dirname, '../public'))); 
app.engine('handlebars', engine());
app.set('view engine', 'handlebars'); 
app.set('views', __dirname + '/../views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

// const expiryOffset = 1*24*60*60*1000; // +1 day

app.use(session({
  name: 'sos',
	secret: secret,
  unset: 'keep',
	store: mysqlc.sessionStore,
  saveUninitialized: false,
	resave: false,
  cookie: {maxAge: 800000, secure: true, sameSite: 'none', httpOnly: true, }
}));



app.use('/', mainRouter);
 

const port = process.env.PORT;

app.listen(port, () => { 
  console.log(`\nRunning App at localhost:${port}\n`)   
});  