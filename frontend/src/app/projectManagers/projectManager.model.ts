export class ProjectManager {
  constructor(
    public _id: number,
    public project_id: number,
    public clientEmployee_id: number,
    public updatedAt: Date,
    public createdAt: Date,
    public lastUpdatedBy: string,
  ) { }
}