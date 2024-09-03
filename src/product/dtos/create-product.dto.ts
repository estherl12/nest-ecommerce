import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto{
    id:number;
    
    @ApiProperty()
    productname:string;

    @ApiProperty()
    price:number;

    @ApiProperty()
    brandname:string;

    @ApiProperty()
    description:string;

   @ApiProperty()
   category_id:number
   
//    @ApiProperty()
//     image_id:number

}