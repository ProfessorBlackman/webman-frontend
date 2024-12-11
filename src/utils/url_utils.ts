export function cropString(str: string | undefined): string {
    if (!str) {
        return '';
    }
    if (str.length > 20) {
        return str.substring(0, 20) + '...';
    }
    return str;
}