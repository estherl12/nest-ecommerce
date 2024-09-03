import { type } from "os";
import { productEntity } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ImageEntity{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    image:string;

    @ManyToOne((type)=>productEntity,product=>product.image)
    @JoinColumn({name:'product_id'})
    product:productEntity;

}