import { Controller, Post, Param, Body, Get, Put, Request, Res, Req } from "@nestjs/common";
import { LoginDto } from '../users/dto/login.dto';
import { LoginService } from "./login.service";
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import {Response} from 'express'

@Controller('login')
export class LoginController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService
        ) {
    }

    @Post()
    async login(
        @Res({ passthrough: true }) response: Response,
        @Body() loginDto: LoginDto): Promise <any>   {
            console.log('LOGIN', loginDto)
        const result = await this.authService.validateUser(loginDto);
        console.log('RESSSULET', result)
        if (result) {
            const jwt = await this.jwtService.signAsync({
                id: result.id
            })
            response.cookie('jwt', jwt, {httpOnly: true})
            const { userName } = result;
            console.log('EEEE', userName)
            return {
                success: true,
                user: {
                    userName
                }
            };
        }
        return {
            success: false
        };
    }
}
