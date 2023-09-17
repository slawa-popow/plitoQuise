

export interface DbClient {

    checkClient(uidClient: string): Promise<boolean>;  

}