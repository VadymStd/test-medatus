import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_LOGIN_SECRET_KEY}`,
    });
  }

  public async validate(payload: any, done: Function) {
    const user = await this.usersService.getUserById(payload.id);
    return user ? done(null, user) : done(new UnauthorizedException(), false);
  }
}
