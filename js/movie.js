async function loadMovieDetail() {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");

  try {
    const response = await fetch('data/movies.json');
    const movies = await response.json();
    const movie = movies.find(m => m.id == movieId);

    if (!movie) {
      document.body.innerHTML = `
        <div class="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
          <h1 class='text-3xl font-bold mb-4'>Movie not found</h1>
          <a href="movies.html" class="text-indigo-400 underline">Back to Gallery</a>
        </div>`;
      return;
    }

    document.getElementById("title").textContent = movie.title;
    document.getElementById("genre").textContent = movie.genre;
    document.getElementById("description").textContent = movie.description;
    document.getElementById("year").textContent = movie.year;
    document.getElementById("rating").textContent = movie.rating;
    document.getElementById("director").textContent = movie.director || "N/A";
    // document.getElementById("playButton").href = `watch.html?id=${movie.id}`;
    document.getElementById("poster").src = movie.poster;

    const heroElement = document.getElementById("hero");
    if (heroElement) {
        heroElement.style.backgroundImage = `url(${movie.banner || movie.poster})`;
    }


    const videoPlayer = document.getElementById("videoPlayer");

    if (videoPlayer && movie.video) {
        // Convert watch?v= link to /embed/ link
        videoPlayer.src = getYoutubeEmbedUrl(movie.video);
         
    }

  } catch (error) {
    console.error("Error loading movie data:", error);
    document.body.innerHTML = "<h1 class='text-white text-center mt-20'>Failed to load data.</h1>";
  }
}


function getYoutubeEmbedUrl(url) {
    if (!url) return "";
    
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null; 
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0` : url;

}
loadMovieDetail();
