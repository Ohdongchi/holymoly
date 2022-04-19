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
import { Room } from "./Room.entity";
import { User } from "./User.entity";

@Entity({ name: "ChatLog" })
export class ChatLog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar"
    })
    message: string;

    @Column({
        type:"int"
    })
    userId: number;

    @CreateDateColumn()
    createdAt: Date;
}