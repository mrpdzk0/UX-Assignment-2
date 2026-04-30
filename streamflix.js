// https://www.omdbapi.com/ - website I used for api key

const API_KEY = "92563ddf";

const sections = document.querySelectorAll(".new-movies");

const searches = ["avengers", "batman"];

async function fetchMovies(search, page = 1) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`);
    const data = await res.json();
    return data.Search || [];
}

async function loadAllMovies() {
    for (let i = 0; i < sections.length; i++) {
        const container = sections[i];

        container.innerHTML = "";

        let allMovies = [];

        for (let page = 1; page <= 2; page++) {
            const movies = await fetchMovies(searches[i] || "movies", page);
            allMovies = allMovies.concat(movies);
        }

        allMovies.forEach(movie => {
            const movieEl = document.createElement("div");
            movieEl.classList.add("new-movies-item");

            movieEl.innerHTML = `
                <img class="new-movies-item-img" 
                     src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/220x200"}" 
                     alt="${movie.Title}">

                <div class="new-movies-item-info">
                    <div class="new-movies-item-title">${movie.Title}</div>
                    <p class="new-movies-item-desc">Year: ${movie.Year}</p>
                    <button class="watch-button">Watch</button>
                </div>
            `;

            container.appendChild(movieEl);
        });
    }
}

loadAllMovies();