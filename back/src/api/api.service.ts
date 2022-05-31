import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RoomHashTag } from 'src/models/Neutrality/RoomHashTag.entity';
import { RoomMember } from 'src/models/Neutrality/RoomMember.entity';
import { Room } from 'src/models/Room.entity';
import { User } from 'src/models/User.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class ApiService {
    constructor() {

    }
    async info(roomId: number): Promise<any> {
        const conn = getConnection("waydn");
        Room.useConnection(conn);
        RoomMember.useConnection(conn);
        RoomHashTag.useConnection(conn);
        User.useConnection(conn);

        // 해쉬태그
        const findRoomHashTag = await RoomHashTag.createQueryBuilder("roomHashTag")
            .select(["roomHashTag.roomId", "hashTag.hashTag", "room.roomName"])
            .leftJoin("roomHashTag.hashTag", "hashTag")
            .leftJoin("roomHashTag.room", "room")
            .where("roomHashTag.roomId = :roomId", { roomId })
            .getMany();

        // 구성원
        const roomPersonel = await User.createQueryBuilder("user")
            .select(["user.id", "user.email", "user.nickname"])
            .leftJoin("user.roomMember", "roomMember")
            .where("roomMember.roomId = :roomId", { roomId })
            .getMany();

        const info = {
            "roomId": roomId,
            "roomName": findRoomHashTag[0].room.roomName,
            "hashTag": findRoomHashTag.map(res => {
                return res.hashTag.hashTag;
            }),
            "roomPersonel": roomPersonel,
        };
        console.log("roomHashTag", info);
        return info;
    }

    async roomList(req: any) {
        const conn = getConnection("waydn");
        Room.useConnection(conn);
        RoomMember.useConnection(conn);
        if (req.user) {
            const list = await Room.createQueryBuilder("room")
                .select(["room.id", "room.roomName", "room.personel", "roomMember.hostId"])
                .innerJoin("room.roomMember", "roomMember")
                .where("roomMember.hostId = :hostId", { hostId: req.user?.id })
                .getMany();
            console.log(list);
            return list;
        }

        return { message: "failed" };
    }
}
