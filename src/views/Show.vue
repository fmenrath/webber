<template>
  <section class="entry-details">

    <!-- Background for blur effect -->
    <div class="backdrop-wrapper">
      <div class="backdrop" :style="{backgroundImage:'url(https://image.tmdb.org/t/p/original'+entry.backdrop_path+')'}"></div>
    </div>
    <div class="entry-wrapper">

      <!-- Image -->
      <div class="image-wrapper">
        <img v-if="entry.poster_path!=null" :src="'https://image.tmdb.org/t/p/w780'+entry.poster_path" class="poster-large">
        <img v-else src="../assets/placeholder_movie.jpg" class="poster-large filter-invert">
        <p v-if="entry.tagline!=''" class="tagline">{{entry.tagline}}</p>
        <p v-else class="tagline">&nbsp;</p>
      </div>

      <!-- Info (Name, Year, Rating etc.) -->
      <div class="info">
        <div class="main-info">
          <div class="rating-text">★ <strong>{{entry.vote_average}}</strong> / 10</div>
          <h1>{{entry.name}}{{entry.title}}</h1>
          <div class="entry-meta-info">
            <span>{{entry.first_air_date.slice(0,4)}}-{{entry.last_air_date.slice(0,4)}}</span>
            <span v-if="seasonCount>1">{{seasonCount}} seasons, {{entry.number_of_episodes}} episodes</span>
            <span v-else>1 season, {{entry.number_of_episodes}} episodes</span>
          </div>
          <div class="entry-genre-list">
            <span v-for="genre in entry.genres" :key="genre.id">{{genre.name}}</span>
          </div>
          <p class="entry-description">{{entry.overview}}</p>
        </div>

        <!-- Production Info (Studios, etc.) -->
        <div class="production-info">
          <div class="studios">
            <img v-for="studio in entry.production_companies" :key="studio.id" :src="'https://image.tmdb.org/t/p/w780'+studio.logo_path" alt="" class="studio-logo">
          </div>
        </div>
      </div>

      <!-- Add/Remove from Lists -->
      <div class="actions">
        <div href="" class="toggle-favourites">
          <img v-if="inFavouriteShowsCheck(entry.id)" src="../assets/heart-solid.svg" class="heart" alt="" @click="removeFromFavouriteShows(entry.id)">
          <img v-else src="../assets/heart.svg" class="heart" alt="" @click="addToFavouriteShows(entry)">
        </div>
        
        <!-- Social Media Links -->
        <ul>
          <li v-if="socials.imdb_id!=null">
            <a :href="'https://imdb.com/title/'+socials.imdb_id" target="_blank" rel="noopener noreferrer">
              <img src="../assets/imdb.svg" alt="" class="social-media-icon">
            </a>
          </li>
          <li v-if="socials.facebook_id!=null">
            <a :href="'https://facebook.com/'+socials.facebook_id" target="_blank" rel="noopener noreferrer">
              <img src="../assets/facebook.svg" alt="" class="social-media-icon">
            </a>
          </li>
          <li v-if="socials.twitter_id!=null">
            <a :href="'https://twitter.com/'+socials.twitter_id" target="_blank" rel="noopener noreferrer">
              <img src="../assets/twitter.svg" alt="" class="social-media-icon">
            </a>
          </li>
          <li v-if="socials.instagram_id!=null">
            <a :href="'https://instagram.com/'+socials.instagram_id" target="_blank" rel="noopener noreferrer">
              <img src="../assets/instagram.svg" alt="" class="social-media-icon">
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- List of cast members -->
  <section class="list-block" id="cast-list">
    <div class="list-block-wrapper">
      <p class="list-block-header">Main Cast</p>
      <ul>
        <li v-for="actor in entry_cast" :key="actor.id">
          <div class="cast-member">
            <img v-if="(actor.profile_path!=null)" :src="'https://image.tmdb.org/t/p/w300'+actor.profile_path" alt="cast_member">
            <img v-else src="../assets/placeholder_portrait.png" class="filter-invert" alt="cast_member_no_picture" >
            <span class="real-name">{{actor.name}}</span>
            <span class="role-name">{{actor.character}}</span>
          </div>
        </li>
      </ul> 
    </div>
  </section>
</template>


<script>
import axios from "axios";

export default {
  name: 'Home',
  data(){
    return{
      entry: [],
      entry_crew: [],
      entry_cast: [],
      directors: [],
      producers: [],
      writers: [],
      socials: [],
      seasonCount: 0,
      entry_id: this.$route.params.id,
      api_key: "13b853544d79c335a990b1e0c5825913",
    }
  },
  props: ['favouriteShows', 'favouriteMovies'],
  emits: ['addToFavouriteShows', 'removeFromFavouriteShows', 'addToFavouriteMovies', 'removeFromFavouriteMovies'],
  async created() {
    //Get Show Details from API
    const res = await axios.get('https://api.themoviedb.org/3/tv/'+this.entry_id+'?api_key='+this.api_key+'&language=en-US')
    this.entry = res.data
    this.seasonCount = this.entry.seasons.length

    //Get Show Crew and Cast from API
    const cast = await axios.get('https://api.themoviedb.org/3/tv/'+this.entry_id+'/credits?api_key='+this.api_key+'&language=en-US')
    this.entry_crew = cast.data.crew
    this.entry_cast = cast.data.cast

    //Add data to crew lists
    this.entry_crew.forEach(crewmember => {
      if(crewmember.job == "Producer" & this.producers.length < 4){
        this.producers.push(crewmember.name)
      }
      else if(crewmember.job == "Director" & this.directors.length < 4){
        this.directors.push(crewmember.name)
      }
      else if(crewmember.job == "Writer" & this.writers.length < 4){
        this.writers.push(crewmember.name)
      }
    });

    //Get Show socials
    const socials = await axios.get('https://api.themoviedb.org/3/tv/'+this.entry_id+'/external_ids?api_key='+this.api_key)
    this.socials = socials.data
  },
  mounted(){
    window.scrollTo(0, 0)
  },
  methods: {
      //Methods for List Management
    inFavouriteShowsCheck(number){  
      return this.favouriteShows.some(entry => entry.id == number)
    },
    addToFavouriteShows(entry){
      this.$emit('addToFavouriteShows', entry)
    },
    removeFromFavouriteShows(number){
      this.$emit('removeFromFavouriteShows', number)
    }
  }
}
</script>