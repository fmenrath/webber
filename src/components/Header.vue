<template>
  <header>
    <div class="header-area">
      <router-link to="/" class="app-logo">
        <img src="../assets/icon.png" alt="app-icon" class="app-icon">
        <span class="app-text">webber</span>
      </router-link> 
      <nav>
        <ul class="nav-links">
          <button class="dark-mode-toggle" @click="toggleDarkMode()"></button>
          <li class="nav-link"><router-link to="/search/" @click="toggleBurgerMenu()"><img src="../assets/search-solid.svg" alt="search" id="search-icon"></router-link></li>
          <li class="nav-link"><router-link to="/" @click="toggleBurgerMenu()">Home</router-link></li>
          <li class="nav-link"><router-link to="/favourites/" @click="toggleBurgerMenu()">Favourites</router-link></li>
          <li class="nav-link"><router-link to="/about/" @click="toggleBurgerMenu()">About</router-link></li>
        </ul>
      </nav>
      <span id="nav-link-mobile"><img src="../assets/menu.svg" alt="" id="menu-icon"  @click="toggleBurgerMenu()"></span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    currentTheme(){
      if(document.body.getAttribute("data-theme")=='light'){
        return "light"
      }
      else{
        return "dark"
      }
    }
  },
  methods: {
    toggleDarkMode() {
      var theme = document.body.getAttribute("data-theme")
      if (theme == "dark"){
        document.body.setAttribute("data-theme", "light")
      }
      else{
        document.body.setAttribute("data-theme", "dark")
      }
    },
    toggleBurgerMenu(){
      var nav_links = document.querySelector(".nav-links")
      if(nav_links.classList.contains("open")){
        nav_links.classList.remove("open")
      }
      else{
        nav_links.classList.add("open")
      }

    }

  }
}
</script>
