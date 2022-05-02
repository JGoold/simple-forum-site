// get express
const express = require("express")
// instantiate express
const app = express()

const entries = require("./routes/entries")

const connectDB = require("./db/connect")
require("dotenv").config()
const notFound = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

// serve static files
app.use(express.static("./static"))
app.use(express.json())

// apply everything from routes to the specified path
app.use("/api", entries)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT

// function that connects to the database and listens for the port
async function start() {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(port, console.log(`Server is listening on port ${port}`))
	} catch (error) {
		console.log(error)
	}
}

start()
