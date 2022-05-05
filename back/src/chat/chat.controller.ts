import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

    constructor(
        private chatService: ChatService,
    ) { }

    // @UseGuards(JwtAuthGuard)
    // @Post('createChatRoom')
    // async createChatRoom(@Body() payload: ) {
    //     return this.chatService.createChatRoom()
    // }

}
