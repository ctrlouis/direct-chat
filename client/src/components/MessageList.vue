<template>
    <div id="messageList">
        <Message v-for="message in messages" :key="message.content" :message="message" :username="username"></Message>
    </div>
</template>

<script>
import Message from './Message.vue';

export default {

    components: {
        Message
    },

    props: ['messages', 'username'],
    
}
</script>

<style lang="scss">
</style>
