import { Injectable } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { user } from './user.interface';
import { AuthService } from '../auth/auth.service'

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User') private userModel: Model<user>,
    private readonly authService: AuthService
  ) { }

  public getEntityModel(): Model<user> {
    return this.userModel;
  }

  async login(account: String, passWord: String) {
    let user = await this.userModel.findOne({ "account": account });
    if (!user) {
      return false
    }
    if (user.passWord != passWord) {
      return false
    }
    return {
      access_token: this.authService.getToken(user),
    };
  }

  async create(User: user) {
    let result = await this.userModel.create(User);
    return result
  }

  async findOne(username: string) {
    let query = {
      name: username
    } as FilterQuery<user>
    return await this.getEntityModel().findOne(query);
  }

  async list(params: Object): Promise<user[]> {
    return await this.userModel.find(params);
  }

  async deleteOne(user) {
    return this.userModel.deleteOne(user);
  }
}
