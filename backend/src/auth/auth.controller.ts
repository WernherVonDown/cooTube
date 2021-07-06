import { Controller, Post, Param, Body, Get, Put, Res, Req } from "@nestjs/common";
import { LoginDto } from '../users/dto/login.dto';
//import { LoginService } from "./login.service";
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService
    ) {
    }

    @Post('register')
    async register(@Body() registerData: RegisterDto): Promise<any> {
        return await this.authService.registerUser(registerData)
    }

    @Post('login')
    async login(
        @Res({ passthrough: true }) response: Response,
        @Body() loginDto: LoginDto,
        @Req() request: Request
    ): Promise<any> {

        console.log('LOGIN', loginDto, request.cookies)
        let result;
        if (request.cookies.jwt) {
            const data = this.jwtService.verify(request.cookies.jwt);
            console.log('JWT DATA', data)
            const { _id } = data;
            if (_id) {
                result = await this.authService.validateUserId(_id);
            }
        } else {
            result = await this.authService.validateUser(loginDto);
        }
        console.log("RESULT LOGIN",result)
        if (result) {
            const { userName,  _id, email } = result;
            const jwt = await this.jwtService.signAsync({
                _id,
                userName,
                email
            })
            response.cookie('jwt', jwt)
            
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
