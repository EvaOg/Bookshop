const slider = () => {
  const sliderImages = document.querySelectorAll(".slider-image");
  const sliderDots = document.querySelectorAll(".slider-dot");

  let currentSlide = 0;
  let currentDot = 0;

  function listSlider() {
    sliderImages[currentSlide].classList.remove("slider-image-active");
    currentSlide = (currentSlide + 1) % sliderImages.length;
    sliderImages[currentSlide].classList.add("slider-image-active");

    sliderDots[currentDot].classList.remove("slider-dot-active");
    currentDot = (currentDot + 1) % sliderDots.length;
    sliderDots[currentDot].classList.add("slider-dot-active");
  }

  let interval = setInterval(listSlider, 5000);

  sliderDots.forEach((dot, index) => {
    dot.style.cursor = "pointer";
    dot.addEventListener("click", () => {
      sliderImages.forEach((slide) => {
        slide.classList.remove("slider-image-active");
      });
      sliderDots.forEach((dot) => {
        dot.classList.remove("slider-dot-active");
      });

      sliderImages[index].classList.add("slider-image-active");
      sliderDots[index].classList.add("slider-dot-active");

      currentSlide = index;
      currentDot = index;

      clearInterval(interval);
      interval = setInterval(listSlider, 5000);
    });
  });
};

slider();

let cartContainer = document.getElementsByClassName("cart-books-wrapper");
let cartIcon = document.getElementById("cart-icon");
let cartIconNumber = document.getElementById("cart-items-number");
let cartIconNumberMob = document.getElementById("cart-items-number-mob");
let cartList = [];
let books = [];
let result = [];

/////////////////  VARS FOR BOOK'S CONTAINER /////////////////////////////////

let booksContainer = document.getElementsByClassName("main-books");
let listGenres = document.querySelectorAll(".books-categories-list-item");
let previousGenre;
let x = document.querySelector(".books-categories-list-item-active");

///////////////// LOADING BOOK'S CARDS /////////////////////////////////

function addtoCart(id) {
  let book = books.filter((book) => book.id === id)[0];

  let found = cartList.filter((obj) => obj.id === id);
  console.log(found);

  if (book.inStock && found == 0) {
    cartList.push(book);
    console.log(cartList);
  }

  cartIconNumber.innerHTML = "";
  cartIconNumberMob.innerHTML = "";

  changeItemsNumberIcon();
  createBooks();
  return result;
}

async function createBooks(arr) {
  booksContainer[0].innerHTML = "";
  async function getBooks() {
    let promisResult = await fetch(`data/booksData.json`);
    let json = await promisResult.json();
    return json;
  }

  books = await getBooks();

  x = document.querySelector(".books-categories-list-item-active");
  let currentGenre = x.innerHTML;

  result = books.filter((i) => i.genre === currentGenre);
  if (result.length > 0) {
    result.forEach((book) => {
      const booksCard = document.createElement("div");

      booksCard.innerHTML = `
      <div class="book-card">
        
          <img class="book-card-img" src="${book.cover}" />
        
      
        <div class="book-card-description">
      
          <div class="book-card-title">
            <div id="book-title">${book.title}</div>
            <div>${book.author}</div>
          </div>  
      
          <div id="book-card-info">
            <div>${book.genre}</div>
            <div>Condition: ${book.condition}</div>
          <div>
      
          <div id="price">
            <strong>$ ${book.price}</strong>
          </div>
      
          <div class="book-card-description-button-container">
            <button class="book-card-description-button" onclick="addtoCart(${
              book.id
            })">${book.inStock ? "buy now" : "Out of stock"}</button>
          </div>
      </div>
          `;
      booksContainer[0].appendChild(booksCard);
    });
  } else {
    books.forEach((book) => {
      const booksCard = document.createElement("div");
      booksCard.innerHTML = `
        <div class="book-card">

            <img class="book-card-img" src="${book.cover}" />

          <div class="book-card-description">

            <div class="book-card-title">
              <div id="book-title">${book.title}</div>
              <div>${book.author}</div>
            </div>

            <div id="book-card-info">
              <div>${book.genre}</div>
              <div>Condition: ${book.condition}</div>
            <div>

            <div id="price">
              <strong>$ ${book.price}</strong>
            </div>

            <div class="book-card-description-button-container">
            <button class="book-card-description-button" onclick="addtoCart(${
              book.id
            })">${book.inStock ? "buy now" : "Out of stock"}</button>
          </div>
        </div>
            `;
      booksContainer[0].appendChild(booksCard);
    });
  }
}

///////////////// GENRE'S LIST EVENT LISENER /////////////////////////////////

listGenres.forEach((item) => {
  item.addEventListener("click", (event) => {
    previousGenre = document.querySelector(
      ".books-categories-list-item-active"
    );
    previousGenre.classList.remove("books-categories-list-item-active");
    item.classList.add("books-categories-list-item-active");
    createBooks();
  });
});

createBooks();

///////////////// cart /////////////////////////////////

function openCart() {
  document.getElementById("popup-cart-container").style.display = "block";
  createCart();
}

function closeCart() {
  document.getElementById("popup-cart-container").style.display = "none";
  cartContainer[0].innerHTML = "";
}

function removefromCart(id) {
  let newcartlist = cartList.filter((book) => book.id !== id);

  cartList = newcartlist;
  cartContainer[0].innerHTML = "";
  createCart();
  cartIconNumber.innerHTML = "";
  cartIconNumberMob.innerHTML = "";
  changeItemsNumberIcon();
  return cartList;
}

function changeItemsNumberIcon() {
  if (cartList.length > 0) {
    const cartItemsNumber = document.createElement("div");
    cartItemsNumber.innerHTML = `
        <p>${cartList.length}</p> 
        `;
    cartIconNumber.appendChild(cartItemsNumber);

    const cartItemsNumberMob = document.createElement("div");
    cartItemsNumberMob.innerHTML = `
        <p>${cartList.length}</p> 
        `;
    cartIconNumberMob.appendChild(cartItemsNumberMob);
  }
}

function createCart() {
  if (cartList.length > 0) {
    cartList.forEach((book) => {
      const booksCard = document.createElement("div");
      booksCard.innerHTML = `
    <div class="cart-book-container">

      <div class="book-card">
          <img class="book-card-img-cart" src="${book.cover}" />
        <div class="book-card-description-cart">
          
            <div>${book.title}</div>
            <div>${book.author}</div>
            <div class="delete-from-cart" onclick="removefromCart(${book.id})"> Delete </div>
        </div>
        
      </div>

      <div class="book-card-price">
        <strong>$ ${book.price}</strong>
      </div> 

    </div>  
        `;
      cartContainer[0].appendChild(booksCard);
    });
  } else {
    const booksCard = document.createElement("div");
    booksCard.innerHTML = `<div class="empty-cart-text">The cart is empty</div>`;
    cartContainer[0].appendChild(booksCard);
  }
}
