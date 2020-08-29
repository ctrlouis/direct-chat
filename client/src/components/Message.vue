<template>
    <div class="message" :class="{'sent': isSender, 'received': !isSender}">
        <span class="bubble md-elevation-2">{{message.content}}</span>
        <div class="meta-data">
            <md-avatar class="md-avatar-icon">{{avatarChar(message.author)}}</md-avatar>
            <span>{{message.author}}</span>
        </div>
    </div>
</template>

<script>

export default {
    props: ['message'],

    methods: {
        avatarChar(username ="A") {
            return username.charAt(0);
        },
    },

    computed: {
        username() {
            return this.$store.state.username;
        },

        isSender() {
            if(this.message.author == this.username)
                return true;
            else
                return false;
        },
    },

    computed: {
        username() {
            return this.$store.state.username;
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
    white-space: pre-wrap;
    text-align: left;

    .bubble {
        padding: .5em 1.5em;
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

.received {
    align-self: start;
    flex-direction: row-reverse;

    .bubble {
        color: white;
        background: linear-gradient(rgb(0, 182, 255), rgb(0, 133, 255));
    }
    
}

.sent {
    align-self: end;
    float: right;
}
</style>
