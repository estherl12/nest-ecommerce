import { Role } from "src/auth/enum/role.enum";
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    roles:Role

    @ManyToOne(()=>User,(buyer)=>buyer.seller)
    buyer:User

    @OneToMany(()=>User,(seller)=>seller.buyer)
    seller:User

    // @DeleteDateColumn()
    // deletedAt?: Date;
  
}
