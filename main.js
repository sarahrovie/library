const main = document.querySelector('.main-content');
const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  book.id = crypto.randomUUID();
  myLibrary.push(book);
}

addBookToLibrary('The Hobbit', 'J.R.R Tolkien', 295, false);
addBookToLibrary(
  "Alice's Adventures In Wonderland",
  'Lewis Carroll',
  352,
  true
);

function displayBooks() {
  myLibrary.forEach((book) => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.setAttribute('id', book.id);

    const h2 = document.createElement('h2');
    h2.textContent = book.title;

    card.appendChild(h2);
    main.appendChild(card);
  });
}

displayBooks();
