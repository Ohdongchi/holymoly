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
} from "typeorm";

import { RoleType } from "./RoleType/RoleType";
import { User } from "./User.entity";

@Entity({ name: "Role" })
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum:  [RoleType]
    }) 
    role: RoleType;
    
    @ManyToOne(() => User, (user) => user.id)
    user: User;
}