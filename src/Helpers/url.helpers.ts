//Check valid url
export const isUrl = (str: string) => {
    if (!str) return false;
    if (str.startsWith("http://") || str.startsWith("https://")) {
        return true
    } else {
        return false
    }
}