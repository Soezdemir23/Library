let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read
    if (read === "yes") {
        this.read = true
    }else {
        this.read = false
    }


    this.info = function () {
        return `${this.title}, by ${this.author}. ${this.pages} pages. ${(this.read)} `
    }
}

function addBookToLibrary(entries) {
    let book = new Book(entries.title, entries.author, entries.pages, entries.read);
    myLibrary.push(book)
}

/**
 * Create an entry for the html and myLibrary array.
 * add a data-attribute number to the remove button so removing it
 * later seamlessly remove it from both instances
 * @param {Object} entries from the html form
 * @param {event} event from the dom parent clicked
 */
function addEntry(entries, event) {
    // add the entries to the myLibrary array, makes array.length usage for data-attribute less confusing
    addBookToLibrary(entries)
    // catch the container for the book entries
    let booksContainer = document.querySelector(".books-container")

    // create a new card for the container, set the class to book
    let bookCard = document.createElement("div")
    bookCard.className = "book"

    //create Elements that are the h4 and content of the h4
    let titleHeader = document.createElement("h4")
    titleHeader.textContent = "Title"
    let authorHeader = document.createElement("h4")
    authorHeader.textContent = "Author"
    let pagesHeader = document.createElement("h4")
    pagesHeader.textContent = "Pages"


    // create the content.
    let titleText = document.createElement("p")
    titleText.textContent = `${entries.title}`
    let authorText = document.createElement("p")
    authorText.textContent = `${entries.author}`
    let pagesText = document.createElement("p")
    pagesText.textContent = `${entries.pages}`

    //create buttons for read-toggle and remove, assign css classes
    let removeBtn = document.createElement("button")

    removeBtn.classList.add("remove")
    removeBtn.dataset.nr = `${myLibrary.length - 1}`
    removeBtn.textContent = "remove Book"
    // let's create this, but tell from the button if the book is being read
    // if entry is "yes", then light green, if "no" then salmon background
    let toggleRead = document.createElement("button")
    toggleRead.classList.add("toggle")
    //the values passed from the html form is either a yes or no dependent on the 
    if (entries.read === "yes") {
        toggleRead.textContent = "reading"
        toggleRead.classList.add("reading")
    } else if (entries.read === "no") {
        toggleRead.textContent = "not reading"
        toggleRead.classList.add("not-reading")
        
    }
    bookCard.append(
        titleHeader, titleText,
        authorHeader, authorText,
        pagesHeader, pagesText, toggleRead,
        removeBtn)
    booksContainer.append(bookCard)
    // close the modal
    toggleModal(event)
}



document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    // I searched long for this one. I will probably forget it again, so it should be good to know it exists in github.
    let formData = Object.fromEntries(new FormData(event.target).entries());
    addEntry(formData)
})
//The modal
const modal = document.querySelector(".modal")
const trigger = document.querySelector(".trigger")
const closeButton = document.querySelector(".close-button")

function toggleModal() {
    modal.classList.toggle("show-modal")
}

function windowOnClick(event) {
    if (event.target === modal) toggleModal()
}

trigger.addEventListener("click", toggleModal)
closeButton.addEventListener("click", toggleModal)
window.addEventListener("click", windowOnClick)

// bookContainer 
let bookContainer = document.querySelector(".books-container")
/**
 * Detects if the current 
 * @param {mouse Event} event - Get the current remove button
 */
bookContainer.onclick = function (event) {
    let clicked = event;
    // this is only triggered if the event.target.dataset.nr returns a valid result
    if (typeof(event.target.dataset.nr) !== "undefined") {
        // let it be the number we use ti remive the 
        let removeCardIndex = event.target.dataset.nr
        // remove the entry from the front
        bookContainer.removeChild(event.target.closest(".book"))
        // remove it from the back
        let book = myLibrary.splice(removeCardIndex, 1)
        console.log(book)
        // go through each card item and rewrite the new information
        let bookCarditems = document.querySelectorAll(".book")
        for (let i = 0; i < myLibrary.length; i++) {
            // paragraphs
            let bookCardParagraphs = bookCarditems[i].querySelectorAll("p")
            bookCardParagraphs[0].textContent = myLibrary[i].title
            bookCardParagraphs[1].textContent = myLibrary[i].author
            bookCardParagraphs[2].textContent = myLibrary[i].pages
            //button
            let readStatus = bookCarditems[i].querySelector(".toggle")
            if (myLibrary[i].read === true) {
                readStatus.textContent = "reading"
                readStatus.classList.add()
            }
            else {
                readStatus.textContent = "not reading"
            }
        }
     
        //bookContainer.removeChild(event.target.closest(".book"))
        //myLibrary.splice(parseInt(event.target.dataset.nr), parseInt(event.target.dataset.nr)+1)
    }
}