import { IDirectory } from "./IDirectory";
import { IUser } from "./IUser";

export interface IVipArea {
    id?: string;
    name: string;
    directory_id: string;
    users?: IUser[];
    directory?: IDirectory;
}