import "./styles.css";

//selectors
const library = document.getElementById("library");
const modal = document.getElementById("modal");
const addButton = document.getElementById("add-button");
const cancelButton = document.getElementById("cancel-button");
const saveButton = document.getElementById("save-button");

//event listeners
addButton.addEventListener("click", toggleModal);
cancelButton.addEventListener("click", toggleModal);
saveButton.addEventListener("click", addBookToLibrary);

//initialisation
let myLibrary = [];
let modalOpen = false;

//testbooks
let test = new Book("The Hobbit", "JRR Tolkien", 650, true);
let test2 = new Book("Code", "Charles Petzold", 210, false);
let test3 = new Book("Shoe Dog", "Phil Knight", 540, true);
let test4 = new Book("Ow I'm Felix", "Felix", 210, false);
let ronnie = new Book(
  "Let's find out then: My Life with Ronnie Pickering",
  "Gladys Pickering",
  1100,
  true
);
myLibrary.push(test, test2, test3, test4, ronnie);

//book constructor
function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
  this.toggleRead = function () {
    console.log("yeap");
    this.read = !this.read;
  };
}

function addBookToLibrary() {
  const title = document.getElementById("form-title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("completed").checked;
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  library.innerHTML = "";
  displayLibrary(myLibrary);
  toggleModal();
}

//render library
function displayLibrary(libraryArr) {
  libraryArr.forEach(createBookCard);

  function createBookCard(book, index) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-index", index);

    let readingClass = book.read
      ? `read-state reading`
      : `read-state reading active`;
    let completedClass = book.read
      ? `read-state completed active`
      : `read-state completed`;

    console.log(readingClass);
    console.log(completedClass);

    const bookDetails = `
        <div class="remove-button hide">X</div>
          <h3 class="book-title">${book.title}</h3>
            <p class="author">${book.author}</p>
              <p class="pages">${book.pages} pages</p>
                <div class="read-states">
                  <p class="${readingClass}">Reading</p>
                  <p class="${completedClass}">Completed</p>
                </div>`;
    bookCard.innerHTML = bookDetails;

    library.appendChild(bookCard);
  }
  addRemoveButtonListener();
  addReadToggle();
}

//sort array to show uncompleted books first
myLibrary.sort(function (x, y) {
  return x.read === y.read ? 0 : x.read ? 1 : -1;
});

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

//removeButton selector and event listeners
function addRemoveButtonListener() {
  const removeButtons = [...document.querySelectorAll(".remove-button")];

  removeButtons.forEach((button) =>
    button.addEventListener("click", function (e) {
      let bookIndex = e.target.parentNode.getAttribute("data-index");
      library.innerHTML = "";
      myLibrary.splice(bookIndex, 1);
      console.log(myLibrary);
      displayLibrary(myLibrary);
    })
  );
}

//changeReadStatus
function addReadToggle() {
  const readStates = [...document.querySelectorAll(".read-state")];
  console.log(readStates);

  readStates.forEach((state) =>
    state.addEventListener("click", function (e) {
      let bookIndex = e.target.parentNode.parentNode.getAttribute("data-index");
      let readingState = e.target.parentNode.firstElementChild;
      let completedState = e.target.parentNode.lastElementChild;
      if (myLibrary[bookIndex].read) {
        readingState.classList.add("active");
        completedState.classList.remove("active");
      } else {
        readingState.classList.remove("active");
        completedState.classList.add("active");
      }
      myLibrary[bookIndex].toggleRead();
    })
  );
}
