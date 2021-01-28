import { HttpException, HttpStatus } from '@nestjs/common';
import { updateUserDto, user } from '../dto';
import { checkStrongPw } from './checkPassword';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

const SALT = process.env.SALT || 10;

export const handlePassword = async (
  body: updateUserDto,
  user: user,
): Promise<any> => {
  // update info method: password, birthday, interest,....
  try {
    //handle data
    // check update password -> exist currentPassword in body
    if (!body.currentPassword)
      throw new HttpException('input current password', HttpStatus.BAD_REQUEST);
    if (!body.rePassword)
      throw new HttpException('input re-password !', HttpStatus.BAD_REQUEST);

    const { error } = checkStrongPw(body.password);
    if (error) throw new HttpException(error, HttpStatus.BAD_REQUEST);

    const isPwCorrect = await compareSync(body.currentPassword, user.password);
    if (!isPwCorrect)
      throw new HttpException(
        'Current Password is incorrect !',
        HttpStatus.BAD_REQUEST,
      );

    const isMatch = body.password || body.password === body.rePassword;

    if (!isMatch)
      throw new HttpException(
        'Password is not matched !',
        HttpStatus.BAD_REQUEST,
      );

    const hash = await hashSync(body.password, SALT);

    return hash;
  } catch (e) {
    console.log(e.message);

    throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
  }
};
