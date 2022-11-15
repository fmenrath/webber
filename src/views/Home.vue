<template>
  <div class="home">
    <section class="movies" v-if="dataReady">
      <section id="hero">
        <div id="hero-text">
          <h1 id="hero-title">Black Panther: Wakanda Forever</h1>
          <ul id="hero-genres">
            <li id="feature">Featured</li>
            <li class="hero-genre">Action</li>
            <li class="hero-genre">Fantasy</li>
          </ul>
          <h3 id="hero-desc">Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death. As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.</h3>
          <div id="hero-bar">
            <ul id="hero-stats">
              <li id="hero-year">2022</li>
              <li v-if="true" class="stat-gap">|</li>
              <li id="hero-runtime">2h 15m</li>
              <li v-if="true" class="stat-gap">|</li>
              <li id="hero-age">12</li>
            </ul>
            <ul id="hero-actions">
              <li id="hero-add">
                <button target="_blank" rel="noopener noreferrer">
                  <img src="../assets/plus-solid.svg" alt="" class="hero-actions-icon">
                </button>
              </li>
              <li id="hero-list">
                <button target="_blank" rel="noopener noreferrer">
                  <img src="../assets/list-alt.svg" alt="" class="hero-actions-icon">
                </button>
              </li>
              <li id="hero-share">
                <button target="_blank" rel="noopener noreferrer">
                  <img src="../assets/share-solid.svg" alt="" class="hero-actions-icon">
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div id="hero-player">
          <YoutubeVue3 ref="youtube" :controls="0" :autoplay="autoplay" :videoid="play.video_id" :width="playerWidth" :loop="play.loop" :height="playerHeight"></YoutubeVue3>
        </div>
      </section>
      <section id="gap"></section>
      <section id="movies-grid" v-if="type==='movie'">
        <Carousel :content="popular_movies" text='popular' :media="type" :scrollLength="scrollLength" :cardCount="cardCount"></Carousel>
        <Carousel :content="upcoming_movies" text='upcoming' :media="type" :scrollLength="scrollLength" :cardCount="cardCount"></Carousel>
        <Carousel :content="toprated_movies" text='top_rated' :media="type" :scrollLength="scrollLength" :cardCount="cardCount"></Carousel>
      </section>
      <section id="shows-grid" v-else-if="type==='tv'">
        <Carousel :content="popular_shows" text='popular' :media="type" :scrollLength="scrollLength" :cardCount="cardCount"></Carousel>
        <Carousel :content="latest_shows" text='latest' :media="type" :scrollLength="scrollLength" :cardCount="cardCount"></Carousel>
        <Carousel :content="toprated_shows" text='top_rated' :media="type" :scrollLength="scrollLength" :cardCount="cardCount"></Carousel>
      </section>
    </section>
    <div class="t" v-else>Test</div>
    <div class="right-edge"></div>
    <div class="left-edge"></div>
  </div>
</template>

<script>
import axios from "axios";
import Carousel from '../components/Carousel.vue'
import '../style/home.scss' 
import { YoutubeVue3 } from 'youtube-vue3'


