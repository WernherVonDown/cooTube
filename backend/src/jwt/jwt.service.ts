import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService {
    constructor(
        private jwtService: JwtService
    ) {}

    async signAsync (data: any): Promise<string> {
        return this.jwtService.signAsync(data)
    }

    verify (data: string): any {
        return this.jwtService.verify(data)
    }
}