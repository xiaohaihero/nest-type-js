import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { HelloModule } from './modules/hello/hello.module'
import { ExceptionModule } from './modules/exception/exception.module'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { RoleGuardsModule } from './modules/role-guard/role-guard.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose'


@Module({
  imports:[
    HelloModule, 
    ExceptionModule, 
    RoleGuardsModule, 
    AuthModule, 
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/nest',{ 'useCreateIndex': true })
  ]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(LoggerMiddleware)
    //.forRoutes('/')
    //.forRoutes({ path:'exception', method: RequestMethod.POST})
    .exclude(
      { path: 'cats', method: RequestMethod.GET },
      'cats/(.*)',
    )
  }
}


