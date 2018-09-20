export class Meeting {
    project_id: number;
    date: Date;
    time:string
    subject: string;
    project_bilan1: string;
    project_bilan2: string;
    adentis_bilan1: string;
    adentis_bilan2: string;
    adentis_bilan3: string;
    manager_signature: string;
    consultant_signature: string;
    client_signature: string;
    id?: number;
    updatedAt?: Date;
    createdAt?: Date;
    lastUpdatedBy?: string;
}