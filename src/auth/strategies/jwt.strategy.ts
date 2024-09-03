import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { ExtractJwt } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import * as dotenv from 'dotenv';
import { UsersService } from "src/users/users.service";
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
constructor(private readonly authService:AuthService,
    private readonly userService:UsersService){
    super({
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration:false,
        secret: 'secretKeys',        
    })
}
async validate(payload:any){
        return { userId: payload.sub, email: payload.email, role: payload.role };
      
}

}