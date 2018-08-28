export class Meeting {
  constructor(
    public _id: number,
    public project_id: number,
    public date: Date,
    public subject: string,
    public project_bilan1: string,
    public project_bilan2: string,
    public adentis_bilan1: string,
    public adentis_bilan2: string,
    public adentis_bilan3: string,
    public manager_signature: Blob,
    public consultant_signature: Blob,
    public client_signature: Blob,
    public updatedAt: Date,
    public createdAt: Date,
    public lastUpdatedBy: string,
  ) { }
}