<template>
    <div id="app">
        <main>
            <router-link to="/"><h1>Title</h1></router-link>
            <router-view></router-view>
        </main>
        <footer>
            <p></p>
        </footer>
    </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
h1, p {
  text-align: center;
}
a {
  text-decoration: none;
}
</style>
