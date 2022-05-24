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

  @ManyToOne(() => User, (user) => user.roomMember)
  user: User;

  @ManyToOne(() => Room, (room) => room.roomMember)
  room: Room;

  @Column({
    type: "int",
    nullable: true,
  })
  hostId: number;
}
