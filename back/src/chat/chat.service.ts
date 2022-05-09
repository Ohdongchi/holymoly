import { HttpException, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Room } from 'src/models/Room.entity';
import { getConnection } from 'typeorm';
import { v4 as uuidv4 } from "uuid";
import { SendMessageDto, WebSocketCreateRoomDto, WebsocketDeleteRoomDto } from '../Dto/WebSocketDto';


import * as dayjs from "dayjs";
import { ChatLog } from 'src/models/ChatLog.entity';
import { RoomMember } from 'src/models/Neutrality/RoomMember.entity';
import { User } from 'src/models/User.entity';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ChatService {
    private chatRoomList: Array<string>;
    constructor() {
    }

    async createChatRoom(client: Socket, payload: WebSocketCreateRoomDto, req: any): Promise<any> {
        const { roomName, personel, hashTag } = payload;
        const conn = getConnection("waydn");
        Room.useConnection(conn);
        RoomMember.useConnection(conn);
        User.useConnection(conn);

        const findRoom = await Room.createQueryBuilder("room")
            .where("room.roomName = :roomName", { roomName: roomName })
            .getOne();

        if (!findRoom) {

            const room = await conn.transaction(async (queryRunnerManager) => {
                const newRoom = new Room();
                newRoom.host = req.user.userId;
                newRoom.roomName = roomName;
                newRoom.personel = personel;
                return await queryRunnerManager.save(newRoom);
            });

            const user = await User.createQueryBuilder("user")
                .where("user.id =:id", { id: req.user.userId })
                .getOne();

            conn.transaction(async queryRunnerManager => {
                const newMember = new RoomMember();
                newMember.user = user;
                newMember.room = room;
                await queryRunnerManager.save(newMember);
            });

            client.data.roomName = room.roomName;
            client.join(room.roomName);
            client.to(room.roomName).emit("STCCreateRoom", {
                userId: req.user.userId,
                nickname: req.user.nickname,
                message: `${req.user.nickname}님이 ${room.roomName}방을 개설하셨습니다.`,
            });

            console.log(client);
            return { message: "ok" };
        } else {
            throw new WsException("이미 존재하는 채팅룸입니다.");
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
            throw new WsException("존재하지 않는 채팅룸 입니다..");
        }
    }

    async getAllChatRoomList(client: Socket, req: any): Promise<any> {
        const conn = getConnection("waydn");
        Room.useConnection(conn);

        const findRoomAll = await Room.createQueryBuilder("room")
            .select(["room.id", "room.roomName"])
            .getMany();
        return findRoomAll;
    }

    async getAllChatLog(client: Socket, roomId: any, req: any): Promise<any> {
        const conn = getConnection("waydn");
        ChatLog.useConnection(conn);

        const log = await ChatLog.createQueryBuilder("chatLog") // ChatLog => 별명으로 chatLog
            .where("chatlog.roomId = :roomId", { roomId })
            .getMany();

        return log;
    }

    async sendMessage(client: Socket, payload: SendMessageDto, req: any): Promise<any> {
        const conn = getConnection("waydn");
        ChatLog.useConnection(conn);
        Room.useConnection(conn);

        const roomName = await Room.createQueryBuilder("room")
            .select(["room.roomName as roomName"])
            .where("room.id = :roomId", { roomId: payload.roomId })
            .getRawOne();
        // await conn.transaction(async queryRunnerManager => {
        //     let log = new ChatLog();
        //     log.message = payload.message;
        //     log.userId = req.user.id
        //     log.roomId = payload.roomId;
        //     await queryRunnerManager.save(log);
        // });

        client.to(roomName.roomName).emit("STCMessage", {
            userId: req.user.userId,
            nickname: req.user.nickname,
            message: payload.message,
        })
    }

}
