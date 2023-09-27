import mysql, { ResultSetHeader } from 'mysql2/promise';
import { Pool } from "mysql2/promise";
 
import dotenv from 'dotenv';
import { Admins, DbClient } from '../types/dbT';
import { QuizeSendData } from '../types/appT';
import session from 'express-session';
const MySQLStore = require('express-mysql-session')(session);




dotenv.config();

export enum Table {
    Clients='clients',
    Quize='quize',
    Admins='managers'
};

export class MysqlClient implements DbClient {

    private HOST: string = process.env.PHOST || '';
    private USER: string = process.env.PUSER || '';
    private DATABASE: string = process.env.PDATABASE || '';
    private PASSWORD: string = process.env.PPASSWORD || '';
    private pool: Pool | null = null;

    public sessionStore: any = null;

    constructor() { 
        this.setPool();      
    }

    setPool(): void {
        const pool: Pool = mysql.createPool({ 
            connectionLimit: 20, 
            host: this.HOST,
            user: this.USER,
            password: this.PASSWORD,
            database: this.DATABASE,
            waitForConnections: true,
            rowsAsArray: false,
        }); 
        this.pool = pool;
        this.sessionStore = new MySQLStore({
            createDatabaseTable: true,
            clearExpired: true,
            checkExpirationInterval: 600000,
            expiration: 6000000,
        }, this.pool);
    }


    async checkClient(uidClient: string): Promise<boolean> {
        const connection = await this.pool!.getConnection();

        try {
            if (connection) {
                const [_res, _serv] = await connection.query(`SELECT uid FROM ${Table.Clients} WHERE uid='${uidClient}';`);
                const res = _res as { uid: string } []
                await connection.commit();  
                return (res.length > 0) ? true : false;
            }

        } catch (e) { console.log('Error in MySqlAgent->checkClient()->catch', e) } 
        finally {
            connection.release();
        }
        return false;
    
    }


    async getManagers(): Promise<Admins[]> {
        const connection = await this.pool!.getConnection();

        try {
            if (connection) {
                const [_res, _serv] = await connection.query(`SELECT telegram_id FROM ${Table.Admins};`);
                const res = _res as Admins[];
                await connection.commit();  
                return res;
            }

        } catch (e) { console.log('Error in MySqlAgent->getManagers()->catch', e) } 
        finally {
            connection.release();
        }
        return [];
    }


    async getRowData(rowId: string): Promise<QuizeSendData[]> {
        const connection = await this.pool!.getConnection();

        try {
            if (connection) {
                const [_res, _serv] = await connection.query(`SELECT * FROM ${Table.Quize} WHERE id='${rowId}';`);
                const res = _res as QuizeSendData[];
                await connection.commit();  
                return res;
            }

        } catch (e) { console.log('Error in MySqlAgent->getRowData()->catch', e) } 
        finally {
            connection.release();
        }
        return [];
    }

// 38
    async wQuizData(data: QuizeSendData): Promise<string[]> {
        const connection = await this.pool!.getConnection();

        try {
            if (connection) {
                const arrdata = [
                    data.clients_id, 
                    data.isFrom, 
                    data.name || "", 
                    '', 
                    data.phone, 
                    data.color_fence_block, 
                    data.var_comp_coll,
                    data.fill_between_coll, 
                    data.isAutomatic, 
                    data.isMount,
                    data.height_fence, 
                    data.total_lenght_fence, 
                    data.lenght_between_colls,
                    data.how_many_wickets, 
                    data.width_wicket, 
                    data.width_second_wicket, 
                    data.how_many_gates, 
                    data.width_gates,  
                    data.width_second_gates,
                    data.telegram || '', 
                    data.city, 
                    data.date || '',  
                    'country'
                    ];

                const [rsh, _] = await connection.query(`INSERT INTO ${Table.Quize}
                (
                    clients_id, 
                    is_from, 
                    name, 
                    email, 
                    phone, 
                    color_fence_block, 
                    var_comp_coll,
                    fill_between_coll, 
                    isAutomatic, 
                    isMount,
                    height_fence, 
                    total_lenght_fence, 
                    lenght_between_colls,
                    how_many_wickets, 
                    width_wicket, 
                    width_second_wicket, 
                    how_many_gates, 
                    width_gates,  
                    width_second_gates,
                    telegram, 
                    city, 
                    date,  
                    country
                    ) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  ?, ?, ?);`, arrdata); 
                const res = rsh as ResultSetHeader;
                return ['' + res.insertId];
            }

        } catch (e) { console.log('Error in MySqlAgent->writeQuizData()->catch', e) } 
        finally {
            connection.release();
        }
        return [];
    }



    //--------- sample method --------------------------------------
    async setTestData(data: Array<string>): Promise<any> { 
        const connection = await this.pool!.getConnection();

        try {
            if (connection) {
                const res = connection.query(`INSERT INTO ${Table.Clients}(name, age) VALUES(?, ?);`, data);  
                return res;
            }

        } catch (e) { console.log('Error in MySqlAgent->setTestData()->catch', e) } 
        finally {
            connection.release();
        }
        return [];
    } 

    
}

