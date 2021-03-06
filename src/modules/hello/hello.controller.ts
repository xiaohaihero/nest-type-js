import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Query, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { HelloService } from './hello.service'

@Controller('hello')
export class HelloController {
    constructor(private readonly helloService:HelloService){}
    
    @Get('/list')
    list(@Query() params){
        let id:number | undefined = params.id;
        //throw new HttpException({status: HttpStatus.BAD_REQUEST, message: 'http错误', error: 'http请求错误'}, HttpStatus.BAD_REQUEST);
        throw new Error('bad request');
        if(id==null){
            return this.helloService.list();
        }
        
        return this.helloService.list(id)
    }

    @Post('/create')
    create(@Body() data){
        let name:string = data.name;
        let age:number = data.age;
        return this.helloService.create(name, age);
    }

    @Put('/update')
    update(@Body() data){
        let id:number = data.id;
        let name:string | undefined = data.name;
        let age:number | undefined = data.age;
        return this.helloService.update(id, name, age);
    }

    @Delete('/delete')
    delete(@Query('id') id){
        return this.helloService.delete(id);
    }
}
