<template>
  <section class="entry-details">

    <!-- Background for blur effect -->
    <div class="backdrop-wrapper">
      <div class="backdrop" :style="{backgroundImage:'url(https://image.tmdb.org/t/p/original'+entry.backdrop_path+')'}"></div>
    </div>
    <div class="entry-wrapper">

      <!-- Image -->
      <div class="image-wrapper">
        <img :src="'https://image.tmdb.org/t/p/w780'+entry.poster_path" class="poster-large">
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
          <img src="../assets/heart.svg" class="heart" alt="">
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
  <section class="cast-list">
    <div class="cast-wrapper">
      <p class="cast-header">Main Cast</p>
      <ul>
        <li v-for="actor in entry_cast" :key="actor.id">
          <div class="cast-member">
            <img :src="'https://image.tmdb.org/t/p/w300'+actor.profile_path" alt="">
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
      favouriteShows: this.favouriteShows
    }
  },
  async created() {
    //Get Show Details from API
    try{
      const res = await axios.get('https://api.themoviedb.org/3/tv/'+this.entry_id+'?api_key='+this.api_key+'&language=en-US')
      this.entry = res.data
      console.log(this.entry)
      this.seasonCount = this.entry.seasons.length
    }catch(e){
      console.log(e)
    }


    //Get Show Crew and Cast from API
    try{
      const cast = await axios.get('https://api.themoviedb.org/3/tv/'+this.entry_id+'/credits?api_key='+this.api_key+'&language=en-US')
      this.entry_crew = cast.data.crew
      this.entry_cast = cast.data.cast
    }catch(e){
      console.log(e)
    }

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
    try{
      const socials = await axios.get('https://api.themoviedb.org/3/tv/'+this.entry_id+'/external_ids?api_key='+this.api_key)
      this.socials = socials.data
    }catch(e){
      console.log(e)
    }
  }
}
</script>