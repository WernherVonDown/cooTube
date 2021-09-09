import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module'
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from './app.gateway';
//import { AuthModule } from './auth/auth.module';
//import { LoginModule } from './login/login.module';
//import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { RoomsService } from './rooms/rooms.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    RoomsModule,
    MongooseModule.forRoot(`mongodb://admin:password@mongo:27017/admin`),
    //MongooseModule.forRoot(`mongodb://admin:password@mongo:27017/admin`),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
