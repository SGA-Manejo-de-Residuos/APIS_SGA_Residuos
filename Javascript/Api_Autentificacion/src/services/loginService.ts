import { handleHTTPError, AuthTools, Scheme } from "sga-core";
import { Request, Response } from "express";
import User from "../models/user";
import { compare } from "bcrypt";
import { Authentication } from "../interface/Authentication";
import { IUser } from "../interface/user";

const TOKEN_TIME = process.env.TOKEN_TIME || "";
const URL_REFRESH = process.env.URL_REFRESH || "";
export const loginUser = async (
  authorization: string,
  clientId: string,
  clientSecret: string,
  urlBase: string
) => {
  const credentials = AuthTools.getCredentialsBasic(authorization);
  console.log(credentials[0]);
  const user = await User.findOne({email:`${credentials[0]}`});
  console.log(TOKEN_TIME)
  console.log(`User ${user}`);
  
  if (user !== null) {
    const password = credentials[1];

    const hashPassword=user.password ||""
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return "USER_OR_PASSWORD_INCORRECT";
    }
    const issuer = "";
    const role = user.rolUser || "";
    const authentication: Authentication = {
      clientId: clientId,
      accessToken: AuthTools.createJWT(
        clientId,
        issuer,
        clientSecret,
        TOKEN_TIME,
        role
      ),
      refreshToken: urlBase + URL_REFRESH,
      tokenType: Scheme.BEARER,
      expiresIn: TOKEN_TIME,
    };
    return authentication;
  }
};
export const refreshToken = async()=>{

  
}
