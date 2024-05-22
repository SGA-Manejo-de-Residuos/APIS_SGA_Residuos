import express from 'express';
const router = express.Router();
import { loginController, refreshController, } from '../controllers/authController';
import{loginValidator, refreshValidator} from "../middlewares/authValidators"
import { requireRefreshToken } from '../middlewares/requireRefreshToken';
// #swagger.autoBody = true
// #swagger.autoQuery = true 
// #swagger.autoHeaders = true 

router.post("/login",loginValidator,loginController)
router.post("/refresh",refreshValidator,requireRefreshToken,refreshController)

module.exports = router