import { ApiProperty } from "@nestjs/swagger";
import { Unique } from "typeorm";

export class CreateCategoryDto {

    @ApiProperty({description:'Enter name', type:String,example:''})
    name:string;
}
