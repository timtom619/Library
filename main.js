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
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    closeModal(modal);
  });
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});

function openModal(modal) {
  if(modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active');
}

function closeModal(modal) {
  if(modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active');
}