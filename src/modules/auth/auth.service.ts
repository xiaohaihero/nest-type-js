import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { user } from '../users/user.interface'

@Injectable()
export class AuthService {
    constructor(
       private readonly jwtService:JwtService
    ) {}

    getToken(userInfo: user){
        let payload = { username: userInfo.name, sub: userInfo._id }
        return this.jwtService.sign(payload);
    }
}
