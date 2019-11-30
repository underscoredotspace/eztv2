import buildEztvRequest, { buildEztvQueryString } from "./buildEztvRequest"
jest.mock("./buildQueryString")
import { buildQueryString } from "./buildQueryString"
jest.mock("node-fetch")
import fetch from "node-fetch"
const mockBuildQS = buildQueryString as jest.Mock

describe("Build HTTP request for OMDB", () => {
    describe("build query string for request", () => {
        test("should return valid request", () => {
            const qs = buildEztvQueryString({ imdb_id: "123" })
            expect(qs).toEqual({ imdb_id: "123", limit: 50, page: 1 })
        })

        test("should request limit no greater than 100", () => {
            const qs = buildEztvQueryString({ limit: 200 })
            expect(qs).toEqual({ limit: 100, page: 1 })
        })
    })

    describe("do request", () => {
        test("should make request", () => {
            mockBuildQS.mockReturnValue("france")
            buildEztvRequest({})
            expect(fetch).toHaveBeenCalledWith(
                "https://eztv.io/api/get-torrents?france"
            )
        })
    })
})
