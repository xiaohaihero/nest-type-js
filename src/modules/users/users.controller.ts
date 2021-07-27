import { Body, Controller, Delete, Get, Post, Query, Request, UseGuards, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { user } from './user.interface';
import { UsersService } from './users.service'
let faker = require('faker');

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
      let _user = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        passWord: '123456',
        phone: faker.phone.phoneNumber(),
        account: faker.name.findName()
      }
      let result = await this.usersService.create(_user as unknown as user);
      let _result = result.map(item => { 
        let _item = item.toJSON(); 
        delete _item.passWord; 
        return _item
      });
      return _result;
    }

    @Get('/list')
    @UseGuards(AuthGuard('jwt'))
    async list(@Query() query){
      let {page, rows, orders, fields, ...params} = query
      if(fields){
        fields = JSON.parse(fields);
      }
      if(orders){
        orders = JSON.parse(orders);
      }
      let result = await this.usersService.list(params, page, rows, orders, fields);
      return result
    }

    @Get('/findOne')
    @UseGuards(AuthGuard('jwt'))
    async findOne(@Query() query){
      let result = await this.usersService.findOne(query);
      return result
    }

    @Put('/update')
    @UseGuards(AuthGuard('jwt'))
    async update(@Body() body){
      let { _id, ...params } = body;
      return null
    }

    @Delete('/deleteOne')
    @UseGuards(AuthGuard('jwt'))
    async deleteOne(@Body() body:user){
      return await this.usersService.deleteOne(body._id);
    }
}
function page(page: any, number: any) {
  throw new Error('Function not implemented.');
}

