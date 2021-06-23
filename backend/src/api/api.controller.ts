import { Controller, Post, Param, Body, Get, Put, Request, Res, Req } from "@nestjs/common";
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import {Response} from 'express'

@Controller('api')
export class ApiController {
    constructor(
        private authService: AuthService,
        // private jwtService: JwtService
        ) {
    }

    @Get('me')
    async getMe() {
        return "GET ME";
    }
}
