let myLibrary = [];
const input = document.querySelector('.two > input')
let inputValue = '';
let count = 0

const submit = document.querySelector('.submit');
submit.addEventListener('click', addBookToList);

const display = document.querySelector('.display');
display.addEventListener('click', displayBookList);

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}

function addBookToList() {
  let book = {};
  inputValue = input.value;
  book.author = inputValue;
  myLibrary.push(book);
  console.log(myLibrary);
  count++;
}

function displayBookList() {
  const authors = myLibrary.map(book => {
    console.log(book['author']);
  });
  return authors;
}

// Modal Behavior