<template>
  <SplashScreen />
  <Header/>
  <main>
    <router-view 
      @addToFavouriteMovies="addToFavouriteMovies"
      @addToFavouriteShows="addToFavouriteShows"
      @removeFromFavouriteMovies="removeFromFavouriteMovies"
      @removeFromFavouriteShows="removeFromFavouriteShows"
      :favouriteMovies="favouriteMovies"
      :favouriteShows="favouriteShows"
      @changeGridSize="changeGridSize"
      :gridSizePreference="gridSizePreference"
      ></router-view>
  </main>
  <Footer/>
</template>


<script>
import './main.scss'
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
      gridSizePreference: 6
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
    },
    gridSizePreference: {
      handler(newGridSize){
        localStorage.gridSizePreference = JSON.stringify(newGridSize)
      }
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

    //Change movie grid size
    changeGridSize(value){
      this.gridSizePreference = value
      //Get grid and change column count
      var grid = document.querySelector(".movies-grid")
      grid.style.gridTemplateColumns = 'repeat('+this.gridSizePreference+', 1fr)'
    }
  }
}
</script>
