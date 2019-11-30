import omdbRequest, { buildOmdbQueryString } from "./omdbRequest"
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
        test("should return valid request", async () => {
            const omdbQueryString = await buildOmdbQueryString({
                query: "banana"
            })
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

        test("should return error cos query less than 3 characters", () => {
            expect(buildOmdbQueryString({ query: "oh" })).rejects.toMatchObject(
                {
                    message: '"query" must be at least 3 characters long'
                }
            )
        })

        test("should return error cos no apiKey", () => {
            delete process.env["OMDB_API_KEY"]
            expect(
                buildOmdbQueryString({ query: "banana" })
            ).rejects.toMatchObject({
                message: "OMDB API key missing"
            })
        })

        test("should request page no greater than 100", async () => {
            const omdbQueryString = await buildOmdbQueryString({
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
        test("should ", async () => {
            mockBuildQS.mockReturnValue("france")
            await omdbRequest({ query: "banana" })
            expect(fetch).toHaveBeenCalledWith("http://www.omdbapi.com?france")
        })
    })
})
