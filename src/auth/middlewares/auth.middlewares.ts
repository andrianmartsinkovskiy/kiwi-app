import { Injectable, NestMiddleware } from "@nestjs/common";

import { Request,Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { ExpressRequestInterface } from "src/types/express.interface";
import { verify } from "jsonwebtoken";
import { AuthService } from "../auth.service";





@Injectable()

export class AuthMiddleware implements NestMiddleware{

    constructor( private authService : AuthService){
         
    }

    async use(req:ExpressRequestInterface, res:Response , next:NextFunction){


      
        
    if(!req.headers.authorization)
    {

        req.user=null;
        next();
        return;
    }
      
      const token = req.headers.authorization.split(' ')[1];



      try{
          
          
          const decode =verify(token,process.env.JWT_SECRET);
         
          const user =  await this.authService.findById(decode.userId);
          
          req.user=user;


         next();
      }
      catch(err){
         req.user=null;

         next();
      }
    
    }
}