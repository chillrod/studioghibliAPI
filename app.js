const App = document.getElementById('root')

let photoGradient = `linear-gradient(30deg, #060509, 70%, rgba(159,167,222, .1) 85%)`




const fetchMovies = async () => {
  const response = await fetch('https://api.jsonbin.io/b/5fa95aa92769cc5b06ad3d66').catch(err => console.error(err))
  const movies = await response.json();
  // console.log(movies[0])
  return movies
}


function renderFeaturedMovie(movies,) {

  let randomMovie = movies[Math.floor(Math.random() * 20)]

  return `
  <img class='logo' src='./img/logo.png' />
  <div id='featured' class='featured-photo' style='background-image: ${photoGradient},url(./img/${randomMovie.id.substr(0, 6)}.png);'></div>

  <h2 class='featured-title'>${randomMovie.title}</h2>

  <p class='featured-director'> <span class='directed'>Directed by:</span> ${randomMovie.director}</p>

  <p class='netflix-cta'>Watch on Netflix</p>

  <a href='${randomMovie.netflix}' class='featured-netflix'><i class="far fa-play-circle"></i></a>

  <p class='featured-description'>${randomMovie.description}..</p>  
  `
}

function renderMovie(movie) {
  return `
      <div class='item'>

      
      <div id='movie-card' class='movie-card-photo' style='background-image: ${photoGradient},url(./img/${movie.id.substr(0, 6)}.png);'></div>
      
      <h2 class='movie-title'>${movie.title}</h2>
      
      <a class='movie-play'href='${movie.netflix}'><i class="far fa-play-circle"></i></a>
      
      <div class='movie-rate'>${renderRatedStars(movie)}</div>    
      
      </div>    
    `
}

function renderRatedStars(movie) {
  if (movie.rt_score > 95) {
    return `
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>`
  } if (movie.rt_score > 70) {
    return `
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>`
  } if (movie.rt_score > 50) {
    return `
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star-half"></i>`
  } else
    return `
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star-half"></i>`
}


function renderTopRatedMovie(movie) {
  return `
  <div class='suggested-item'>
  <div id='featured' class='suggested-photo photo-container' style='background: ${photoGradient}, url(./img/${movie.id.substr(0, 6)}.png);'></div>

  <h2 class='suggested-title'>${movie.title}</h2>

  <p class='suggested-rate'>Rate on Rotten Tomates: ${movie.rt_score}</p>

  <p class='suggested-director'>Directed by: ${movie.director}</p>
  </div>
  `
}

fetchMovies().then(movies => {



  let suggested = movies.map(movie => {
    if (movie.rt_score > 95) {
      return renderTopRatedMovie(movie)
    }
  }).join('')

  console.log(movies)
  App.innerHTML = `
  <header>
  </header>
  
  <main>
  <section>
    <div class='featured-container'>
      ${renderFeaturedMovie(movies)}
    </div>
    </section>

    <section>
      <h2 class='ghibli-cta'>Ghibli Movies</h2>
      <div class='movies-container'>
        ${movies.map(movie => renderMovie(movie)).join('')}
      </div>
    </section>

    <section>
      <h2 class='top-rated'>Top Rated</h2>
      <div class='suggested-container'>
       ${suggested}
      </div>
    </section>
    </main>

    <footer> 
    <img class='logo-bottom' src='./img/logo.png' />
    </footer>
    `

})
