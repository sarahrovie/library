const main = document.querySelector('.main-content');
const addBookDialog = document.querySelector('#addBookDialog');
const showBtn = document.querySelector('#showDialog');
const confirmBtn = document.querySelector('#confirmBtn');
const cancelBtn = document.querySelector('#cancelBtn');
const form = document.querySelector('form');

let myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function displayBooks() {
  main.innerHTML = '';

  for (const book of myLibrary) {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.setAttribute('id', book.id);

    const title = document.createElement('h2');
    title.textContent = book.title;

    const info = document.createElement('span');
    info.classList.add('info');

    const author = document.createElement('p');
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement('p');
    pages.textContent = `Pages: ${book.pages}`;

    const status = document.createElement('p');
    status.textContent = `${book.read ? 'read' : 'not read'}`;
    status.style.color = `${book.read ? 'green' : 'red'}`;

    info.append(author, pages, status);
    card.append(title, info);
    main.appendChild(card);
  }
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  book.id = crypto.randomUUID();
  myLibrary.push(book);

  displayBooks();
}

addBookToLibrary(
  "Alice's Adventures In Wonderland",
  'Lewis Carroll',
  352,
  true
);

function getBook(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const title = data.get('title');
  const author = data.get('author');
  const pages = data.get('pages');
  const read = `${!data.get('read') ? false : true}`;

  addBookToLibrary(title, author, pages, read);
  form.reset();
  addBookDialog.close();
}

showBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBookDialog.showModal();
});

cancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBookDialog.close();
});

form.addEventListener('submit', getBook);
