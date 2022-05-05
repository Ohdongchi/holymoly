import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "src/auth/auth.service";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";
import { ChatController } from './chat.controller';
@Module({
  providers: [ChatGateway, ChatService],
  exports: [ChatGateway],
  controllers: [ChatController]
})
export class ChatModule {}
