import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
