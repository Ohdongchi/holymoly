import { HttpException, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Room } from 'src/models/Room.entity';
import { getConnection } from 'typeorm';
import { v4 as uuidv4 } from "uuid";
import { SendToServerMessageDto, CreateRoomDto, DeleteRoomDto, JoinRoomDto, HttpChatDto } from '../Dto/ChatDto';
import * as dayjs from "dayjs";


import { ChatLog } from 'src/models/ChatLog.entity';
import { RoomMember } from 'src/models/Neutrality/RoomMember.entity';
import { User } from 'src/models/User.entity';
import { WsException } from '@nestjs/websockets';
import { RoomHashTag } from 'src/models/Neutrality/RoomHashTag.entity';
import { HashTag } from 'src/models/HashTag.entity';
import { Request } from 'express';

@Injectable()
export class ChatService {
    constructor() {
    }

    // complete
    async createChatRoom(client: Socket, payload: CreateRoomDto, req: any, server: any): Promise<any> {
        const { roomName, personel, hashTag } = payload;
        const conn = getConnection("waydn");
        Room.useConnection(conn);
        RoomMember.useConnection(conn);
        User.useConnection(conn);
        HashTag.useConnection(conn);
        RoomHashTag.useConnection(conn);

        const findRoom = await Room.createQueryBuilder("room")
            .where("room.roomName = :roomName", { roomName: roomName })


            .leftJoin("room.roomMember", "roomMember")
            .getOne();
        if (!findRoom) {

            // room 생성
            const insertRoom = await conn.transaction(async (queryRunnerManager) => {
                const newRoom = new Room();
                newRoom.roomName = roomName;
                newRoom.personel = personel;
                return await queryRunnerManager.save(newRoom);
            });

            /*
                room이 생성되면 생성한 사람도 방의 구성원이기 때문에 roomMember에 추가해준다.
            */

            const user = await User.createQueryBuilder("user")
                .where("user.id =:id", { id: req.user.id })
                .getOne();

            // roomMember 추가
            conn.transaction(async queryRunnerManager => {
                const newMember = new RoomMember();
                newMember.user = user;
                newMember.room = insertRoom;
                newMember.hostId = user.id;
                return await queryRunnerManager.save(newMember);
            });
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


            // client.data.roomName = insertRoom.roomName;s
            client.join(insertRoom.roomName);
            server.to(insertRoom.roomName).emit("STCCreateRoom", {
                id: req.user.id,
                nickname: req.user.nickname,
                message: `${req.user.nickname}님이 ${insertRoom.roomName}방을 개설하셨습니다.`,
            });

            return { message: "ok" };
        } else {
            console.log("실패");
            return { message: "failed" };
        }
    }

    // complete
    async joinChatRoom(client: Socket, payload: JoinRoomDto, req: any, server: Server): Promise<any> {

        const conn = getConnection("waydn");
        Room.useConnection(conn);
        RoomMember.useConnection(conn);

        const findRoom = await Room.createQueryBuilder("room")
            .where("room.id = :id", { id: payload.roomId })
            .getOne();

        if (!findRoom) {
            return { meesage: "방을 찾을 수 없습니다." };
        } else {

            const findMember = await Room.createQueryBuilder("room")
                .leftJoinAndSelect("room.roomMember", "roomMember")
                .where("room.id =:roomId", { roomId: payload.roomId })
                .andWhere("roomMember.userId = :userId", { userId: req.user.id })
                .getOne();

            // console.log("findMember", findMember);
            if (!findMember) {
                // roomMember 추가
                conn.transaction(async queryRunnerManager => {
                    const newMember = new RoomMember();
                    newMember.user = req.user;
                    newMember.room = findRoom;
                    return await queryRunnerManager.save(newMember);
                });
            }
            await conn.transaction(async queryRunnerManager => {
                let log = new ChatLog();
                log.message = `${req.user.nickname}님이 입장하셨습니다.`;
                log.userId = req.user.id
                log.roomId = payload.roomId;
                log.nickname = req.user.nickname;
                return await queryRunnerManager.save(log);
            });

            client.join(`${payload.roomId}`);
            server.to(`${payload.roomId}`).emit("joinedRoom", {
                userId: req.user.id,
                nickname: req.user.nickname,
                message: `${req.user.nickname}님이 입장하셨습니다.`,
                roomId: payload.roomId,
                join: true,
            });

            return { message: "ok" };
        }
    }

    // exitedRoom에 통합
    // async deleteChatRoom(client: Socket, paylaod: DeleteRoomDto, req: any, server: any): Promise<any> {
    //     const { roomId } = paylaod;
    //     const conn = getConnection("waydn");
    //     Room.useConnection(conn);
    //     RoomHashTag.useConnection(conn);

    //     const findRoom = await Room.createQueryBuilder("room")
    //         .leftJoinAndSelect("room.roomMember", "roomMember")
    //         .where("room.id = :roomId", { roomId })
    //         .andWhere("roomMember.hostId = :id", { id: req.user.id })
    //         .getOne();

