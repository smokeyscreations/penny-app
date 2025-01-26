export interface Project {
    _id?: string;
    projectName: string;
    projectType: string;
    description?: string;
    dateCreated: Date;
    images: string[];

}