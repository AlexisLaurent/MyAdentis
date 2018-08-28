export class Manager {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public tel: string,
    public _id?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string,
  ) { }
}