    //     if (findRoom && req.user.id === findRoom.roomMember[0].hostId) {
    //         findRoom.deletedAt = new Date();
    //         conn.transaction(async (queryRunnerManager) => {
    //             await queryRunnerManager.save(findRoom);
    //         });
    //         server.socketsLeave(`${roomId}`);
    //         return { message: "ok" };
    //     } else {
    //         throw new WsException("존재하지 않는 채팅룸 입니다..");
    //     }
    // }

    // 끝
    async exitChatRoom(client: Socket, payload: any, req: any, server: any): Promise<any> {

        const conn = getConnection("waydn");
        Room.useConnection(conn);
        RoomMember.useConnection(conn);

        const realMemeber = await RoomMember.createQueryBuilder("roomMember")
            .where("roomMember.roomId = :roomId", { roomId: payload.roomId })
            .andWhere("roomMember.userId = :userId", { userId: req.user.id })
            .getOne();

        if (!realMemeber) {
            throw new WsException("유저를 찾을 수 없습니다.");
        }

        if (realMemeber.hostId == req.user.id) {
            // 만약 hostId 와 요청한 user의 id가 같다면 채팅방 삭제
            const findRoom = await Room.createQueryBuilder("room")
                .leftJoinAndSelect("room.roomMember", "roomMember")
                .where("room.id = :roomId", { roomId: payload.roomId })
                .andWhere("roomMember.hostId = :id", { id: req.user.id })
                .getOne();
            
            const test = await conn.transaction(async (queryRunnerManager) => {
                findRoom.deletedAt = new Date();
                return await queryRunnerManager.save(findRoom);
            });
            
        }

        // // 채팅방 목록에서 채팅방 해당 인원 삭제
        await RoomMember.createQueryBuilder("roomMember")
            .delete()
            .where("roomMember.roomId = :roomId", { roomId: payload.roomId })
            .andWhere("roomMember.userId = :userId", { userId: req.user.id })
            .execute();

        await conn.transaction(async queryRunnerManager => {
            let log = new ChatLog();
            log.message = `${req.user.nickname}님이 떠나셨습니다.`;
            log.userId = req.user.id
            log.roomId = payload.roomId;
            log.nickname = req.user.nickname;
            return await queryRunnerManager.save(log);
        });

        server.to(`${payload.roomId}`).emit("exitedChatRoom", {
            userId: req.user.id,
            nickname: req.user.nickname,
            message: `${req.user.nickname}님이 떠나셨습니다.`,
        });
        client.leave(`${payload.roomId}`);

        return { message: "ok" };
    }

    // complete
    async getAllChatRoomList(client: Socket, req: any): Promise<any> {
        const conn = getConnection("waydn");
        Room.useConnection(conn);

        const findAllRoom = await Room.createQueryBuilder("room")
            .select(["room.id", "room.roomName"])
            .leftJoin("room.roomMember", "roomMember")
            .where("roomMember.hostId = :id", { id: req.user.id })
            .getMany();
        // console.log('hi! 2', findAllRoom);
        client.emit("sendToClientRoomList", findAllRoom);
        // console.log('hi! 3');
        return { message: "ok" };
    }

    // complete
    async getChatLog(client: Socket, payload: any, req: any, server: any): Promise<any> {
        const conn = getConnection("waydn");
        ChatLog.useConnection(conn);

        const log = await ChatLog.createQueryBuilder("chatLog") // ChatLog => 별명으로 chatLog
            .select(["chatLog.id", "chatLog.userId", "chatLog.nickname", "chatLog.message", "chatLog.roomId"])
            .where("chatLog.roomId = :roomId", { roomId: payload.roomId })
            .orderBy("chatLog.createdAt", "DESC")
            // .limit(10)
            .getMany();
        server.emit("getChatLogList", log);
        return { message: "ok" };
    }

    // complete
    async sendToServerMessage(client: Socket, payload: SendToServerMessageDto, req: any, server: Server): Promise<any> {
        const conn = getConnection("waydn");
        ChatLog.useConnection(conn);
        Room.useConnection(conn);

        const rn = await Room.createQueryBuilder("room")
            .where("room.id = :roomId", { roomId: payload.roomId })
            .getOne();

        if (!rn) {
            throw new WsException("방을 찾을 수 없습니다.");
        }
        await conn.transaction(async queryRunnerManager => {
            let log = new ChatLog();
            log.message = payload.message;
            log.userId = req.user.id
            log.roomId = payload.roomId;
            log.nickname = req.user.nickname;
            return await queryRunnerManager.save(log);
        });

        // console.log("send Message");
        server.to(`${payload.roomId}`).emit("sendToClientMessage", {
            userId: req.user.id, // userId 로 구분해서 소켓에 전송하면 데이터를 받아 이방 데이터가 맞는지 확인하기
            nickname: req.user.nickname,
            message: payload.message,
            roomId: payload.roomId
        });

        // console.log("message room", client.id);

        return { message: "ok" };
    }

    // http


}
