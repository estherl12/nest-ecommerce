import { type } from "os";
import { CategoryEntity } from "src/category/entities/category.entity";
import { ImageEntity } from "src/image/image.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
 export class productEntity{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    productname:string;

    @Column()
    price:number;

    @Column()
    brandname:string;

    @Column()
    description:string;

    @ManyToOne((type)=>CategoryEntity,category=>category.product)
   //  @JoinColumn({name:'category',referencedColumnName:'name'})
   @JoinColumn({name:'category_id'})
   category:CategoryEntity
   
    @OneToMany((type)=>ImageEntity,image=>image.product)
    // @JoinColumn({name:'image_id'})
    image:ImageEntity


 }