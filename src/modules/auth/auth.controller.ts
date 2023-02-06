import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Request() req,
    @Response() res,
    @Body() loginDto: LoginDto,
  ) {
    try {
      const token = this.authService.createAuthToken({ id: req.user.id });
      return res
        .status(HttpStatus.OK)
        .json({ requestObject: req.body, message: token });
    } catch (error) {
      return res
        .status(HttpStatus.CREATED)
        .json({ requestObject: req.body, message: error.message });
    }
  }

  @Post('/registration')
  public async registration(
    @Request() req,
    @Body() registrationDto: RegistrationDto,
    @Response() res,
  ) {
    try {
      await this.usersService.createUser(registrationDto);
      const user = await this.usersService.getUserByUsername(
        registrationDto.email,
      );
      const token = this.authService.createAuthToken({ id: user.id });

      return res
        .status(HttpStatus.CREATED)
        .json({ requestObject: req.body, message: token });
    } catch (error) {
      return res
        .status(HttpStatus.CREATED)
        .json({ requestObject: req.body, message: error.message });
    }
  }
}
