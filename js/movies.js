// // 1️⃣ Load Movie Data
// fetch("data/movies.json")
//     .then(response => response.json())
//     .then(movies => renderMovies(movies))
//     .catch(error => console.error("Error loading movies:", error));

// // 2️⃣ Render Movie Cards
// function renderMovies(movies) {
//     const grid = document.getElementById("moviesGrid");

//     movies.forEach(movie => {
//         // Create card container
//         const card = document.createElement("div");
//         card.className = "bg-[#383a3c] text-white rounded-lg shadow hover:shadow-lg transition cursor-pointer";

//         // Navigate to movie details on click
//         card.onclick = () => {
//             window.location.href = `movie.html?id=${movie.id}`;
//         };

//         // Movie Poster
//         const img = document.createElement("img");
//         img.src = movie.poster;
//         img.alt = movie.title;
//         img.className = "rounded-t-lg w-full h-64 object-cover";

//         // Movie Title
//         const title = document.createElement("h2");
//         title.textContent = movie.title;
//         title.className = "text-center p-4 font-semibold text-lg";

//         // Append elements
//         card.appendChild(img);
//         card.appendChild(title);
//         grid.appendChild(card);
//     });
// }

// 1️⃣ Load Movie Data
fetch("data/movies.json")
    .then(response => response.json())
    .then(movies => renderMovies(movies))
    .catch(error => console.error("Error loading movies:", error));
function renderMovies(movies) {
    const grid = document.getElementById("moviesGrid");

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.className = "bg-[#1a1d27] text-white rounded-xl overflow-hidden border border-gray-700 shadow-md hover:shadow-2xl hover:scale-105 transition duration-700 cursor-pointer";

        card.onclick = () => {
            window.location.href = `movie.html?id=${movie.id}`;
        };

        const img = document.createElement("img");
        img.src = movie.poster;
        img.alt = movie.title;
        img.className = "w-full h-40 object-contain bg-black";

        const title = document.createElement("h2");
        title.textContent = movie.title;
        title.className = "text-center p-4 font-bold text-lg";

        const info = document.createElement("p");
        info.textContent = "View Details";
        info.className = "text-center text-sm text-gray-400 pb-4";

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(info);

        grid.appendChild(card);
    });
}
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});