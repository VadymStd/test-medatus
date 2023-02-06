import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user';
import { GOES_WRONG, SAME_PASSWORD } from '../../constants/error-messages';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}

  public async getUserByUsername(username: string): Promise<User> {
    return this.usersRepository.getUser({ username });
  }

  public getUserById(id: string): Promise<User> {
    return this.usersRepository.getUser({ id });
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    try {
      const user = await this.getUserByUsername(email);
      if (user) {
        throw new BadRequestException(GOES_WRONG);
      }

      const userPassword = await bcrypt.hash(password, 10);
      const username = email.toLowerCase();

      return this.usersRepository.createUser({
        id: uuidv4(),
        username,
        password: userPassword,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async changePassword(
    user: User,
    changePasswordDto: ChangePasswordDto,
  ) {
    const { oldPassword, newPassword } = changePasswordDto;

    if (oldPassword === newPassword) {
      throw new BadRequestException(SAME_PASSWORD);
    }

    const comparePassword = await bcrypt.compare(oldPassword, user.password);
    if (!comparePassword) {
      throw new BadRequestException(GOES_WRONG);
    }
    const password = await bcrypt.hash(newPassword, 10);

    return this.usersRepository.updateUser({ id: user.id }, { password });
  }
}
