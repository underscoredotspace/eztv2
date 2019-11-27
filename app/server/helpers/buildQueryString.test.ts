import { buildQueryString } from "./buildQueryString"

describe("Create http query string from object", () => {
    test("should return query string with one part", () => {
        const queyString = buildQueryString({ a: "b" })
        expect(queyString).toBe("a=b")
    })

    test("should return query string with multiple parts", () => {
        const queyString = buildQueryString({ a: "b", c: "d" })
        expect(queyString).toBe("a=b&c=d")
    })

    test("should return query string with missing values dropped", () => {
        const queyString = buildQueryString({
            a: "b",
            c: "d",
            e: "",
            f: 0,
            g: null
        })
        expect(queyString).toBe("a=b&c=d")
    })
})
