<template>
    <div>
        <div v-for="message in messages" :key="message.content" class="message" :class="messageSender(message.author)">
            <span class="bubble">{{message.content}}</span>
            <div class="meta-data">
                <md-avatar class="md-avatar-icon">{{avatarChar(message.author)}}</md-avatar>
                <span>{{message.author}}</span>
            </div>
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
    align-items: baseline;
    margin: 1em;

    .bubble {
        border: 1px solid black;
        padding: .5em 2em;
        border-radius: .3em;
    }

    .meta-data {
        display: flex;
        flex-direction: column;
        margin: 0 1em;

        span {
            color: #a8a8a8;
            font-style: italic;
        }
    }
}

.receive {
    align-self: start;
    flex-direction: row-reverse;

    .bubble {
        color: white;
        background: linear-gradient(rgb(0, 182, 255), rgb(0, 133, 255));
    }
    
}

.sent {
    align-self: end;
    background-color: white;
}
</style>
