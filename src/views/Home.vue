<template>
  <div class="home">
    <section class="movies">
      <section class="movies-filter">
        <div class="selection-title">
          <span class="selected-sort">Popular</span>
          <span class="selected-type"> movies</span>
        </div>
        <div class="type-selection-wrapper">
          <div class="type-switch left">
            <div class="type active" tab-direction="left" @click="typeswitch(0)">Movies</div>
            <div class="type" tab-direction="right" @click="typeswitch(1)">TV Shows</div>
          </div>
        </div>
        <div class="filter-right">
          <div class="slider-wrapper">
            <img src="../assets/expand-alt.svg" class="filter-icon" alt="">
            <input type="range" min="3" max="8" value="6" class="slider" id="grid-size-slider" @change="changeGridSize()">
          </div>
          <div class="sort-results">
            <img src="../assets/sort.svg" class="filter-icon" alt="">
            <select name="sort" class="sort-select" @change="refreshGrid()">
              <option value="popular">Popularity</option>
              <option value="top_rated">Top Rated</option>
              <option value="now_playing">Now Playing</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </div>
      </section>
      <section class="movies-grid hidden">
        <div v-for="movie in movie_list" :key="movie.id" class="movie-card">
          <router-link :to="{ path: '/'+type+'/' + movie.id}">
            <div class="movie-poster-wrapper">
              <a class="movie-bookmark">
                <img src="../assets/heart.svg" class="heart" alt="">
                <img src="../assets/heart-solid.svg" class="heart-full" alt="">
              </a>
              <img :src="'https://image.tmdb.org/t/p/w780'+movie.poster_path" alt="" class="movie-poster">
              <div class="rating-bar">
                <div class="rating-score" :style="{width: movie.vote_average*10 + '%', background: getColor(movie.vote_average/10)}"></div>
              </div>
            </div>
            <div class="movie-hover-overlay">
              <div class="overlay-card"></div>
            </div>
            <div class="movie-info">
              <div class="movie-title">{{movie.title}} {{movie.name}}</div>
            </div>
          </router-link>
        </div>
      </section>
      <section class="page-select">
        <button class="page-select-btn active" data-id="1" @click="changePage(1)">1</button>
        <button class="page-select-btn" data-id="2" @click="changePage(2)">2</button>
        <button class="page-select-btn" data-id="3" @click="changePage(3)">3</button>
        <button class="page-select-btn" data-id="4" @click="changePage(4)">4</button>
        <button class="page-select-btn" data-id="5" @click="changePage(5)">5</button>
        <button class="page-select-btn" data-id="6" @click="changePage(6)">6</button>
        <button class="page-select-btn" data-id="7"  @click="changePage(7)">7</button>
        <button class="page-select-btn" data-id="8" @click="changePage(8)">8</button>
        <button class="page-select-btn" data-id="9" @click="changePage(9)">9</button>
        <button class="page-select-btn" data-id="10" @click="changePage(10)">10</button>
      </section>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Home',
  data(){
    return{
      movie_list: [],
      type: "movie",
      sort: "popular",
      api_key: "13b853544d79c335a990b1e0c5825913",
      page: 1,
      favouriteShows: this.favouriteShows, 
      favouriteMovies: this.favouriteMovies,
    }
  },
  async created() {
    // Load popular-movies as default
    try{
      const res = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key='+this.api_key+'&language=en-US')
      this.movie_list = res.data.results
      var grid = document.querySelector(".movies-grid")
      grid.classList.remove("hidden")
    }
    catch(e){
      console.log(e)
    }
  },
  methods: {
    typeswitch(index){
      var target = document.getElementsByClassName("type")[index]

      //Check if user clicked on already active tab
      if(target.classList.contains("active") == false){

        //Switch "active" class to target tab
        document.querySelector(".type.active").classList.remove("active")
        target.classList.add("active")
        
        //Change the class for the :after-Element according to the target
        var direction = target.getAttribute("tab-direction")
        var typeswitch = document.querySelector(".type-switch")
        typeswitch.classList.remove(typeswitch.className.split(' ').pop())
        typeswitch.classList.add(direction)
      }
      if(index == 0){
        this.type = "movie"
      }
      else{
        this.type = "tv"
      }
      this.refreshGrid()
    },

    async refreshGrid(){
      //Display the correct page number in the page select section
      document.querySelector('[data-id="'+this.page+'"]').classList.add("active")

      //Establish sorting preference
      var sort = document.querySelector(".sort-select").value
      this.sort = sort

      //Change name for results heading
      var type_name_element = document.querySelector(".selected-type")
      var sort_name_element = document.querySelector(".selected-sort")
      var type_name = ''
      var sort_name = this.sort.replace(/_/g, ' ');

      if(this.type=="tv"){
        type_name = " TV shows"
      }
      else{
        type_name = " movies"
      }

      type_name_element.textContent = type_name
      sort_name_element.textContent = sort_name

      //Fix for handling the naming irregularities of the API
      if(this.sort == "now_playing" & this.type == "tv"){
        this.sort = "on_the_air"
      }

      //Hide grid
      var grid = document.querySelector(".movies-grid")
      grid.classList.add("hidden")

      //Wait 
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(150);

      //Retrieve new data from API
      if (this.sort=="upcoming" & this.type=="tv"){
        this.movie_list = []
      }
      else{
        const res = await axios.get('https://api.themoviedb.org/3/'+this.type+'/'+this.sort+'?api_key='+this.api_key+'&language=en-US&page='+this.page)
        this.movie_list = res.data.results
        grid.style.display = "grid";
      }
      //Display new grid
      grid.classList.remove("hidden")
    },
    changePage(pageNr){
      //Remove the page number style from the old page
      document.querySelector('[data-id="'+this.page+'"]').classList.remove("active")
      this.page = pageNr;
      this.refreshGrid();
    },
    getColor(value){
      //value from 0 to 1
      var hue=((-0.2+value)*120).toString(10);
      return ["hsl(",hue,",100%,40%)"].join("");
    },
    changeGridSize(){
      //Get slider value
      var size = document.getElementById("grid-size-slider").value

      //Get grid and change column count
      var grid = document.querySelector(".movies-grid")
      grid.style.gridTemplateColumns = 'repeat('+size+', 1fr)'

    }
  }
}
</script>
