import{Request,Response,NextFunction} from "express"
import jwt,{JwtPayload} from "jsonwebtoken";

export const requireRefreshToken = (req:Request, res:Response, next:NextFunction) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie) throw new Error("No existe el token");
        const refreshKey = process.env.JWT_REFRESH ||""
        const payload = jwt.verify(refreshTokenCookie, refreshKey) as JwtPayload;
        req.body.uid = payload.id;
        next();
    } catch (error:unknown) {
        const tokenVerificationErrors:{ [key: string]: string } = {
            "invalid signature": "La firma del JWT no es válida",
            "jwt expired": "JWT expirado",
            "invalid token": "Token no válido",
            "No Bearer": "Utiliza formato Bearer",
            "jwt malformed": "JWT formato no válido",
        };
        const errorMessage = (error as Error).message;
        res.status(401).json({ error: tokenVerificationErrors[errorMessage] });
    }
};