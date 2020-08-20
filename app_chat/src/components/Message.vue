<template>
    <div>
        <p>{{author}}</p>
        <p>{{content}}</p>
        <p>{{date}}</p>
    </div>
</template>

<script>

export default {
  props: ['author', 'content', 'date']
}
</script>

<style>
.message {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.receive {
    background-color: blue;
}

.send {
    background-color: white;
}
</style>
