import fetch, { Response } from "node-fetch"
import { buildQueryString } from "./buildQueryString"

export const OMDB_API = (qs: string) => `http://www.omdbapi.com/${qs}`

export enum OmdbType {
    FILM = "movie",
    SERIES = "series",
    EP = "episode"
}

export interface OmdbProps {
    query: string
    type?: OmdbType
    year?: number
    page?: number
}

export function buildOmdbQueryString({
    query,
    type = OmdbType.SERIES,
    year,
    page = 1
}: OmdbProps): string {
    const apiKey = process.env["OMDB_API_KEY"]
    if (!apiKey) {
        throw new Error("OMDB API key missing")
    }

    page > 100 ? 100 : page

    const qs = buildQueryString({
        s: query,
        page: Number(page),
        type,
        y: Number(year),
        apiKey
    })

    return qs
}

export default (props: OmdbProps): Promise<Response> =>
    fetch(OMDB_API(buildOmdbQueryString(props)))
