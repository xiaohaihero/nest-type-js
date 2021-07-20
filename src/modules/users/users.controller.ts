import { Body, Controller, Delete, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { user } from './user.interface';
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {

    constructor(private readonly usersService:UsersService){}

    @Post('/login')
    async login(@Body() body) {
      return this.usersService.login(body.account, body.passWord);
    }

    @Post('/create')
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() user:user){
      let result = await this.usersService.create(user);
      console.info(result);
      return result;
    }

    @Get('/list')
    @UseGuards(AuthGuard('jwt'))
    async list(@Query() query){
      let result = await this.usersService.list(query);
      return result
    }

    @Get('/findOne')
    @UseGuards(AuthGuard('jwt'))
    async findOne(@Query() query){
      console.info(query);
      let result = await this.usersService.findOne(query.name);
      return result
    }

    @Delete('/deleteOne')
    @UseGuards(AuthGuard('jwt'))
    async deleteOne(@Body() body:user){
      return await this.usersService.deleteOne(body);
    }
}
