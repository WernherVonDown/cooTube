import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schemas/user.schema';
import { UsersService } from './users.service';
@Module({
    imports: [
        MongooseModule.forFeature(
            [{name: User.name, schema: UserSchema}]
        ),
    ],
    controllers: [],
    providers: [UsersService],
    exports: [UsersService],
})

export class UsersModule {}