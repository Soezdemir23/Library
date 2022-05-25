let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.toggle = function(read) {
        if (read == true) return "Is being read"
        return "Hasn't read yet"
    }
    this.info = function() {
        return `${this.title}, by ${this.author}. ${this.pages} pages. ${this.toggle(this.read)} `
    }
}

let book = new Book("The Aboriginal Anal", "Gus Huffington", 666, false)

function addBookToLibrary() {
    
}


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