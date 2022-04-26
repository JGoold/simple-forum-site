const express = require("express")
const router = express.Router()

const { getEntries, createEntry, getSingleEntry, updateEntry, deleteEntry } = require("../controllers/entries")

router.get("/", getEntries)
router.post("/", createEntry)
router.get("/:id", getSingleEntry)
router.patch("/:id", updateEntry)
router.delete("/:id", deleteEntry)

module.exports = router
