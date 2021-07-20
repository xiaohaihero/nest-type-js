import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
// export type UserDocument = User & Document;

// @Schema()
// export class User extends Document {
//     @Prop()
//     name: String

//     @Prop()
//     account: String

//     @Prop()
//     passWord: String

//     @Prop()
//     phone: String

//     @Prop()
//     email: String

//     @Prop()
//     lockTime: Number

//     @Prop()
//     errNum: Number

//     @Prop()
//     roleId: [Number]
// }

// @Schema()
// export class User extends Document {
//     @Prop({ required: true })
//     name: String

//     @Prop({ required: true, unique: true})
//     account: String

//     @Prop({ required: true })
//     passWord: String

//     @Prop({ required: true })
//     phone: String

//     @Prop({ required: true })
//     email: String

//     @Prop({ default: Date.now() })
//     lockTime: Number

//     @Prop({ default: 0 })
//     errNum: Number

//     @Prop({ default: [] })
//     roleId: [Number]
// }

// export const UserSchema = SchemaFactory.createForClass(User);

export const UserSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    Comment: '用户名'
  },
  account: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    Comment: '账号'
  },
  passWord: {
    type: Schema.Types.String,
    required: true,
    Comment: '密码'
  },
  phone: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    Comment: '手机'
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    Comment: '邮箱'
  },
  lockTime: {
    type: Schema.Types.Date,
    default: Date.now(),
    Comment: '锁定时间'
  },
  errNum: {
    type: Schema.Types.Number,
    default: 0,
    Comment: '密码试错次数'
  },
  roleId: {
    type: [Schema.Types.Number],
    default: [],
    Comment: '所属角色'
  }
}, {
  timestamps: true
});