import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto } from './dto/login.dto';
import { UserDocument, User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from '../auth/dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findOneById(id: string): Promise<any> {
        const user = await this.userModel.findOne({
            _id: id
        })

        return user
    }

    async findOne(email: string): Promise<any> {
        const user = await this.userModel.findOne({
            email
        })

        return user
    }

    async create(user: RegisterDto): Promise<any> {
        const {password, ...restData} = user;
        const hashedPassword = await bcrypt.hash(password, 7);
        const isExist = await this.findOne(restData.email);
        if (!isExist) {
            await this.userModel.create({password: hashedPassword,...restData});
            return {success: true}
        } else {
            return {success: false, msg: 'This email is already regestered!'}
        }
        
    }
}