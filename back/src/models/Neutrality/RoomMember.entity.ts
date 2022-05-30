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
import { Room } from "src/models/Room.entity";

@Entity({ name: "RoomMember" })
export class RoomMember extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "int"
  })
  userId: number;

  @Column({
    type:"int"
  })
  roomId: number;

  @ManyToOne(() => User, (user) => user.roomMember)
  @JoinColumn({name:"userId"})
  user: User;

  @ManyToOne(() => Room, (room) => room.roomMember)
  @JoinColumn({name:"roomId"})
  room: Room;

  @Column({
    type: "int",
    nullable: true,
  })
  hostId: number;
}
