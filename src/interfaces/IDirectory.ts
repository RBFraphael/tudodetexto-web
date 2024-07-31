import { IFile } from "./IFile";
import { IVipArea } from "./IVipArea";

export interface IDirectory {
    id?: string;
    parent_directory_id?: string;
    name: string;
    path: string;
    parent?: IDirectory;
    children?: IDirectory[];
    files?: IFile[];
    vipArea?: IVipArea;
}