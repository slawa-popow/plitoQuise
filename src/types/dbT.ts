import { QuizeSendData } from "./appT";


export interface DbClient {

    checkClient(uidClient: string): Promise<boolean>;
    wQuizData(data: QuizeSendData): Promise<string[]>;
    getRowData(rowId: string): Promise<QuizeSendData[]>;
    getManagers(): Promise<Admins[]>; 
}


export interface Admins {
    telegram_id: string;
}