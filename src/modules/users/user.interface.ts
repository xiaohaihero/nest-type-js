import ModelEntity from '../../entity/ModelEntity'

export interface user extends ModelEntity {
    name: String;
    account: String;
    passWord: String;
    phone: String;
    email:String;
    lockTime: Number;
    errNum: Number;
    roleId: [Number];
  }