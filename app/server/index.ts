import express from "express"
import morgan from "morgan"
import path from "path"
import api from "./api"
require("dotenv").config()

const app = express()

app.use(express.static(path.join(__dirname, "../client/dist")))
app.use(morgan("dev"))

app.get("/api", api)
app.use((_, res) => res.sendStatus(404))
app.listen(3001, () => console.log(`http://localhost:3001`))
