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

addBookToLibrary('The Hobbit', 'J.R.R Tolkien', '295', false);
console.log(myLibrary);
