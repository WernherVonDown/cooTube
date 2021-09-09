import { forwardRef, Module } from "@nestjs/common";

import { RoomsService } from '../rooms/rooms.service';
import { AppGateway } from '../app.gateway';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { RoomsModule } from '../rooms/rooms.module';
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from './auth.controller';

@Module({
    imports: [
        JwtModule.register({
            secret: 'jwtSecret',
            signOptions: { expiresIn: '1d' }
        }),
        UsersModule, RoomsModule],
    controllers: [AuthController],
    providers: [AuthService, AppGateway]
})

export class AuthModule {}
