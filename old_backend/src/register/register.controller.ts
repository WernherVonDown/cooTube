import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from '../auth/auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('register')
export class RegisterController {
    constructor(private authService: AuthService) {}

    @Post()
    async register(@Body() registerData: RegisterDto): Promise<any> {
        return await this.authService.registerUser(registerData)
    }
}