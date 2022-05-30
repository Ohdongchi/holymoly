import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { ChatService } from 'src/chat/chat.service';
@Module({
  providers: [ApiService, ChatService],
  controllers: [ApiController],
  exports: [ApiService]
})
export class ApiModule { }
