import mongoose, { Document, Model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds: number = 10;

export interface IUser {
  email: string;
  password: string;
  name: string;
  token: string;
}

export interface IUserMethod extends IUser, Document {
  setPassword: (password: string) => Promise<void>;
  generateToken: () => Promise<string>;
  serialize: () => Promise<JSON>;
  checkPassword: (password: string) => Promise<boolean>;
}

export interface IUserStatics extends Model<IUserMethod> {
  findByEmail: (email: string) => Promise<IUserMethod>;
}

const UserSchema: Schema<IUserMethod> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
      validate(value: string) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password can not contain a word password");
        }
      },
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

// 비밀번호 db에 암호화 하여 저장
UserSchema.methods.setPassword = async function (password: string) {
  const result = await bcrypt.hash(password, saltRounds);
  this.password = result;
};

// 입력받은 비번이 db에 있는 비번이랑 같은지 확인
UserSchema.methods.checkPassword = async function (password: string) {
  const result = await bcrypt.compare(password, this.password);
  return result; // 같으면 1 다르면 0 이 저장됨
};

// 이메일이 디비에 있는지 확인
UserSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email });
};

// 토큰 생성
UserSchema.methods.generateToken = async function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.JWT_SECRET
  );
  this.token = token;
  await this.save();
  return token;
};

// 응답할 데이터에서 password 필드 제거
UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.password;
  return data;
};

const User = mongoose.model<IUserMethod, IUserStatics>("User", UserSchema);
export default User;
