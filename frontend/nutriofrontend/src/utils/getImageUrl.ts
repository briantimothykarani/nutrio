export function getImageUrl(path?: string | null): string {
    if (!path) return "/default-avatar.png";
    if (path.startsWith("http")) return path;
    return `http://127.0.0.1:8000${path}`;
}
