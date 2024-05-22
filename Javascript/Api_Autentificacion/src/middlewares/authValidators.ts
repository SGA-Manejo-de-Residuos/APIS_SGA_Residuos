import { header } from "express-validator"
import {Scheme,validateResults} from "sga-core"
import {Request,Response,NextFunction} from "express"
const loginValidator = [
    header(Scheme.HEADER_AUTHORIZATION).exists().notEmpty(),
    header(Scheme.HEADER_CLIENT_SECRET).exists().notEmpty(),
    header(Scheme.HEADER_CLIENT_ID).exists().notEmpty(),
    (req:Request,res:Response,next:NextFunction)=>{
        validateResults(req,res,next)
        
    }

]
const refreshValidator =[
    header(Scheme.HEADER_AUTHORIZATION).exists().notEmpty(),
    header(Scheme.HEADER_CLIENT_SECRET).exists().notEmpty(),
    header(Scheme.HEADER_CLIENT_ID).exists().notEmpty(),
    (req:Request,res:Response,next:NextFunction)=>{
        validateResults(req,res,next)
        
    }

]
export{loginValidator , refreshValidator}