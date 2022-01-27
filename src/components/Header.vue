<template>
  <header>
    <div class="header-area">
      <router-link to="/" class="vimivo-logo">
        <img src="../assets/logo.png" alt="vimivo-icon" class="vimivo-icon">
        <span class="vimivo-text">vimivo</span>
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
      var body = document.body;
      body.classList.toggle("dark");
    }
  }
}
</script>
