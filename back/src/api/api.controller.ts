import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ChatService } from 'src/chat/chat.service';
import { ApiService } from './api.service';

@Controller({ host: "api.localhost" })
export class ApiController {
    // socket 서비스의 api들을 http api로 전향하기 위해 만든 컨트롤러
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

    @UseGuards(JwtAuthGuard)
    @Post("/SRL")
    async sideRoomList(@Req() req: Request) {
        return await this.apiService.sideRoomList(req);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post("/MRL")
    async homeRoomList(@Req() req:any) {
        return await this.apiService.homeRoomList(req);
    }
}
