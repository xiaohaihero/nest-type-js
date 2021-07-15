import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('/sign/in')
    public async signIn(@Request() req){
        console.info(req.user);
        let token = await this.authService.login(req.user);
        return token;
    }

    @UseGuards(AuthGuard())
    @Post('/getTokenInfo')
    public getTokenInfo(@Request() request){
        return request.user
    }
}
