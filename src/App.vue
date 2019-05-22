<template>
  <div id="app" class="og-main__content">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/patienten">Patienten</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
