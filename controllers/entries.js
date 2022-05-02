// all functions used in the routes here

// import schema
const Entry = require("../models/Entry")
const asyncWrapper = require("../middleware/async")
const { createCustomError } = require("../errors/custom-error")

const getEntries = asyncWrapper(async (req, res) => {
	const entries = await Entry.find({})
	res.status(200).json({ entries })
})

const createEntry = asyncWrapper(async (req, res) => {
	const entry = await Entry.create(req.body)
	res.status(200).json({ entry })
})

const getSingleEntry = asyncWrapper(async (req, res) => {
	const { id: entryID } = req.params
	const entry = await Entry.findOne({ _id: entryID })
	if (!entry) {
		return next(createCustomError(`No entry with id: ${entryID}`, 404))
	}
	res.status(200).json({ entry })
})

const updateEntry = asyncWrapper(async (req, res) => {
	const { id: entryID } = req.params
	const entry = await Entry.findOneAndUpdate({ _id: entryID }, req.body, {
		new: true,
		runValidators: true,
	})
	if (!entry) {
		return next(createCustomError(`No entry with id: ${entryID}`, 404))
	}
	res.status(200).json({ entry })
})

const deleteEntry = asyncWrapper(async (req, res) => {
	const { id: entryID } = req.params
	const entry = await Entry.findOneAndDelete({ _id: entryID })
	if (!entry) {
		return next(createCustomError(`No entry with id: ${entryID}`, 404))
	}
	res.status(200).json({ entry })
})

// export each function to be used in routes
module.exports = { getEntries, createEntry, getSingleEntry, updateEntry, deleteEntry }
