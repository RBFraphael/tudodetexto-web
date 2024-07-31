import { IDirectory } from "@/interfaces/IDirectory";
import { Api } from "@/lib/Client";

export const postUploadFile = (file: File, directory?: IDirectory) => {
    let formData = new FormData();
    formData.set("file", file);
    if (directory) {
        formData.set("directory_id", directory.id!);
    }

    return Api.post(`/admin/files`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};