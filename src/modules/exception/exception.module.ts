import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ExceptionService } from './exception.service'
import { ExceptionController } from './exception.controller'

@Module({
    providers:[ ExceptionService ],
    controllers:[ ExceptionController ]
})

export class ExceptionModule{}