
import { Response} from "express"
import jwt from "jsonwebtoken";
export const generateRefreshToken = (clientId:string, res:Response) => {
    const expiresIn = 60 * 60 * 24 * 30;
    try {
        const refreshKey = process.env.JWT_REFRESH ||""
        const refreshToken = jwt.sign({ clientId },refreshKey, {
            expiresIn,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "dev"),
            expires: new Date(Date.now() + expiresIn * 1000),
            sameSite: "none",
        });
    } catch (error) {
        console.log(error);
    }
};