const elMovieList = document.querySelector("#movie__list");
const elPrevBtn = document.querySelector("#prev");
const elNextBtn = document.querySelector("#next");
const elSearchInput = document.querySelector("#search");
const elMovieTemplate = document.querySelector("#movie__template").content;

const API_KEY = "1742254f";
let moviePage = 1;
let serachValue = "hulk";

elSearchInput.addEventListener("change", () => {
   serachValue = elSearchInput.value.trim();
   fetchMovies();
   elSearchInput.value = "";
});

function renderMovies(movieArr, element) {
   element.innerHTML = null;

   const movieFragment = document.createDocumentFragment();

   movieArr.forEach((elem) => {
      const cloneTemplate = elMovieTemplate.cloneNode(true);

      cloneTemplate.querySelector(".movie__img").src = elem.Poster;
      cloneTemplate.querySelector(".movie__img").onerror = (evt) => {
         evt.target.src = "http://via.placeholder.com/100x150";
      };
      cloneTemplate.querySelector(".movie__title").textContent = elem.Title;
      cloneTemplate.querySelector(".movie__type").textContent = elem.Type;
      cloneTemplate.querySelector(".movie__year").textContent = elem.Year;
      cloneTemplate.querySelector(".movie__imdbid").textContent = elem.imdbID;

      movieFragment.appendChild(cloneTemplate);
   });

   element.appendChild(movieFragment);

   if (moviePage <= 1) {
      elPrevBtn.disabled = true;
   } else {
      elPrevBtn.disabled = false;
   }
}

async function fetchMovies() {
   elMovieList.innerHTML = "<img src='./spinner.svg' alt='spinner'/>";

   const response = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${serachValue}&page=${moviePage}`,
   );
   const data = await response.json();

   let total = Math.ceil(data.totalResults / 10);

   if (moviePage == total) {
      elNextBtn.disabled = true;
   } else {
      elNextBtn.disabled = false;
   }

   if (data.Search) {
      renderMovies(data.Search, elMovieList);
   }
}
elPrevBtn.addEventListener("click", () => {
   moviePage--;
   fetchMovies();
});
elNextBtn.addEventListener("click", () => {
   moviePage++;
   fetchMovies();
});

fetchMovies();
