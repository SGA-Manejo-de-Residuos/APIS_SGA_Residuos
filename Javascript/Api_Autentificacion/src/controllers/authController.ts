
import {handleHTTPError,AuthTools,Scheme} from "sga-core";
import {Request,Response}from "express"
import userModel from "../models/user";
import { loginUser, refreshToken } from "../services/loginService";

const loginController= async({headers,url,protocol}:Request,res:Response)=>{
    try {
        const authorization = headers.authorization || "";
        const clientId = (headers.clientid || "") as string;
        const clientSecret = (headers.clientid || "") as string;        
        const urlBase= protocol + '://' + headers.host
        
        const data = await loginUser(authorization,clientId,clientSecret,urlBase)
        if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
            return handleHTTPError(res, "ERROR_LOGIN_USER: No data returned from service", 403);
        }


        res.send({data})
        
    } catch (error) {
        handleHTTPError(res,`ERROR_LOGIN_USER =${error} `)
    }


}
const refreshController= async({headers,url,protocol}:Request,res:Response)=>{
    try {
        const authorization = headers.authorization || "";
        const clientId = (headers.clientid || "") as string;       
        const urlBase= protocol + '://' + headers.host
        const data = await refreshToken()


        res.send({data})
        
    } catch (error) {
        handleHTTPError(res,`ERROR_LOGIN_USER =${error} `)
    }


}

export{loginController,refreshController}