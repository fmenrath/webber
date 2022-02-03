<template>
   <div class="person-wrapper">
      <section class="person-info">
         <div class="left-container">
            <img :src="'https://image.tmdb.org/t/p/h632'+actor.profile_path" class="poster-large">
            <div class="personal-info-box">
               <h2 class="personal-info-header">Information</h2>
               <div class="personal-info">
                  <div class="personal-info-type">Known for</div>
                  <span>{{actor.known_for_department}}</span>
               </div>
               <div class="personal-info">
                  <div class="personal-info-type">Appearances</div>
                  <span>{{combined_credits.length}}</span>
               </div>
               <div v-if="actor.birthday!=null" class="personal-info">
                  <div class="personal-info-type">Birth</div>
                  <span>{{actor.birthday}}</span>
               </div>
               <div v-if="actor.place_of_birth!=null" class="personal-info">
                  <div class="personal-info-type">Place of birth</div>
                  <span>{{actor.place_of_birth}}</span>
               </div>
               <div v-if="actor.deathdate!=null" class="personal-info">
                  <div class="personal-info-type">Death</div>
                  <span>{{combined_credits.length}}</span>
               </div>
            </div>
         </div>
        <div class="right-container">
            <h1 class="name">{{actor.name}}</h1>
            <span id="biography" v-if="actor.biography.length>500" style="max-height: 12ch">{{actor.biography}}</span>
            <span id="biography" v-else style="max-height: fit-content">{{actor.biography}}</span>
            <div class="bio-toggle"  v-if="actor.biography.length>500">
               <span id="show-more" v-if="extendedBiography" @click="toggleBiography()">Show less</span>
               <span id="show-more" v-else @click="toggleBiography()">Show more</span>
            </div>
            <section class="credits">
               <div v-if="movie_credits.length>0" class="movie-credits">
                  <h2 class="credit-header">Movie credits</h2>
                  <div class="credit-block">
                     <div class="credit" v-for="credit in movie_credits" :key="credit.release_date">
                        <span class="credit-year">{{credit.release_year}}</span>
                        <div class="credit-info">
                           <router-link :to="'/movie/'+ credit.id" class="credit-title">{{credit.title}}</router-link>
                           <span class="credit-role">{{credit.character}}</span>
                        </div>
                     </div>
                  </div>
               </div>
               <div v-if="tv_credits.length>0" class="tv-credits">
                  <h2 class="credit-header">TV credits</h2>
                  <div class="credit-block">
                     <div class="credit" v-for="credit in tv_credits" :key="credit.first_air_date">
                        <span class="credit-year">{{credit.release_year}}</span>
                        <div class="credit-info">
                           <router-link :to="'/tv/'+ credit.id" class="credit-title">{{credit.name}}</router-link>
                           <span class="credit-role">{{credit.character}}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
        </div>
      </section>
   </div>
</template>


<script>
import axios from "axios";

export default {
   name: 'Person',
   data(){
      return{
         actor: [],
         actor_id: this.$route.params.id,
         combined_credits: [],
         movie_credits: [],
         tv_credits: [],
         extendedBiography: false,
         api_key: "13b853544d79c335a990b1e0c5825913"
      }
   },
   async created() {
      //Get actor details from API
      const resActor = await axios.get('https://api.themoviedb.org/3/person/'+this.actor_id+'?api_key='+this.api_key+'&language=en-US')
      this.actor = resActor.data

      //Get combined credits (movies+shows)
      const resCombinedCredits = await axios.get('https://api.themoviedb.org/3/person/'+this.actor_id+'/combined_credits?api_key='+this.api_key+'&language=en-US')
      this.combined_credits = resCombinedCredits.data.cast
      
      //Get movie & show credits separetly
      const resMovieCredits = await axios.get('https://api.themoviedb.org/3/person/'+this.actor_id+'/movie_credits?api_key='+this.api_key+'&language=en-US')
      const resShowCredits = await axios.get('https://api.themoviedb.org/3/person/'+this.actor_id+'/tv_credits?api_key='+this.api_key+'&language=en-US')
      this.movie_credits = resMovieCredits.data.cast
      this.tv_credits = resShowCredits.data.cast

      this.movie_credits.forEach(element => {
         element.release_year = element.release_date.slice(0,4)
      });
       this.tv_credits.forEach(element => {
         element.release_year = element.release_date.slice(0,4)
      });

      //Sort arrays by release date
      this.movie_credits.sort((a, b) => {
         return new Date(b.release_date) - new Date(a.release_date);
      })
      this.tv_credits.sort((a, b) => {
         return new Date(b.first_air_date) - new Date(a.first_air_date); 
      })
      console.log(this.movie_credits)
      console.log(this.tv_credits)
   },
   methods: {
      toggleBiography(){
         var bio = document.getElementById("biography")
         if (this.extendedBiography==false){
            bio.style.setProperty("max-height","fit-content")
            bio.style.setProperty("-webkit-mask-image","none")
            this.extendedBiography = true
         }
         else{
            bio.style.setProperty("max-height","12ch")
            bio.style.setProperty("-webkit-mask-image","linear-gradient(to bottom, var(--background) 60%, transparent 100%)")
            this.extendedBiography = false
         }
      }
   }
}
</script>
