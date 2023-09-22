import { NextFunction, Request, Response } from "express";


export function authSession (req: Request, resp: Response, next: NextFunction) {
    let isNext = req.sessionID;
    console.log(req.session)
    if (isNext) {
        return next();
    } else {
        return resp.status(300).json({status: 'redirect', rowId: ''});
    }
}