<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
        }
    },
    watch: {
        darkTheme() {
            if (this.darkTheme === true) {
                this.$material.theming.theme = "default-dark";
            } else {
                this.$material.theming.theme = "default";
            }
        }
    },
    computed: {
        darkTheme() {
            return this.$store.state.darkTheme;
        }
    }
}
</script>

<style lang="scss">
$primary: blue;
$accent: yellow;

@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color($primary, 500),
  accent: md-get-palette-color($accent, 700),
  theme: light
));

@include md-register-theme("default-dark", (
  primary: md-get-palette-color($primary, 700),
  accent: md-get-palette-color($accent, 800),
  theme: dark
));

@import "~vue-material/dist/theme/all"; // Apply the theme

.flex {
    display: flex;
}
.inline-flex {
    display: inline-flex;
}
.flex-row {
    flex-direction: row;
}
.flex-column {
    flex-direction: column;
}
.align-items-center {
    align-items: center;
    align-self: flex-start;
}
</style>
