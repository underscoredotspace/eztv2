import { Router } from "express"
const api = Router()

api.use(async ({ query }, res) => {
    res.json(query)
})

export default api
