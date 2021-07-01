import { ExceptionService } from './exception.service'
import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { HelloService } from '../hello/hello.service'

@Controller('exception')
export class ExceptionController {
    constructor(private readonly exceptionService:ExceptionService, private readonly helloService: HelloService){}

    @Get('/list')
    list(@Query('id', new ParseIntPipe()) id){
        console.info(typeof id);
        // let id:number | undefined = params.id;
        if(id==null){
            return this.exceptionService.list();
        }
        
        return this.exceptionService.list(id)
    }

    @Post('/create')
    create(@Body() data){
        let name:string = data.name;
        let age:number = data.age;
        return this.exceptionService.create(name, age);
    }

    @Put('/update')
    update(@Body() data){
        let id:number = data.id;
        let name:string | undefined = data.name;
        let age:number | undefined = data.age;
        return this.exceptionService.update(id, name, age);
    }

    @Delete('/delete')
    delete(@Query('id') id){
        return this.exceptionService.delete(id);
    }

    @Get('hello/list')
    helloList(@Query() params){
        return this.helloService.list();
    }
}
