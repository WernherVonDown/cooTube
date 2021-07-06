import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        JwtModule.register({
            secret: 'jwtSecret',
            signOptions: { expiresIn: '1d' }
        })
    ],
    controllers: [],
    providers: [jwtService]
})

export class JwtModule { }
