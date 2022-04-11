let myLibrary = [];

function Book(author,title,pages,read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

//============ Modal Behavior ================
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

//========== Submit New Book ============
const submitBook = document.querySelector('.submit-new-book');
submitBook.addEventListener('click', addBookToLibrary);

// Reading List container
const readingList = document.querySelector('.reading-list');
function addBookToLibrary() {
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let read = document.getElementById('read').checked;

  const book = new Book(author, title, pages, read);
  
  myLibrary.push(book);
  // Create new book card
  
  const container = document.createElement('div');
  container.className = 'card';

  const cardImg = document.createElement('div');
  cardImg.className = 'card-img';
  container.appendChild(cardImg);

  const cardInfo = document.createElement('div');
  cardInfo.className = 'card-info';
  container.appendChild(cardInfo);

  const textTitle = document.createElement('p');
  textTitle.className = 'text-title';
  textTitle.innerText = book['title'];
  cardInfo.appendChild(textTitle);

  const textBody = document.createElement('p');
  textBody.className = 'text-body';
  textBody.innerText = `${book['author']} ${book['pages']}${book['read']}`;
  cardInfo.appendChild(textBody);

  const cardBtn = document.createElement('button');
  cardBtn.className = 'card-button';
  cardBtn.innerText = 'Read More';
  cardInfo.appendChild(cardBtn);

  readingList.appendChild(container);
  console.log(myLibrary);
}

//============= Display Book List =================
// DOM structure
/* <div class="card"> check
    <div class="card-img"></div> check
    <div class="card-info"> check
      <p class="text-title">Card title</p> check
      <p class="text-body">Lorem Ipsum dolor sit amet</p> check
      <button class="card-button">Read More</button> check
    </div>
  </div> */