export const fileName = (fileName: string) => {
    if (fileName.length > 70) {
        return fileName.slice(0, 17) + "...";
    }
    return fileName;
}