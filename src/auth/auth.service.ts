import { BadRequestException, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UsersService,
        private readonly jwtService:JwtService){}
        
async validateUser(username:string,password:string){
    console.log(username);
    console.log(password);
    
    const user = await this.userService.findOne(username);
    if(!user){
        throw new NotAcceptableException("Invalid username and password")
    }
    const ispassword = await bcrypt.compare(user.password,password)
    if(user && ispassword){
        return user;
    }
    else{
        throw new UnauthorizedException("Invalid Username & Password");
    }
}
async login(user:User){

    const users = await this.userService.findOne(user.username);
    if(!user){
        throw new NotFoundException('User not found')
    }
    const payload = {username:user.username,sub:user.id,roles:user.roles}
    const token = this.jwtService.sign(payload)
    return token;
}
}
