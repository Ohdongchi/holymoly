import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./Category.entity";
import { ChatLog } from "./ChatLog.entity";
import { HashTag } from "./HashTag.entity";
import { RoomHashTag } from "./Neutrality/RoomHashTag.entity";
import { UserHashTag } from "./Neutrality/UserHashTag.entity";
import { Role } from "./Role.entity";
import { Room } from "./Room.entity";
import { User } from "./User.entity";

@Module({
  imports: [TypeOrmModule.forFeature([
    User,
    Room,
    // Role,
    HashTag,
    ChatLog,
    RoomHashTag,
    UserHashTag,
  ])],
})
export class ModelsModule {}
