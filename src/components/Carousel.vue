<template>
   <section class="carousel" :id="text">
      <h1>{{transformText(text)}}</h1>
      <button v-if="allowScrollLeft()" class="scroll-btn" id="left-scroll-btn" @click="scrollLeft()">
      <svg>
         <use href="#arrow-previous"></use>
      </svg>
      </button>
      <div class="movies-scroller" :id="text+'-scroller'">
         <div v-for="entry in carouselItems.slice(0,cardCount)" :key="entry.id" class="movie-card greyed visible">
            <router-link :to="{ path: '/'+type+'/' + entry.id}">
               <div class="movie-poster-wrapper">
               <img :src="'https://image.tmdb.org/t/p/w342'+entry.poster_path" alt="" class="movie-poster">
               </div>
               <div class="movie-preview">
               <img :src="'https://image.tmdb.org/t/p/w500'+entry.backdrop_path" alt="" class="movie-backdrop">
                  <div class="movie-preview-content">
                     <div class="preview-text-area">
                     <h3 class="movie-title">{{entry.title}}</h3>
                     <div class="genre-list">
                        <div v-for="genre in entry.genres" :key="genre.id" class="genre">
                           {{genre.name}}
                        </div>
                     </div>
                     <div class="info-list">
                        <span>{{entry.release_date}}</span>
                        <span>|</span>
                     </div>
                     </div>
                     <div class="preview-interaction-area">
                     <div class="like"></div>
                     <div class="share"></div>
                     <div class="rating"></div>
                     </div>
               </div>
               </div>
            </router-link>
         </div>
         <div v-for="entry in carouselItems.slice(cardCount)" :key="entry.id" class="movie-card greyed">
            <router-link :to="{ path: '/'+type+'/' + entry.id}">
               <div class="movie-poster-wrapper">
               <img :src="'https://image.tmdb.org/t/p/w342'+entry.poster_path" alt="" class="movie-poster">
               </div>
               <div class="movie-preview">
               <img :src="'https://image.tmdb.org/t/p/w500'+entry.backdrop_path" alt="" class="movie-backdrop">
                  <div class="movie-preview-content">
                     <div class="preview-text-area">
                     <h3 class="movie-title">{{entry.title}}</h3>
                     <div class="genre-list">
                        <div v-for="genre in entry.genres" :key="genre.id" class="genre">
                           {{genre.name}}
                        </div>
                     </div>
                     <div class="info-list">
                        <span>{{entry.release_date}}</span>
                        <span>|</span>
                     </div>
                     </div>
                     <div class="preview-interaction-area">
                     <div class="like"></div>
                     <div class="share"></div>
                     <div class="rating"></div>
                     </div>
               </div>
               </div>
            </router-link>
         </div>
      </div>
      <button v-if="allowScrollRight()" class="scroll-btn" id="right-scroll-btn" @click="scrollRight()">
      <svg>
         <use href="#arrow-next"></use>
      </svg>
      </button>
   </section>
   <!-- Arrows -->
   <svg>
      <symbol id="arrow-next" viewBox="0 0 256 512">
         <path fill="white"
         d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
      </symbol>

      <symbol id="arrow-previous" viewBox="0 0 256 512">
         <path fill="white"
         d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" />
      </symbol>
   </svg>
</template>


<script>
import '../style/carousel.scss'
export default{
   name: 'Carousel',
   data(){
      return{
         sliderPosition: 0,
         carouselItems: [],
         listLength: 0,
         type: "movie"
      }
   },
   props: ['content', 'text', 'media', 'scrollLength', 'cardCount'],
   mounted(){
      this.carouselItems = this.content
      this.listLength = this.carouselItems.length
      this.type = this.media
   },
   methods: {
      allowScrollLeft(){
         // console.log("sliderPos: " + this.sliderPosition)
         // console.log("cardCount: " + this.cardCount)
         // console.log("listLength: " + this.listLength)
         if(this.sliderPosition > 0){
            return true
         }
         else{
            return false
         }
      },
      allowScrollRight(){
         if(this.sliderPosition + this.cardCount < this.listLength){
            return true
         }
         else{
            return false
         }
      },
      scrollLeft(){
         if(this.sliderPosition>this.scrollLength){
            this.sliderPosition-=this.scrollLength
         }else{
            this.sliderPosition=0
         }
         this.scrollList()
      },
      scrollRight(){
         if((this.listLength-this.sliderPosition-this.cardCount)<this.scrollLength){
            this.sliderPosition=this.listLength-this.cardCount
         }else{
            this.sliderPosition+=this.scrollLength
         }
         this.scrollList()
      },
      scrollList(){
         //Get DOM item
         let list = document.getElementById(this.text+'-scroller')
         // //Note the new position of the list
         let transformDistance = this.sliderPosition/this.cardCount*100
         //Move the list to the left/right
         list.style.transform = "translateX(-" + (transformDistance) + "%)"
         this.highlightCards()
      },
      highlightCards(){
         //Get DOM item
         let list = document.getElementById(this.text+'-scroller')
         let cards = list.children
         for(var i=0; i<cards.length; i++){
            if(cards[i].classList.contains("visible")){
               cards[i].classList.remove("visible")
            }
         }
         for(var j=this.sliderPosition; j<(this.sliderPosition+this.cardCount);j++){
            cards[j].classList.add("visible")
         }
      },
      transformText(input){
         let output = ""
         let arr = input.split("_")
         arr.forEach(str => {
            output += str.charAt(0).toUpperCase() + str.slice(1) + " "
         })
         return output
      }
   }
}
</script>