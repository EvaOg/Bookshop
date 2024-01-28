/////////////////////////////////SLIDER/////////////////////////////////

function slider() {
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
}

slider();

/////////////////  VARS FOR BOOK'S CONTAINER /////////////////////////////////

let booksContainer = document.getElementsByClassName("main-books");
let listGenres = document.querySelectorAll(".books-categories-list-item");
let previousGenre;
let x = document.querySelector(".books-categories-list-item-active");

///////////////// LOADING BOOK'S CARDS /////////////////////////////////

async function createBooks() {
  async function getBooks() {
    let promisResult = await fetch(`data/booksData.json`);
    let json = await promisResult.json();
    return json;
  }

  let books = await getBooks();
  x = document.querySelector(".books-categories-list-item-active");
  let currentGenre = x.innerHTML;
  console.log(currentGenre);

  const result = books.filter((i) => i.genre === currentGenre); ///////!!!!!!!!!!!!!!!!!!!!!!!!!
  console.log(result);

  if (result.length > 0) {
    result.forEach((book) => {
      const booksCard = document.createElement("div");
      console.log(booksContainer);
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
            <button class="book-card-description-button">Buy now</button>
          </div>
      </div>
          `;
      booksContainer[0].appendChild(booksCard);
    });
  } else {
    books.forEach((book) => {
      const booksCard = document.createElement("div");
      console.log(booksContainer);
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
            <button class="book-card-description-button">Buy now</button>
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
    booksContainer[0].innerHTML = "";
    createBooks();
  });
});

createBooks();
