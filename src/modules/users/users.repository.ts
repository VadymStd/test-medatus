import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './schemas/user';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  public async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  public async getUser(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }

  public async updateUser(
    userFilterQuery: FilterQuery<User>,
    user: Partial<User>,
  ): Promise<void> {
    await this.userModel.findOneAndUpdate(userFilterQuery, user);
  }
}
