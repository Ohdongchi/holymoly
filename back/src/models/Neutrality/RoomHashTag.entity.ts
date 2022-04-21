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
import { HashTag } from "../HashTag.entity";
import { Room } from "../Room.entity";
import { User } from "../User.entity";

@Entity({ name: "RoomHashTag" })
export class RoomHashTag extends BaseEntity {
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

    @ManyToOne(() => Room, room => room.hashTag)
    room: Room;

    @ManyToOne(() => HashTag, hashTag => hashTag.roomHashTag)
    hashTag: HashTag;
}
