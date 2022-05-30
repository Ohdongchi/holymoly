import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ChatService } from 'src/chat/chat.service';
import { ApiService } from './api.service';

@Controller({ host: "api.localhost" })
export class ApiController {

    constructor(
        private chatService: ChatService,
        private apiService: ApiService
    ) {

    }

    @UseGuards(JwtAuthGuard)
    @Post("/info")
    async Info(@Req() req: any) {
        return await this.apiService.info(req.body.roomId);
    }
}
