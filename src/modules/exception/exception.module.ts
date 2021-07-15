import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ExceptionService } from './exception.service'
import { ExceptionController } from './exception.controller'
import { HelloModule } from '../hello/hello.module'
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        HelloModule, 
        PassportModule.register({defaultStrategy: 'jwt'})
    ],
    providers:[ ExceptionService ],
    controllers:[ ExceptionController ]
})

export class ExceptionModule{
}