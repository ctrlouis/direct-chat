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
    }
}
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(blue, A200), // The primary color of your application
  accent: md-get-palette-color(yellow, 600), // The accent or secondary color
  theme: light // This can be dark or light
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
