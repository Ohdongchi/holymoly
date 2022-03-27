import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Generated,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";

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

  static fundById(id: number) {
    return this.createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOne();
  }
}
