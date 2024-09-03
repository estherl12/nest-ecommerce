import { productEntity } from "src/product/entities/product.entity";
import { Column, DeleteDateColumn, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @OneToMany((type)=>productEntity,product=>product.category,{
        cascade: ["insert", "update"]
    })
    // @JoinColumn({name:'product_id'})
    product:productEntity

    @DeleteDateColumn()
    deletedAt?:Date;
    // @Index()
    // referencedColumn: string;
}
