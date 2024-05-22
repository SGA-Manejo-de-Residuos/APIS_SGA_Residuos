import {Response} from "express"
const handleHTTPError = (res:Response,message="Ocurrio un error", code=403)=>{
    res.status(code)
    res.send({error:message})
}
module.exports = handleHTTPError