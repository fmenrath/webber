<template>
  <SplashScreen />
  <Header @typeswitch="typeswitch"/>
  <main>
    <router-view 
      @addToFavouriteMovies="addToFavouriteMovies"
      @addToFavouriteShows="addToFavouriteShows"
      @removeFromFavouriteMovies="removeFromFavouriteMovies"
      @removeFromFavouriteShows="removeFromFavouriteShows"
      :favouriteMovies="favouriteMovies"
      :favouriteShows="favouriteShows"
      :key="$route.fullPath"
      :type="type"
      ></router-view>
  </main>
  <Footer/>
</template>


<script>
import './style/main.scss'
import SplashScreen from './components/SplashScreen.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default{
  name: 'App',
  components: {
    SplashScreen,
    Header,
    Footer
  },
  data(){
    return{
      favouriteMovies: [],
      favouriteShows: [],
      type: "movie"
    }
  },
  mounted(){
    //Retrieve favourite lists from local storage
    if(localStorage.favouriteMovies){
      this.favouriteMovies = JSON.parse(localStorage.favouriteMovies)
    }
    if(localStorage.favouriteShows){
      this.favouriteShows = JSON.parse(localStorage.favouriteShows)
    }
    if(localStorage.gridSizePreference){
      this.gridSizePreference = JSON.parse(localStorage.gridSizePreference)
    }
  },
  watch: {
    favouriteMovies: {
      handler(updatedMovies){
        localStorage.favouriteMovies = JSON.stringify(updatedMovies)
      },
      deep: true
    },
    favouriteShows: {
      handler(updatedShows){
        localStorage.favouriteShows = JSON.stringify(updatedShows)
      },
      deep: true
    }
  },
  methods: {
    //Adding a movie or show to favourites
    addToFavouriteMovies(item){
      this.favouriteMovies.push(item)
    },
    addToFavouriteShows(item){
      this.favouriteShows.push(item)
    },

    //Removing a movie or show from favourites
    removeFromFavouriteMovies(movie_id){
      this.favouriteMovies = this.favouriteMovies.filter(function( obj ) {
        return obj.id !== movie_id;
      })
    },
    removeFromFavouriteShows(show_id){
      this.favouriteShows = this.favouriteShows.filter(function( obj ) {
        return obj.id !== show_id;
      })
    },
    //Switch from Movies to Shows and vice versa
    typeswitch(mediaType){
      this.type=mediaType
      let mediaSwitch = document.getElementById('media-switch')
      let mediaSwitchMovie = document.getElementById('movie')
      let mediaSwitchTV = document.getElementById('tv')
    
      if(mediaType=="tv"){
        mediaSwitchMovie.classList.remove("active")
        mediaSwitchTV.classList.add("active")
        mediaSwitch.classList.add("right")
      }
      else if(mediaType=="movie"){
        mediaSwitchTV.classList.remove("active")
        mediaSwitchMovie.classList.add("active")
        mediaSwitch.classList.remove("right")
      }
    }
  }
}
</script>
