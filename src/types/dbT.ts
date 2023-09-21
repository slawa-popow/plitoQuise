import { QuizeSendData } from "./appT";


export interface DbClient {

    checkClient(uidClient: string): Promise<boolean>;
    writeQuizData(data: QuizeSendData): Promise<boolean>;

}