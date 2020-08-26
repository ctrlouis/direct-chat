<template>
    <div>
        <div v-for="message in messages" :key="message.content" class="message" :class="messageSender(message.author)">
            <md-avatar class="md-avatar-icon">{{avatarChar(message.author)}}</md-avatar>
            {{message.author}} {{message.content}}
            <!-- <Message :author="message.author" :content="message.content" :date="message.data" /> -->
        </div>
    </div>
</template>

<script>
// import Message from './Message.vue';

export default {
    props: ['messages', 'username'],

    methods: {
        avatarChar(username ="A") {
            return username.charAt(0);
        },

        messageSender(username) {
            if(this.username != username)
                return 'receive';
            else
                return 'sent';
        }
    },
}
</script>

<style lang="scss">
.message {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.receive {
    align-self: start;
    background-color: blue;
}

.sent {
    align-self: end;
    background-color: white;
    flex-direction: row-reverse;
}
</style>
