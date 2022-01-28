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
          <li class="nav-link"><router-link to="/">Home</router-link></li>
          <li class="nav-link"><router-link to="/favourites/">Favourites</router-link></li>
          <li class="nav-link"><router-link to="/about/">About</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    toggleDarkMode() {
      var theme = document.body.getAttribute("data-theme")
      if (theme == "dark"){
        document.body.setAttribute("data-theme", "light")
      }
      else{
        document.body.setAttribute("data-theme", "dark")
      }
      // body.classList.toggle("dark");
    }
  }
}
</script>
