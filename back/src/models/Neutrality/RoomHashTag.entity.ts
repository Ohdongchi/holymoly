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
    roomId: number;

    @Column({
        type: "int"
    })
    hashTagId: number;

    @ManyToOne(() => Room, room => room.hashTag)
    @JoinColumn({ name: "roomId" })
    room: Room;

    @ManyToOne(() => HashTag, hashTag => hashTag.roomHashTag)
    @JoinColumn({ name: "hashTagId" })
    hashTag: HashTag;
}
