export class Consultant {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public tel: string,
    public manager_id: number,
    public _id?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string,
  ) { }
}