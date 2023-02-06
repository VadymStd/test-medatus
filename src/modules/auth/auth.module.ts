import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersModule } from '../users/users.module';
import { AuthenticatedGuard } from './guards/auth.guard';
import { SessionSerializer } from './guards/session.serializer';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalAuthGuard,
    LocalStrategy,
    AuthenticatedGuard,
    SessionSerializer,
    JwtStrategy,
  ],
  imports: [PassportModule, JwtModule.register({}), UsersModule],
  exports: [AuthService],
})
export class AuthModule {}
