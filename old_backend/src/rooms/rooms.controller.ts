import { Controller, Post, Param, Body, Get, Put } from "@nestjs/common";
import { CreateRoomDto } from './dto/create-room.dto'
import { RoomsService } from "./rooms.service";

@Controller('rooms')
export class RoomController {
    constructor(private roomsService: RoomsService){
    }
    @Get()
    getAllRooms(): any {
        return this.roomsService.getAll()
    }

    @Get(':id')
    getRoom(@Param('id') id: string): any {
        return this.roomsService.getById(id)
    }

    @Post()
    create(@Body() createRoomDto: CreateRoomDto): any {
        return this.roomsService.create(createRoomDto)
    }

}
