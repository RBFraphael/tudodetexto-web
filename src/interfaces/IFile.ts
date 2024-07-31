import { IDirectory } from "./IDirectory";

export interface IFile {
    id?: string;
    path: string;
    client_name: string;
    name: string;
    size: number;
    mimetype: string;
    url: string;
    directories?: IDirectory[];
}