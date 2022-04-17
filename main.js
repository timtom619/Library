
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

  let bookTitle = book[`title`];
  let bookAuthor = book[`author`];
  fetchBookList(bookTitle, bookAuthor);
   // Fetch book listings
   function fetchBookList(title, author) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}`)
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
}
//============= Best Seller List ==================

function getBestSellers() {
  return new Promise((resolve, reject) => {
    fetch('https://api.nytimes.com/svc/books/v3/lists.json?api-key=&list=hardcover-fiction')
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
// getBookImages(author, title);
//=============       End        ==================

//============= Book Details ==================
// Data to grab:
// - on book click grab the src url 
// - Grab reviews of book if user clicked in NYTimes best seller
// - Grab description of book

// When a user clicks on a book in the main section the aside section should show the Book details with the above information.
// Put all books currently on the page in a nodeList
const bookCover = document.querySelectorAll('.book-cover');
// Give all elements on the page a onlick event with bookDetails()
bookCover.forEach(book => book.addEventListener('click', bookDetails));
// In function
//   grab src url, book reviews, description of book, author
//   store that data in the aside section
let toggle = false;
function bookDetails() {
  if(toggle === true) clear();

  let bookSrc = this.src; // img url
  let index = this.id; // index position of book
  let authors = [];
  let titles = [];
  let description = [];
  const parentElement = document.querySelector('.book-details-top-container');
  const bookTitle = document.querySelector('.book-title');
  const asideCard = document.createElement('div');
  asideCard.className = 'aside-card';
  parentElement.insertBefore(asideCard,bookTitle);
  
  const asideCardImg = document.createElement('div');
  asideCardImg.className = 'aside-card-img'
  asideCard.appendChild(asideCardImg);

  
  const bookAuthor = document.querySelector('.book-author');
  const bookDescription = document.querySelector('.book-description');
  const bookCover = document.createElement('img');

  getBestSellers().then(data => {
    data.results.forEach(book => {
      authors.push(book.book_details[0].author);
      titles.push(book.book_details[0].title);
      description.push(book.book_details[0].description);
    });
   
    bookCover.className = 'aside-book-cover'
    bookCover.src = bookSrc;
    asideCardImg.appendChild(bookCover);

    // Match index of clicked element with array in author
    // Then store author 
    bookAuthor.textContent = author[index];

    // Match index of clicked element with array in title
    // Then store title
    bookTitle.textContent = title[index];

    // Match index of clicked element with array in description
    // Then store description
    bookDescription.textContent = description[index];
  });
  toggle = true;
}

function clear() {
  const parentElement = document.querySelector('.book-details-top-container');
  const asideCard = document.querySelector('.aside-card');

  const bookTitle = document.querySelector('.book-title');
  const bookAuthor = document.querySelector('.book-author');
  const bookDescription = document.querySelector('.book-description');
  const bookCover = document.querySelector('.aside-book-cover');

  bookTitle.textContent = '';
  bookAuthor.textContent = '';
  bookDescription.textContent = '';
  bookCover.src = '';

  parentElement.removeChild(asideCard);
}

  

  