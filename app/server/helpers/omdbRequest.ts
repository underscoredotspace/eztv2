import fetch, { Response } from "node-fetch"
import { buildQueryString } from "./buildQueryString"

export const OMDB_API = (qs: string) => `http://www.omdbapi.com?${qs}`

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

export const buildOmdbQueryString = ({
    query,
    type = OmdbType.SERIES,
    year,
    page = 1
}: OmdbProps): Promise<string> =>
    new Promise((resolve, reject) => {
        if (!query || query.length < 3) {
            reject(new Error('"query" must be at least 3 characters long'))
        }

        const apiKey = process.env["OMDB_API_KEY"]
        if (!apiKey) {
            reject(new Error("OMDB API key missing"))
        }

        page = page > 100 ? 100 : page

        const qs = buildQueryString({
            s: query,
            page: Number(page),
            type,
            y: Number(year),
            apiKey
        })

        resolve(qs)
    })

export default async (props: OmdbProps): Promise<Response> =>
    fetch(OMDB_API(await buildOmdbQueryString(props)))
