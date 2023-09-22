 
import { QuizeSendData } from "../types/appT";
import { Admins, DbClient } from "../types/dbT";



export class Db {

    private client: DbClient | null = null;

    constructor (client: DbClient) {
        this.client = client;
    }

    async checkClient(uidClient: string): Promise<boolean> {
        return (this.client) ? await this.client.checkClient(uidClient) : false;
    }

    async writeQuizData(data: QuizeSendData): Promise<string[]> {
        return (this.client) ? await this.client.wQuizData(data) : [];
    }

    async getRowData(rowId: string): Promise<QuizeSendData[]> {
        return (this.client) ? await this.client.getRowData(rowId) : [];
    }

    async getManagers(): Promise<Admins[]> {
        return (this.client) ? await this.client.getManagers() : [];
    }
}


