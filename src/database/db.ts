import { QuizeSendData } from "../types/appT";
import { DbClient } from "../types/dbT";
import { mysqlc } from "./MysqlClient";




export class Db {

    private client: DbClient | null = null;

    constructor (client: DbClient) {
        this.client = client;
    }

    async checkClient(uidClient: string): Promise<boolean> {
        return (this.client) ? await this.client.checkClient(uidClient) : false;
    }

    async writeQuizData(data: QuizeSendData): Promise<string[]> {
        return (this.client) ? await this.client.writeQuizData(data) : [];
    }
}


export const db = new Db(mysqlc);