import { ApiProperty } from "@nestjs/swagger";

export class LoginDto{
    @ApiProperty({type:String,name:'username'})
    username:string;

    @ApiProperty({type:String,name:'password'})
    password:string;
}