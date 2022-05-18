import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "src/auth/auth.service";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";
@Module({
  providers: [ChatGateway, ChatService],
  exports: [ChatGateway],
})
export class ChatModule {}
