import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto } from '../users/dto/login.dto';
import { UserDocument, User } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
    // constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    // async validateUser(loginDto: LoginDto): Promise<any> {
    //     const { email, password } = loginDto;
    //     const user = await this.userModel.findOne({
    //         email,
    //         password: await bcrypt.hash(password, 7)
    //     })

    //     return user
    // }
}