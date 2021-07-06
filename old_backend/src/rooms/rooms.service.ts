import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomDocument, Room } from './schemas/room.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RoomController } from './rooms.controller';

@Injectable()
export class RoomsService {
    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) { }

    async getAll(): Promise<Room[]> {
        const rooms = await this.roomModel.find({ isPublic: true });
        return rooms;
    }

    async removeUserBySocketId(socketId: string): Promise<any> {
        const res = await this.roomModel.findOne({
            users: {
                $elemMatch: {
                    socketId
                }
            }
        });

        if (res.roomId && res.users.length > 1) {
            await this.roomModel.updateOne(
                { roomId: res.roomId },
                {
                    $pull: { users: { socketId } }
                }
            )

            return {
                roomId: res.roomId,
                users: res.users.filter(u => u.socketId !== socketId)
            }
        }

        return false;
    }

    async addUserToRoom(userName: string, socketId: string, roomId: string): Promise<any[]> {
        await this.roomModel.updateOne(
            { roomId },
            {
                $push: { users: { socketId, userName } }
            }
        )

        const users = await this.getUsers(roomId);
        return users
    }

    async getUsers(roomId): Promise<any[]> {
        const room = await this.getById(roomId);
        return room.users;
    }

    async getById(roomId: string): Promise<Room> {
        const room = await this.roomModel.findOne({
            roomId
        })

        return room;
    }

    async validatePassword(roomId: string, password: string): Promise<boolean> {
        const roomExists = await this.getById(roomId);
        console.log('RROM', roomExists)
        if (roomExists) {
            if (!roomExists.hasPassword) return true;
            const hashedPassword = await bcrypt.hash(password, 7)
            console.log('ahahha', roomExists.password, hashedPassword)
            return roomExists.password === hashedPassword;
        }
        return false;
    }

    async create(createRoomDto: CreateRoomDto): Promise<Room | boolean> {
        const roomExists = await this.getById(createRoomDto.roomId);
        const users = [];
        if (roomExists) {
            return false;
        }
        const createdAt = Date.now();
        console.log('AAAAAAAA', createRoomDto.password)
        const hasPassword = !!createRoomDto.password;
        createRoomDto.password = hasPassword ? await bcrypt.hash(createRoomDto.password, 7) : '';

        const room = await this.roomModel.create({
            hasPassword,
            createdAt,
            users,
            ...createRoomDto
        });
        return room;
    }

    // async remove (id: string): Promise<Product> {
    //     return this.productsModel.findByIdAndRemove(id)
    // }

    //async update(id: string, productDto: ProductD)
}