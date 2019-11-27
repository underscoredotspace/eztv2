export function buildQueryString(obj: any): string {
    const qs = Object.entries(obj)
        .filter(([_k, v]) => !!v)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")

    return qs
}
