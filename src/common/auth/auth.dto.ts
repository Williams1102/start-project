export class authDto {
  public email: string;
  public _id: string;
  public isActive: boolean;
  constructor(doc?: any) {
    this.email = doc.email;
    this._id = doc._id;
    this.isActive = doc.isActive;
  }
}
