export class Meeting {
    project_id: number;
    date: Date;
    subject: string;
    project_bilan1: string;
    project_bilan2: string;
    adentis_bilan1: string;
    adentis_bilan2: string;
    adentis_bilan3: string;
    manager_signature: Blob;
    consultant_signature: Blob;
    client_signature: Blob;
    id?: number;
    updatedAt?: Date;
    createdAt?: Date;
    lastUpdatedBy?: string;
}