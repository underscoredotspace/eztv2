import express from "express"
import path from "path"
import api from "./api"

express()
    .get("/", express.static(path.join(__dirname, "../client/dist")))
    .get("/api", api)
    .use((_, res) => res.sendStatus(404))
    .listen(3001, () => console.log(`http://localhost:3001`))
