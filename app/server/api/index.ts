import { Router } from "express"
import buildOmdbRequest from "../helpers/omdbRequest"
const api = Router()

api.get("/omdb-search", async ({ query }, res) => {
    buildOmdbRequest({ ...query })
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(error => res.status(500).json({ error: error.message }))
})

export default api
