import mysql from 'mysql2/promise';
import { Pool } from "mysql2/promise";
 
import dotenv from 'dotenv';
import { DbClient } from '../types/dbT';


dotenv.config();

export enum Table {
    Clients='clients',
    Quize='quize',
};

class MysqlClient implements DbClient {

    private HOST: string = process.env.HOST || '';
    private USER: string = process.env.USER || '';
    private DATABASE: string = process.env.DATABASE || '';
    private PASSWORD: string = process.env.PASSWORD || '';
    private pool: Pool | null = null;

    constructor() { 
        this.setPool()
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

        } catch (e) { console.log('Error in MySqlAgent->setTestData()->catch', e) } 
        finally {
            connection.release();
        }
        return false;
    
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

export const mysqlc = new MysqlClient();