export default {
  name: 'Home',
  components: {
    Carousel,
    YoutubeVue3
  },
  data(){
    return{
      api_key: "13b853544d79c335a990b1e0c5825913",
      popular_movies: [],
      upcoming_movies: [],
      toprated_movies: [],
      popular_shows: [],
      latest_shows: [],
      toprated_shows: [],
      listPositions: [],
      cardCount: 9,
      listLength: 20,
      scrollLength: 4,
      currViewport: "",
      dataReady: false,
      play : { video_id: "_Z3QKkl1WyM", loop: 1 },
      playerWidth: 900,
      playerHeight: 506,
      autoplay: 1
    }
  },
  props: ['favouriteShows', 'favouriteMovies', 'type'],
  emits: ['addToFavouriteShows', 'removeFromFavouriteShows', 'addToFavouriteMovies', 'removeFromFavouriteMovies'],

  async created() {
    try{
      //Get base API data
      await axios.get('https://api.themoviedb.org/3/movie/popular?api_key='+this.api_key+'&language=en-US').then(response => (this.popular_movies = response.data.results))
      await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key='+this.api_key+'&language=en-US').then(response => (this.upcoming_movies = response.data.results))
      await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key='+this.api_key+'&language=en-US').then(response => (this.toprated_movies = response.data.results))
      await axios.get('https://api.themoviedb.org/3/tv/popular?api_key='+this.api_key+'&language=en-US').then(response => (this.popular_shows = response.data.results))
      await axios.get('https://api.themoviedb.org/3/tv/on_the_air?api_key='+this.api_key+'&language=en-US').then(response => (this.latest_shows = response.data.results))
      await axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key='+this.api_key+'&language=en-US').then(response => (this.toprated_shows = response.data.results))
      this.addDetails()
      this.adjustLayout()
      this.dataReady = true
      window.addEventListener('resize', this.adjustLayout);
    }
    catch(e){
      console.log(e)
    }
  },

  watch: {
    currViewport: function(value){
      console.log("Viewport changed: " + value)
      this.adjustLayout()
    }
  },

  mounted() {
  },

  computed: {
    scrollCount(){
      return Math.floor((this.listLength - this.cardCount) / this.scrollLength)
    }
  },

  methods: {
    
    //Add details to Movie Lists
    async addDetails(){
      for(var i=0; i<this.listLength; i++){
        await axios.get('https://api.themoviedb.org/3/movie/'+this.popular_movies[i].id+'?api_key='+this.api_key+'&language=en-US').then(response => (this.popular_movies[i].runtime = response.data.runtime))
        await axios.get('https://api.themoviedb.org/3/movie/'+this.popular_movies[i].id+'?api_key='+this.api_key+'&language=en-US').then(response => (this.popular_movies[i].genres = response.data.genres))
        await axios.get('https://api.themoviedb.org/3/movie/'+this.popular_movies[i].id+'/videos?api_key='+this.api_key+'&language=en-US').then(response => (this.popular_movies[i].videos = response.data.videos))
      }
      for(var j=0; j<this.listLength; j++){
        await axios.get('https://api.themoviedb.org/3/movie/'+this.upcoming_movies[i].id+'?api_key='+this.api_key+'&language=en-US').then(response => (this.upcoming_movies[i].runtime = response.data.runtime))
        await axios.get('https://api.themoviedb.org/3/movie/'+this.upcoming_movies[i].id+'?api_key='+this.api_key+'&language=en-US').then(response => (this.upcoming_movies[i].genres = response.data.genres))
      }
      for(var k=0; i<this.listLength; k++){
        await axios.get('https://api.themoviedb.org/3/movie/'+this.toprated_movies[i].id+'?api_key='+this.api_key+'&language=en-US').then(response => (this.toprated_movies[i].runtime = response.data.runtime))
        await axios.get('https://api.themoviedb.org/3/movie/'+this.toprated_movies[i].id+'?api_key='+this.api_key+'&language=en-US').then(response => (this.toprated_movies[i].genres = response.data.genres))
      }

    },

    //Get YouTube Trailer
    async getVideoLink(id){
      console.log(id)
    //   for(var x=0; this.popular_movies[x].videos.length; x++){
    //       console.log("YSDASDADSASDAD")
    //       if(this.popular_movies[i].videos[x].type=="Trailer" && this.popular_movies[i].videos[x].site == "YouTube"){
    //         this.popular_movies[i].videoLink = "https://www.youtube.com/watch?v="+this.popular_movies[i].videos[x].key
            
    //       }
    //     }
    },

    //Check if card is in favourites
    inFavouritesCheck(number){
      if (this.type=="tv"){
        return this.favouriteShows.some(entry => entry.id == number)
      }
      else{
        return this.favouriteMovies.some(entry => entry.id == number)
      }
    },

    //Remove item from favourites
    removeFromFavourites(id){
      if (this.type=="tv"){
        this.$emit('removeFromFavouriteShows', id)
      }
      else{
        this.$emit('removeFromFavouriteMovies', id)
      }
    },

    //Add item to favourites
    async addToFavourites(id){
      if (this.type=="tv"){
        const res = await axios.get('https://api.themoviedb.org/3/tv/'+id+'?api_key='+this.api_key+'&language=en-US')
        this.$emit('addToFavouriteShows', res.data)
      }
      else{
        const res = await axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key='+this.api_key+'&language=en-US')
        this.$emit('addToFavouriteMovies', res.data)
      }
    },

    //conver Runtime to xh xxmin
    convertRuntime(time){
      var hours = Math.floor(time/60)
      var minutes = time % 60
      return hours+'h ' + minutes + 'min'
    },

    //Responsiveness
    adjustLayout(){
      let width = document.documentElement.clientWidth;
      if(width>1800){
        this.cardCount = 9
        this.scrollLength = 5
        this.currViewport = "max"
      }
      else if(width>1550){
        this.cardCount = 8
        this.scrollLength = 4
        this.currViewport = "extra-large"
      }
      else if(width>1350){
        this.cardCount = 7
        this.scrollLength = 3
        this.currViewport = "large"
      }
      else if(width>1150){
        this.cardCount = 6
        this.scrollLength = 3
        this.currViewport = "medium"
      }
      else if(width>1000){
        this.cardCount = 5
        this.scrollLength = 3
        this.currViewport = "smaller"
      }
      else if(width<=1000){
        this.cardCount = 4
        this.scrollLength = 3
        this.currViewport = "small"
      }
    }
  }
}
</script>
