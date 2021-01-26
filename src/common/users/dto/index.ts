export class user {
  email: string;
  password: string;
  birthday: Date;
  isActive: boolean;
  interest: [string];
  _id: string;

  constructor(doc?: any) {
    this._id = doc._id;
    this.email = doc.email;
    this.password = doc.password;
    this.interest = doc.interest;
    this.isActive = doc.isActive;
    this.birthday = doc.birthday;
  }
}

export interface viewUserDto {
  email: string;
  birthday: Date;
  isActive: boolean;
  interest: [string];
  _id: string;
}

export interface createUserDto {
  email: string;
  password: string;
  rePassword: string;
  birthday: Date;
  _id?: string;
}

export interface updateUserDto {
  email?: string;
  password?: string;
  rePassword?: string;
  birthday?: Date;
  isActive?: boolean;
  _id?: string;
}
