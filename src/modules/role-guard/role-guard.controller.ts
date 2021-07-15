import { Body, Controller, Post, UseGuards, Get, Query } from '@nestjs/common';
import { RoleGuardsService } from './role-guard.service'
import { RoleGuardGuard } from '../../common/guards/role-guard.guard'
import { Roles } from 'src/common/decorator/roles.decorator';
import { RoleEnum } from '../../lib/role.enum'
import { AuthGuard } from '@nestjs/passport';

@Controller('role-guards')
export class RoleGuardsController {
    constructor(private readonly roleGuardsService: RoleGuardsService){}

    @Post('/create')
    @UseGuards(RoleGuardGuard)
    create(@Body() body){
        let name : string | undefined = body.name;
        let age : number | undefined = body.age;
        return this.roleGuardsService.create(name, age);
    }

    @Get('/list')
    @UseGuards(AuthGuard('jwt'), RoleGuardGuard)
    @Roles({roles: 'auth', module: 'user', action: 'view'})
    list(@Query('id') id){
        return this.roleGuardsService.list(id);
    }
}
