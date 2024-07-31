'use client';

import { IDirectory } from "@/interfaces/IDirectory";
import { IFile } from "@/interfaces/IFile";
import { getMimeIcon } from "@/lib/Icons";
import { fileName } from "@/lib/String";
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DirectoryBrowser({ root, onChangeDirectory }: { root?: IDirectory, onChangeDirectory: (dir: IDirectory) => void }) {
    const [directory, setDirectory] = useState<IDirectory | null>(null);

    useEffect(() => {
        if (root) {
            setDirectory(root);
        }
    }, [root]);

    return (
        <div className="d-flex flex-column gap-1">
            {directory?.parent ? (
                <button className="btn btn-outline-primary border-0 text-start" onClick={() => onChangeDirectory(directory.parent!)}>
                    <FontAwesomeIcon icon={faFolder} fixedWidth /> &uarr; {fileName(directory.parent.name)}
                </button>
            ) : null}

            {directory?.children?.map((dir: IDirectory) => (
                <button className="btn btn-outline-dark border-0 text-start" onClick={() => onChangeDirectory(dir)}>
                    <FontAwesomeIcon icon={faFolder} fixedWidth /> {fileName(dir.name)}
                </button>
            ))}

            {directory?.files?.map((file: IFile) => (
                <Link href={file.url} target="_blank" className="btn btn-outline-dark border-0 text-start">
                    <FontAwesomeIcon icon={getMimeIcon(file.mimetype)} fixedWidth /> {fileName(file.name)}
                </Link>
            ))}
        </div>
    );
}