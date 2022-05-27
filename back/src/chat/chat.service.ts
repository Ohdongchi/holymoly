import { HttpException, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Room } from 'src/models/Room.entity';
import { getConnection } from 'typeorm';
import { v4 as uuidv4 } from "uuid";
import { SendMessageDto, CreateRoomDto, DeleteRoomDto, JoinRoomDto } from '../Dto/WebSocketDto';
import * as dayjs from "dayjs";


import { ChatLog } from 'src/models/ChatLog.entity';
import { RoomMember } from 'src/models/Neutrality/RoomMember.entity';
import { User } from 'src/models/User.entity';
import { WsException } from '@nestjs/websockets';
import { RoomHashTag } from 'src/models/Neutrality/RoomHashTag.entity';
import { HashTag } from 'src/models/HashTag.entity';

@Injectable()
export class ChatService {
    constructor() {
    }

    async createChatRoom(client: Socket, payload: CreateRoomDto, req: any): Promise<any> {
        const { roomName, personel, hashTag } = payload;
        const conn = getConnection("waydn");
        Room.useConnection(conn);
        RoomMember.useConnection(conn);
        User.useConnection(conn);
        HashTag.useConnection(conn);
        RoomHashTag.useConnection(conn);

        const findRoom = await Room.createQueryBuilder("room")
            .where("room.roomName = :roomName", { roomName: roomName })
            .leftJoin("room.roomMember", "roomMember.room")
            .getOne();
        if (!findRoom) {

            const insertRoom = await conn.transaction(async (queryRunnerManager) => {
                const newRoom = new Room();
                newRoom.roomName = roomName;
                newRoom.personel = personel;
                return await queryRunnerManager.save(newRoom);
            });

            const user = await User.createQueryBuilder("user")
                .where("user.id =:id", { id: req.user.id })
                .getOne();

            conn.transaction(async queryRunnerManager => {
                const newMember = new RoomMember();
                newMember.user = user;
                newMember.room = insertRoom;
                newMember.hostId = user.id;
                return await queryRunnerManager.save(newMember);
            });

            // // test 결과 둘이 비슷 비슷 하지만 간단하게 할 때 는 forEach 문이 더 빠르다 ~
            // for (let i = 0; i < payload.hashTag.length; i++) {
            //     let res = payload.hashTag[i];
            //     (async (res) => {
            //         await HashTag.createQueryBuilder()
            //             .insert()
            //             .orIgnore()
            //             .into(HashTag)
            //             .values({
            //                 hashTag: res,
            //             })
            //             .execute();

            //         console.log("실행")
            //     })()
            // }

            payload.hashTag.forEach(async res => {
                await HashTag.createQueryBuilder()
                    .insert()
                    .orIgnore()
                    .into(HashTag)
                    .values({
                        hashTag: res,
                    })
                    .execute();
                const id = await HashTag.createQueryBuilder("tag")
                    .select(["tag.id"])
                    .where("tag.hashTag = :t", { t: res })
                    .getOne();

                await RoomHashTag.createQueryBuilder()
                    .insert()
                    .into(RoomHashTag)
                    .values({
                        hashTag: id,
                        room: insertRoom,
                    })
                    .execute();
            });


            client.data.roomName = insertRoom.roomName;
            client.join(insertRoom.roomName);
            client.to(insertRoom.roomName).emit("STCCreateRoom", {
                id: req.user.id,
                nickname: req.user.nickname,
                message: `${req.user.nickname}님이 ${insertRoom.roomName}방을 개설하셨습니다.`,
            });

            return { message: "ok" };
        } else {
            console.log("실패");
            client.emit("error", {
                error: "이미 존재하는 채팅방 입니다.",
            })
            return { message: "failed" };
        }
    }

    async joinChatRoom(client: Socket, payload: JoinRoomDto, req: any): Promise<any> {

        const conn = getConnection("waydn");
        Room.useConnection(conn);
        RoomMember.useConnection(conn);
        const findRoom = await Room.createQueryBuilder("room")
            .where("room.id = :id", { id: payload[0].roomId })
            .getOne();

        console.log("findRoom", findRoom);

        if (!findRoom) {
            throw new WsException("방을 찾을 수 없습니다.");
        }

        if (findRoom) {
            const insert = conn.transaction(async queryRunnerManager => {
                const newMember = new RoomMember();
                const newRoom = new Room();
                console.log(newRoom);
                newMember.user = req.user;
                newMember.room = findRoom;
                return await queryRunnerManager.save(newMember);
            });


            client.join(findRoom.roomName);
            client.to(findRoom.roomName).emit("joinChatRoom", {
                id: req.user.id,
                nickname: req.user.nickname,
                message: `${req.user.nickname}님이 입장하셨습니다.`,
            });
            return { message: "ok" };
        }

        return { message: "failed" };
    }

    async deleteChatRoom(client: Socket, paylaod: DeleteRoomDto, req: any): Promise<any> {
        const { roomId } = paylaod;
        const conn = getConnection("waydn");
        Room.useConnection(conn);
        RoomHashTag.useConnection(conn);

        const findRoom = await Room.createQueryBuilder("room")
            .leftJoinAndSelect("room.roomMember", "roomMember")
            .where("room.id = :roomId", { roomId })
            .andWhere("roomMember.hostId = :id", { id: req.user.id })
            .getOne();

        if (findRoom && req.user.id === findRoom.roomMember[0].hostId) {
            findRoom.deletedAt = new Date();
            conn.transaction(async (queryRunnerManager) => {
                await queryRunnerManager.save(findRoom);
            });
            return { message: "ok" };
        } else {
            throw new WsException("존재하지 않는 채팅룸 입니다..");
        }
    }
    async exitChatRoom(client: Socket, payload: any, req: any): Promise<any> {
        const rn = await Room.createQueryBuilder("room")
            .select(["room.roomName"])
            .where("room.id = :id", { id: payload.roomId })
            .getOne();

        if (rn) {
            throw new WsException("방을 찾을 수 없습니다.");
        }

        client.leave(rn.roomName);
        client.to(rn.roomName).emit("exitChatRoom", {
            id: req.user.id,
            nickname: req.user.nickname,
            message: `${req.user.nickname}님이 떠나셨습니다.`,
        });

        return { message: "ok" };
    }

    async getAllChatRoomList(client: Socket, req: any): Promise<any> {
        const conn = getConnection("waydn");
        Room.useConnection(conn);

        const findAllRoom = await Room.createQueryBuilder("room")
            .select(["room.id", "room.roomName"])
            .leftJoin("room.roomMember", "roomMember")
            .where("roomMember.hostId = :id", { id: req.user.id })
            .getMany();

        client.emit("SgetChatRoomList", findAllRoom);

        return { message: "ok" };
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

        const rn = await Room.createQueryBuilder("room")
            .where("room.id = :roomId", { roomId: payload.roomId })
            .getOne();

        if (rn) {
            throw new WsException("방을 찾을 수 없습니다.");
        }

        await conn.transaction(async queryRunnerManager => {
            let log = new ChatLog();
            log.message = payload.message;
            log.id = req.user.id
            log.roomId = payload.roomId;
            await queryRunnerManager.save(log);
        });

        client.to(rn.roomName).emit("STCMessage", {
            id: req.user.id,
            nickname: req.user.nickname,
            message: payload.message,
        });

        return { message: "ok" };
    }

}
