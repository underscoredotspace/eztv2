// import fetch from "node-fetch"

export interface EztvProps {
    imdb_id?: string
    limit?: number
    page?: number
}

export default function eztv({
    imdb_id,
    limit = 50,
    page = 1
}: EztvProps): Promise<any> {
    limit > 100 ? 100 : limit

    const qs = Object.entries({
        imdb_id,
        limit: Number(limit),
        page: Number(page)
    })
        .filter(([_k, v]) => v)
        .map(([key, value]) => `${key}=${value}`)
        .join("")

    return Promise.resolve({ qs })

    // return fetch(`https://eztv.io/api/get_torrents?${querystring}`)
    //     .then(req => req.json)
}
