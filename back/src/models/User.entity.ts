import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Generated,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Role } from "./Role.entity";
import { Room } from "./Room.entity";
import { UserRole } from "./Neutrality/UserRole.entity";
import { UserHashTag } from "./Neutrality/UserHashTag.entity";
import { RoomMember } from "./Neutrality/RoomMember.entity";

@Entity({ name: "user" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({
    type: "datetime",
    default: () => "now()",
  })
  birthDay: Date;

  @Column({
    type: "varchar",
    length: "2048",
  })
  profileImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @OneToMany(() => Room, (room) => room.user)
  // room: Room[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  role: UserRole[];

  @OneToMany(() => UserHashTag, (userHashTag) => userHashTag.user)
  hashTag: UserHashTag[];

  @OneToMany(() => RoomMember, (roomMember) => roomMember.user)
  roomMember: RoomMember[];

  static fundById(id: number) {
    return this.createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOne();
  }
}
