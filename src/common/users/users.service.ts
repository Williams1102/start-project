import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDoc } from './schema';
import { createUserDto, updateUserDto, user, viewUserDto } from './dto';
import { MailService } from '../../shared/mailer/mailer.service';
import { mailDto } from '../../shared/mailer/mail.dto';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { checkStrongPw } from './services/checkPassword';
import { handlePassword } from './services/handlePassword';

const SALT = parseInt(process.env.SALT);
const isEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UsersDoc>,
    private mail: MailService,
  ) {}

  async findAll(): Promise<any> {
    try {
      const data = await this.userModel.find();
      const xx = data.map((o) => {
        const { password, ...other } = new user(o);
        return other;
      });
      return xx;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneUser(id?: string, email?: string): Promise<any> {
    try {
      const findData: updateUserDto = {};
      if (id) findData._id = id;
      if (email) findData.email = email;

      const info = await this.userModel.findOne(findData).lean();
      if (!info) throw { message: 'email is not exist !!!' };
      return info;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async addUser(body: createUserDto): Promise<any> {
    try {
      if (!isEmail.test(body.email))
        throw { message: 'You must input email !' };

      const { error } = checkStrongPw(body.password);
      if (error) throw { message: error };

      if (body.rePassword !== body.password)
        throw { message: 'Password is not match' };

      const hash = await hashSync(body.password, SALT);
      body.password = hash;
      // console.log(body);

      const create = await this.userModel.create(body);
      const linkActive: mailDto = {
        toEmail: body.email,
        subject: 'Active Your Account',
        content: `http://localhost:3000/users/active/${create._id}?access=true`,
      };
      await this.mail.sendMail(linkActive);
      return create;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async activeAccount(id: string): Promise<any> {
    try {
      const data = { isActive: true };
      const result = await this.updateInfoUser(id, data);
      return result;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateInfoUser(id: string, body: updateUserDto): Promise<any> {
    // update info method: password, birthday, interest,....
    try {
      if (body.email) throw { message: 'email is not change !!!' };
      // before: find user update
      const userCurrent = await this.userModel.findOne({ _id: id });
      const userObj = userCurrent.toObject();

      //handle: password data
      if (body.password) {
        body.password = await handlePassword(body, new user(userObj));
      }

      // after: updating in db
      await userCurrent.updateOne(body, { new: true }).lean();

      delete body.password;

      return new user(body);
    } catch (e) {
      console.log(e.message);

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string): Promise<any> {
    try {
      const bin = await this.userModel.findOneAndDelete({ _id: id });
      return bin;
    } catch (e) {
      console.log(e.message);

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
