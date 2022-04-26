const express = require("express")
const app = express()

const entries = require("./routes/entries")

const connectDB = require("./db/connect")
require("dotenv").config()
const notFound = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

app.use(express.static("./static"))
app.use(express.json())

app.use("/api", entries)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT

async function start() {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(port, console.log(`Server is listening on port ${port}`))
	} catch (error) {
		console.log(error)
	}
}

start()
