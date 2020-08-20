<template>
    <div>
        <div v-for="message in messages" :key="message.content">
            <md-avatar class="md-avatar-icon">{{avatarChar(message.author)}}</md-avatar>
            {{message.author}} {{message.content}}
            <!-- <Message :author="message.author" :content="message.content" :date="message.data" /> -->
        </div>
    </div>
</template>

<script>
// import Message from './Message.vue';

export default {
    props: ['messages'],

    methods: {
        avatarChar(username ="A") {
            return username.charAt(0);
        }
    },
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
