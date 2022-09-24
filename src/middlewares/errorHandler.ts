import { NextFunction, Request, Response } from "express";
import { Error as mongooseError } from "mongoose";

export const errorHandler = ( error: any, req : Request, res: Response, next: NextFunction) => {
    console.error(error);

    if (error instanceof mongooseError ) return  res.json(error).status(400)
    if (error instanceof Error) return res.json({error: error.message}).status(500);
}