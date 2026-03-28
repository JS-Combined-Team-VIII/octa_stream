fetch("data/movies.json")
    .then(response => response.json())
    .then(movies => renderMovies(movies))
    .catch(error => console.error("Error loading movies:", error));
function renderMovies(movies) {
    const grid = document.getElementById("moviesGrid");

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.className = "bg-[#1a1d27] text-white rounded-xl overflow-hidden border border-gray-700 shadow-md hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer w-[1000px";

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