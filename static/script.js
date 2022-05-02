// set up all the necessary variables
const submitBtn = document.querySelector(".submit-btn")
const textInput = document.querySelector("textarea")
const nameInput = document.querySelector(".name-input")
const categoryInput = document.querySelector(".category-input")
const entriesUl = document.querySelector(".entries")
const errorMsg = document.querySelector(".submit h3")
const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }
const refresh = document.querySelector(".submit ion-icon")

// function that gets the data and displays it to the html
async function getAndDisplay() {
	entriesUl.innerHTML = ""
	let {
		data: { entries }
	} = await axios.get("/api")
	entries = entries.map(entry => {
		const { _id: entryID, textValue, nameValue, date, edited, category } = entry
		return { entryID, textValue, nameValue, date, edited, category }
	})
	entries.forEach(entry => {
		const { category, textValue, entryID, edited, date, nameValue } = entry
		let newEntryLi = document.createElement("li")
		newEntryLi.innerHTML = `
		<h3>${category}</h3>
        <textarea class="entry-text" oninput='this.style.height = ""; this.style.height = this.scrollHeight + "px"' cols=55 disabled>${textValue}</textarea>
        <div>
			<span class="buttons">
				<button class="delete-btn">Delete</button>
				<button class="edit-btn">Edit</button>
				<button class="save-btn" data-id="${entryID}" disabled>Save</button>
			</span>
			<p class="edited-text">${edited}</p>
            <h5>${date}</h5>
            <h4>${nameValue}</h4>
        </div>
        `
		entriesUl.insertBefore(newEntryLi, entriesUl.childNodes[0])
	})
}

// function that sets up the buttons for each entry
function setupButtons() {
	const saveBtn = document.querySelectorAll(".save-btn")
	const entryText = document.querySelectorAll(".entry-text")
	const deleteBtn = document.querySelectorAll(".delete-btn")
	const li = document.querySelectorAll("li")

	const editBtn = document.querySelectorAll(".edit-btn")

	const editedText = document.querySelectorAll(".edited-text")

	// function that resets all button values
	function reset() {
		editBtn.forEach((btn, x) => {
			editBtn[x].innerText = "Edit"
			entryText[x].classList.remove("border")
			entryText[x].disabled = true
			saveBtn[x].classList.remove("visible")
			saveBtn[x].disabled = true
		})
	}
	// logic for save, edit and delete buttons
	for (let i = 0; i < saveBtn.length; i++) {
		saveBtn[i].addEventListener("click", async () => {
			let textValue = entryText[i].value
			await axios.patch(`/api/${saveBtn[i].dataset.id}`, { textValue, edited: "edited" })
			editedText[i].innerText = "edited"
			reset()
		})
		editBtn[i].addEventListener("click", () => {
			if (editBtn[i].innerText === "Cancel") {
				reset()
			} else {
				reset()
				editBtn[i].innerText = "Cancel"
				saveBtn[i].disabled = false
				saveBtn[i].classList.add("visible")
				entryText[i].disabled = false
				entryText[i].classList.add("border")
			}
		})
		deleteBtn[i].addEventListener("click", async () => {
			await axios.delete(`/api/${saveBtn[i].dataset.id}`)
			li[i].remove()
		})
	}
}

// event listener for the submit button, including all the necessary logic and functionality
submitBtn.addEventListener("click", async () => {
	submitBtn.disabled = true
	let textValue = textInput.value
	let nameValue = nameInput.value
	let date = new Date().toLocaleDateString("en-us", options)
	let category = categoryInput.value
	if (!textInput.value) {
		submitBtn.disabled = false
		return
	}
	if (!nameInput.value) {
		submitBtn.disabled = false
		return (errorMsg.style.visibility = "visible")
	}
	errorMsg.style.visibility = "hidden"
	textInput.value = ""
	nameInput.value = ""
	categoryInput.value = ""
	await axios.post("/api", { textValue, nameValue, date, category })
	getAndDisplay().then(() => {
		setupButtons()
	})
	submitBtn.disabled = false
})

// refresh the page and set up everything correctly
refresh.addEventListener("click", async () => {
	getAndDisplay().then(() => {
		setupButtons()
	})
})

// initial app setup
document.addEventListener("DOMContentLoaded", async () => {
	getAndDisplay().then(() => {
		setupButtons()
	})
})
