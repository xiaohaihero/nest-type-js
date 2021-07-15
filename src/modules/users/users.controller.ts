import { Controller, Post, Request, UseGuards } from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../auth/local-auth.guard' 

@Controller('users')
export class UsersController {
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
      return req.user;
    }
}
