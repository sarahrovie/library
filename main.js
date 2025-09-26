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

  if (myLibrary.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'No books yet!';
    message.classList = 'no-books-message';

    main.appendChild(message);
  }

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

    const readStatus = document.createElement('p');
    const span = document.createElement('span');
    const read = document.createElement('p');
    read.textContent = 'Status: ';
    readStatus.textContent = `${book.read ? 'Read' : 'Not read yet'}`;
    read.appendChild(span);
    span.appendChild(readStatus);
    readStatus.style.color = `${book.read ? 'green' : 'red'}`;

    const statusBtn = document.createElement('button');
    statusBtn.classList.add('status-btn');
    statusBtn.textContent = 'Change status';

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>window-close</title><path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" /></svg>`;
    const removeBtn = document.createElement('button');
    removeBtn.classList = 'remove-btn';
    removeBtn.setAttribute('data-book-id', `${book.id}`);
    removeBtn.innerHTML += svg;

    removeBtn.addEventListener('click', () => {
      removeBook(removeBtn.dataset.bookId);
    });

    info.append(author, pages, read, statusBtn);
    card.append(removeBtn, title, info);
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
  const read = data.get('read') ? true : false;

  addBookToLibrary(title, author, pages, read);
  form.reset();
  addBookDialog.close();
}

function removeBook(btnId) {
  myLibrary = myLibrary.filter((book) => book.id !== btnId);

  displayBooks();
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
