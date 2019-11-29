import fetch, { Response } from "node-fetch"
import { buildQueryString } from "./buildQueryString"

const EZTV_API = (qs: string) => `https://eztv.io/api/get-torrents${qs}`

export interface EztvProps {
    imdb_id?: string
    limit?: number
    page?: number
}

export function buildEztvQueryString({
    imdb_id,
    limit = 50,
    page = 1
}: EztvProps): string {
    limit = limit > 100 ? 100 : limit

    const qs = buildQueryString({
        imdb_id,
        limit: Number(limit),
        page: Number(page)
    })

    return qs
}

export default (props: EztvProps): Promise<Response> =>
    fetch(EZTV_API(buildEztvQueryString(props)))
