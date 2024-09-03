import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/auth/enum/role.enum";

export class CreateUserDto {
    roles:Role;
    
    @ApiProperty({example:'',title:'Username',type:String})
    username:string;

    @ApiProperty({type:String,title:'email',})
    email:string;

    @ApiProperty({type:String,title:'password',})
    password:string;

}
