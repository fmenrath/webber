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
      favouriteShows: []
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
  }
}
</script>
