import buildOmdbRequest, { buildOmdbQueryString } from "./buildOmdbRequest"
jest.mock("./buildQueryString")
import { buildQueryString } from "./buildQueryString"
jest.mock("node-fetch")
import fetch from "node-fetch"
const mockBuildQS = buildQueryString as jest.Mock

describe("Build HTTP request for OMDB", () => {
    const apiKey = "secret"

    beforeEach(() => {
        process.env["OMDB_API_KEY"] = apiKey
    })

    afterEach(() => {
        delete process.env["OMDB_API_KEY"]
    })
    describe("build query string for request", () => {
        test("should return valid request", () => {
            const omdbQueryString = buildOmdbQueryString({ query: "banana" })
            const query = {
                apiKey,
                page: 1,
                s: "banana",
                type: "series",
                y: NaN
            }
            expect(mockBuildQS).toHaveBeenCalledWith(query)
            expect(omdbQueryString).toEqual(query)
        })

        test("should through error cos no apiKey", () => {
            delete process.env["OMDB_API_KEY"]
            expect(() =>
                buildOmdbQueryString({ query: "banana" })
            ).toThrowError("OMDB API key missing")
        })

        test("should request page no greater than 100", () => {
            const omdbQueryString = buildOmdbQueryString({
                query: "banana",
                page: 101
            })
            const query = {
                apiKey,
                page: 100
            }
            expect(omdbQueryString).toMatchObject(query)
        })
    })

    describe("do request", () => {
        test("should ", () => {
            mockBuildQS.mockReturnValue("france")
            buildOmdbRequest({ query: "banana" })
            expect(fetch).toHaveBeenCalledWith("http://www.omdbapi.com?france")
        })
    })
})
