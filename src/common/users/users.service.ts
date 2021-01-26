import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDoc } from './schema';
import { createUserDto, updateUserDto, user, viewUserDto } from './dto';
import { MailService } from '../../shared/mailer/mailer.service';
import { mailDto } from '../../shared/mailer/mail.dto';

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

      return null;
    }
  }

  async findOneUser(id?: string, email?: string): Promise<any> {
    try {
      const findData: updateUserDto = {};
      if (id) findData._id = id;
      if (email) findData.email = email;

      const info = await this.userModel.findOne(findData);

      return info ? new user(info) : { error: 'email is not exist!' };
    } catch (e) {
      console.log(e.message);
      return { error: e.message };
    }
  }

  async addUser(body: createUserDto): Promise<any> {
    try {
      const isEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!isEmail.test(body.email))
        return { message: 'You must input email !' };
      if (body.rePassword !== body.password)
        return { message: 'Password is not match' };
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
      return { error: 'error !' };
    }
  }

  async activeAccount(id: string): Promise<any> {
    try {
      const data = { isActive: true };
      const result = await this.updateInfoUser(id, data);
      return result;
    } catch (e) {
      console.log(e.message);
      return { error: 'error !' };
    }
  }

  async updateInfoUser(id: string, body: updateUserDto): Promise<any> {
    try {
      if (body.password) {
        return body.password === body.rePassword
          ? this.userModel.findOneAndUpdate({ _id: id }, body, { new: true })
          : { message: 'Password is not matched !' };
      }
      const updated = await this.userModel.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });
      return updated;
    } catch (e) {
      return { error: e.message };
    }
  }

  async deleteUser(id: string): Promise<any> {
    try {
      const bin = await this.userModel.findOneAndDelete({ _id: id });
      return bin;
    } catch (e) {
      return { error: e.message };
    }
  }
}
