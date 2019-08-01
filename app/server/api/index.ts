import { Router } from "express"
const api = Router()
import eztv from "./get-torrent"

api.use(({ query }, res) =>
    eztv(query).catch(error => {
        console.log(error.toString())
        res.sendStatus(500)
    })
)

export default api
