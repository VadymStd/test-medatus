import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':user_id')
  public async getUser(
    @Request() req,
    @Param('username') username: string,
    @Response() res,
  ) {
    const user = await this.usersService.getUserByUsername(username);

    return res
      .status(HttpStatus.OK)
      .json({ requestObject: req.body, message: user });
  }

  @UseGuards(AuthenticatedGuard)
  @Put('change_password')
  public async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto,
    @Response() res,
  ) {
    await this.usersService.changePassword(req.user, changePasswordDto);

    return res
      .status(HttpStatus.OK)
      .json({ requestObject: req.body, message: 'Password has been changed' });
  }
}
