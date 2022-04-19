import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    Generated,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    ManyToMany,
    ManyToOne,
    JoinColumn,
    OneToMany,
    OneToOne,
    JoinTable,
} from "typeorm";
import { User } from "../User.entity";

@Entity({name:"UserHashTag"})
export class HashTag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        type: "int",
    })
    userId: number;

    @Column({
        type: "int"
    })
    hashTagId: number;
}
