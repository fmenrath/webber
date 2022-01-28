<template>
   <section class="search-action">
      <div class="search-wrapper">
         <h2 id="search-header">Search for <span class="text-accent">{{searchString}}</span></h2>
         <div class="searchbar">
            <input type="text" @keyup="search()" v-model="searchString" placeholder="Movies, shows, actors etc." id="searchbar-input" autocomplete="off">
            <img src="../assets/search-solid.svg" alt="search-logo" id="searchbar-icon">
         </div>
      </div>
   </section>
   <section class="search-results">
      <div class="search-results-grid">
        <div v-for="result in searchResults" :key="result.id+'-'+result.media_type" class="result-card">
          <router-link :to="{ path: '/'+result.media_type+'/' + result.id}">
            <div class="result-poster-wrapper">
               <img v-if="(result.media_type=='person' && result.profile_path!=null)" :src="'http://image.tmdb.org/t/p/w342'+result.profile_path" alt="" class="result-poster">
               <img v-else-if="(result.media_type=='person')" src="../assets/placeholder_portrait.png" alt="" class="result-poster filter-invert fit-img">
               <img v-else :src="'http://image.tmdb.org/t/p/w342'+result.poster_path" alt="" class="result-poster">
               <p>{{result.id}}</p>
            </div>
          </router-link>
        </div>
      </div>
   </section>
</template>


<script>
import axios from "axios";

export default {
   data(){
      return{
         searchResults: [],
         api_key: "13b853544d79c335a990b1e0c5825913"
      }
   },
   methods: {
      async search(){
         var searchString = document.getElementById("searchbar-input").value
         var search = await axios.get('https://api.themoviedb.org/3/search/multi?api_key='+this.api_key+'&language=en-US&query='+searchString+'&page=1&include_adult=false')
         search.data.results = search.data.results.filter(function(obj) {
            return obj.media_type !== 'person';
         })
         this.searchResults = search.data.results
      }
   }
}
</script>
