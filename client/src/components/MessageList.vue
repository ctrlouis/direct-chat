<template>
    <div id="messageList">
        <Message v-for="message in messages" :key="message.content" :message="message"></Message>
    </div>
</template>

<script>
import Message from './Message.vue';

export default {

    components: {
        Message
    },

    computed: {
        messages() {
            return this.$store.state.messages;
        }
     }
    
}
</script>

<style lang="scss">
</style>
