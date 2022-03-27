import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import {v4 as uuidv4} from "uuid";
import { WebSocketDto } from '../Dto/WebSocketDto';
@Injectable()
export class ChatService {
     

    createChatRoom(client:Socket, payload: WebSocketDto): void { 
        
    }
}
