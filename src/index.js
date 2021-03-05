import "./styles.css";

//selectors
const modal = document.getElementById("modal");
const addButton = document.getElementById("add-button");
const cancelButton = document.getElementById("cancel-button");
const saveButton = document.getElementById("save-button");

//event listeners
addButton.addEventListener("click", toggleModal);
cancelButton.addEventListener("click", toggleModal);

//initialisation
let myLibrary = [];
let modalOpen = false;

//testbooks
let test = new Book("The Hobbit", "JRR Tolkien", 650, true);
let test2 = new Book("Code", "Charles Petzold", 210, false);
let test3 = new Book("Shoe Dog", "Phil Knight", 540, true);
let test4 = new Book("Pandas", "Mr G", 210, false);
myLibrary.push(test, test2, test3, test4);

//book constructor
function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
  this.info = function () {
    return `${this.title} by ${this.author}`;
  };
}

function addBookToLibrary() {
  // do stuff here
}

//render library
function displayLibrary(libraryArr) {
  const library = document.getElementById("library");

  libraryArr.forEach(createBookCard);

  function createBookCard(book, index) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-index", index);

    let reading = book.read ? "" : "reading";
    let completed = book.read ? "completed" : "";

    const bookDetails = `
        <div class="remove-button hide">X</div>
          <h3 class="book-title">${book.title}</h3>
            <p class="author">${book.author}</p>
              <p class="pages">${book.pages} pages</p>
                <div class="read-state">
                  <p class=${reading}>Reading</p>
                  <p class=${completed}>Completed</p>
                </div>`;
    bookCard.innerHTML = bookDetails;
    library.appendChild(bookCard);
  }
}

displayLibrary(myLibrary);

//toggle add book modal
function toggleModal() {
  if (!modalOpen) {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
  modalOpen = !modalOpen;
  console.log(modalOpen);
}

//bookCard selector and event listeners
const bookCards = [...document.querySelectorAll(".book-card")];
console.log(bookCards);
// bookCards.forEach((bookCard) =>
//   bookCard.addEventListener("mouseenter", function (e) {
//     e.target.firstChild.nextSibling.classList.remove("hide");
//   })
// );
// bookCards.forEach((bookCard) =>
//   bookCard.addEventListener("mouseleave", function (e) {
//     e.target.firstChild.nextSibling.classList.add("hide");
//   })
// );
