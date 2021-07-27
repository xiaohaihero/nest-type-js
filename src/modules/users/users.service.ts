import { Injectable } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { user } from './user.interface';
import { AuthService } from '../auth/auth.service'
let md5 = require('../../utils/md5');

import EntityModelService from '../../services/entity.model.services'


@Injectable()
export class UsersService extends EntityModelService<user>{

  constructor(
    @InjectModel('User') private userModel: Model<user>,
    private readonly authService: AuthService
  ) {
    super();
  }

  async login(account: String, passWord: String) {
    let user = await this.getEntityModel().findOne({ "account": account });
    if (!user) {
      return false
    }
    let md5Pwd = md5(passWord);
    if (user.passWord != md5Pwd) {
      return false
    }
    return {
      access_token: this.authService.getToken(user),
    };
  }

  getEntityModel(): Model<user>{
    return this.userModel;
  }
}
