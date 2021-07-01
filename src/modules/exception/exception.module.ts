import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ExceptionService } from './exception.service'
import { ExceptionController } from './exception.controller'
import { HelloModule } from '../hello/hello.module'

@Module({
    imports: [HelloModule],
    providers:[ ExceptionService ],
    controllers:[ ExceptionController ]
})

export class ExceptionModule{
}