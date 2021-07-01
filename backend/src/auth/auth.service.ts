import { Injectable } from '@nestjs/common';
import { RoomsService } from 'src/rooms/rooms.service';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from '../users/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/register/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private roomsService: RoomsService,
    private usersService: UsersService,
   // private jwtService: JwtService
  ) {
  }

  async handleDisconnect(socketId: string): Promise<any> {
    const res = await this.roomsService.removeUserBySocketId(socketId);
    return res;
  }

  async validateUserInRoom({ roomId, userName, password, socketId }): Promise<any> {
    const isPasswordValid = await this.roomsService.validatePassword(roomId, password);
    console.log('IS USER VALID', isPasswordValid, { roomId, userName, password, socketId })
    if (isPasswordValid) {
      const users = await this.roomsService.addUserToRoom(userName, socketId, roomId);
      // if (users.find(u => u.userName === userName)) userName += `1`;
      return { success: true, users, userName, socketId }
    } else {
      return { success: false };
    }
  }

  async validateUserId(id: string): Promise<any> {
    const user = await this.usersService.findOneById(id);
    return user;
  }

  async validateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findOne(loginDto.email);
    console.log('vlalidateUser', user)
    if (user) {
      const { password, userName, _id, email } = user;
      if (await bcrypt.compare(loginDto.password, password)) {
        return {userName, _id, email};
      }
    }
    return null;
  }

  async registerUser(registerData: RegisterDto): Promise<any> {
    return this.usersService.create(registerData);
  }

  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
//}

}
