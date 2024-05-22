const {check, validationResult} = require("express-validator")
const validateResults = require("sga-core/src/handleValidator")

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (res,req,next)=>{
        validateResults(res,req,next)
    }

]
module.exports={validatorGetItem}