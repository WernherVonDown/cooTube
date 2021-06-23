import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { LoginController } from './login.controller';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { RoomsService } from '../rooms/rooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '../users/schemas/user.schema';
import { RoomsModule } from '../rooms/rooms.module';
import { Room, RoomSchema } from '../rooms/schemas/room.schema';

@Module({
    imports: [
        JwtModule.register({
            secret: 'jwtSecret',
            signOptions: { expiresIn: '1d' }
        }),
        MongooseModule.forFeature(
            [{ name: User.name, schema: UserSchema }, { name: Room.name, schema: RoomSchema }],
        ),
        UsersModule,
        RoomsModule
    ],
    controllers: [LoginController],
    providers: [AuthService, UsersService, RoomsService]
})

export class LoginModule { }
