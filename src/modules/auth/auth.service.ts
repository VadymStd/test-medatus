import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AUTH_TOKEN_ALIVE_PERIOD } from '../../constants/auth';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!user || !comparePassword) {
      return null;
    }
    return user;
  }

  private createToken(payload, secret, expiresIn) {
    return this.jwtService.sign(payload, { secret, expiresIn });
  }

  public createAuthToken(payload) {
    return this.createToken(
      payload,
      process.env.JWT_LOGIN_SECRET_KEY,
      AUTH_TOKEN_ALIVE_PERIOD,
    );
  }
}
