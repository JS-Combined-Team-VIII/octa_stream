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

    // 1. Populate Text & Images
    document.getElementById("title").textContent = movie.title;
    document.getElementById("genre").textContent = movie.genre;
    document.getElementById("description").textContent = movie.description;
    document.getElementById("poster").src = movie.poster;

    const heroElement = document.getElementById("hero");
    if (heroElement) {
        heroElement.style.backgroundImage = `url(${movie.banner || movie.poster})`;
    }

    // 2. REWRITTEN VIDEO LOGIC (For YouTube Iframes)
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

// HELPER: Fixes YouTube URLs for iframes
function getYoutubeEmbedUrl(url) {
    if (!url) return "";
    
    // Regular expression to extract the 11-character Video ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    
    // The ID is captured in the second group of this regex
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    
    // Return the /embed/ format + autoplay & mute (for browser permission)
   
    
   return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1` : url;

}

// Initialize the page
loadMovieDetail();
