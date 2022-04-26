import { HttpException, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Room } from 'src/models/Room.entity';
import { getConnection } from 'typeorm';
import { v4 as uuidv4 } from "uuid";
import { WebSocketCreateRoomDto, WebsocketDeleteRoomDto } from '../Dto/WebSocketDto';


import * as dayjs from "dayjs";

@Injectable()
export class ChatService {
    private chatRoomList: Array<string>;
    constructor() {
    }

    async createChatRoom(client: Socket, payload: WebSocketCreateRoomDto, req: any): Promise<any> {

        const { roomName, personel, hashTag } = payload;
        const conn = getConnection("waydn");
        Room.useConnection(conn);

        const findRoom = await Room.createQueryBuilder("room")
            .where("room.roomName = :roomName", { roomName: roomName })
            .getOne();

        if (!findRoom) {
            conn.transaction(async (queryRunnerManager) => {
                const newRoom = new Room();
                newRoom.host = req.user.userId;
                newRoom.roomName = roomName;
                newRoom.personel = personel;
                await queryRunnerManager.save(newRoom);
            });
            return { message: "ok" };
        } else {
            throw new HttpException("이미 존재하는 채팅룸입니다.", 401);
        }
    }

    async deleteChatRoom(client: Socket, paylaod: WebsocketDeleteRoomDto, req: any): Promise<any> {
        const { roomName } = paylaod;
        const conn = getConnection("waydn");
        Room.useConnection(conn);

        const findRoom = await Room.createQueryBuilder("room")
            .where("room.roomName = :roomName", { roomName: roomName })
            .getOne();

        if (findRoom && req.user.userId === findRoom.host) {
            findRoom.deletedAt = new Date();
            conn.transaction(async (queryRunnerManager) => {
                await queryRunnerManager.save(findRoom);
            });
            return { message: "ok" };
        } else {
            throw new HttpException("존재하지 않는 채팅룸 입니다..", 401);
        }
    }

    async getAllChatRoomList(client: Socket, req: any): Promise<any> {
        const conn = getConnection("waydn");
        Room.useConnection(conn);

        const findRoomAll = await Room.createQueryBuilder("room")
            .select(["room.id", "room.roomName"])
            .getMany();
        console.log(findRoomAll);
        return { message: "ok" };
    }
}
