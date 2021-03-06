import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkId = (req: Request) => {
  const token = <string>req.headers["authorization"].replace('Bearer ', '');
  let jwtPayload;
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    return jwtPayload.userId
  } catch (error) {
    return error
  }
}


export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  let token =""
  if (req.headers["authorization"]){
     token = <string>req.headers["authorization"].replace('Bearer ', '');
  } else {
     token =""
  }
  
  let jwtPayload;
  
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    console.log("Token not valid")
    return res.status(401).send(error);
    //next()
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  // const { userId, username } = jwtPayload;
  // const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
  //   expiresIn: "1h"
  // });
  // res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};