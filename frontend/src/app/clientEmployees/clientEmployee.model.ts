export class ClientEmployee {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public tel: string,
    public title: string,
    public client_id: number,
    public _id?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string,
  ) { }
}