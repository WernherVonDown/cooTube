import { forwardRef, Module } from "@nestjs/common";
import { RoomController } from "./rooms.controller";
import { RoomsService } from './rooms.service'
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema, Room } from './schemas/room.schema';
//import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { AppGateway } from '../app.gateway';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from "../auth/auth.module";
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: Room.name, schema: RoomSchema }, { name: User.name, schema: UserSchema },]
        ),
        forwardRef(() => AuthModule),
        UsersModule
    ],
    controllers: [RoomController],
    providers: [RoomsService, AppGateway, AuthService, UsersService],
    exports: [RoomsService],
})

export class RoomsModule { }
