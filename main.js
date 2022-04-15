
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
//========== END ============

//========== Submit New Book ============
const submitBook = document.querySelector('.submit-new-book');
submitBook.addEventListener('click', addBookToLibrary);

// Reading List Container
const readingList = document.querySelector('.reading-list');
const slider = document.querySelector('.slider');

let card = '';
function addBookToLibrary() {
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let read = document.getElementById('read').checked;
  let imageUrl = '';

  const book = new Book(author, title, pages, read);
  
  myLibrary.push(book);
  
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
  cardBtn.innerText = 'Read Again';
  cardInfo.appendChild(cardBtn);

  readingList.appendChild(container);

  fetchBookList();
   // Fetch book listings
   function fetchBookList() {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${book['title']}+inauthor:${book['author']}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      imageUrl = (data.items[0].volumeInfo.imageLinks['thumbnail']);
      // Create img in DOM
      let img = document.createElement('img');
      img.className = 'img-thumbnail'
      img.src = imageUrl;
      cardImg.appendChild(img);
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
  }

  console.log(imageUrl);
  console.log(myLibrary);
}
//============= Best Seller List ==================

function getBestSellers() {
  return new Promise((resolve, reject) => {
    fetch('https://api.nytimes.com/svc/books/v3/lists.json?api-key=APIKEY&list=hardcover-fiction')
     .then(response => {
       return response.json();
      }).then(data => {
         resolve(data);
         return resultsArr.push(data.results);
   }
  , error => console.log(error)) })
}

let author = [];
let title = [];
let resultsArr = [];

getBestSellers().then(data => {
  resultsArr.forEach((item) => {
    for(let i = 0; i < 15; i++) {
      author.push(item[i].book_details[0].author);
      title.push(item[i].book_details[0].title);
    }
  });
  //Render images in carousel
  for(let i = 0; i < 15; i++) {
    getBookImages(author[i], title[i], i);
  }
});

function getBookImages(author, title, index) {
  return new Promise((resolve, reject) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}`)
     .then(response => {
       return response.json();
      }).then(data => {
        // grab all item selectors
        const itemList = Array.from(document.querySelectorAll('.book-cover'));
        // assign best seller book images to each node
        itemList[index].src = data.items[0].volumeInfo.imageLinks.thumbnail;
         resolve(data);
   }
  , error => console.log(error)) })
}
getBookImages(author, title);
//=============       End        ==================


  

  