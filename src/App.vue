<template>
  <SplashScreen />
  <Header/>
  <main>
    <router-view></router-view>
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
    }
  }
}
</script>
