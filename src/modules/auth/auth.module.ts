import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants'
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [
    UsersModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    })
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
