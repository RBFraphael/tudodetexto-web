import { faFile, faFileCode, faFileExcel, faFileImage, faFilePdf, faFileText, faFileWord, faFileZipper, IconDefinition } from "@fortawesome/free-solid-svg-icons"

export const getMimeIcon = (mimetype: string): IconDefinition => {
    if (mimetype.indexOf("image") > -1) { return faFileImage; }
    if (mimetype.indexOf("spreadsheet") > -1) { return faFileExcel; }
    if (mimetype.indexOf("json") > -1) { return faFileCode; }
    if (mimetype.indexOf("sql") > -1) { return faFileCode; }
    if (mimetype.indexOf("pdf") > -1) { return faFilePdf; }
    if (mimetype.indexOf("php") > -1) { return faFileCode; }
    if (mimetype.indexOf("opendocument.text") > -1) { return faFileWord; }
    if (mimetype.indexOf("word") > -1) { return faFileWord; }
    if (mimetype.indexOf("zip") > -1) { return faFileZipper; }
    return faFile;
}