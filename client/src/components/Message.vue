<template>
    <div class="message" :class="{'sent': isSender, 'received': !isSender}">
        <span class="bubble md-elevation-2">{{message.content}}</span>
        <div class="meta-data">
            <md-avatar class="md-avatar-icon">{{avatarChar(message.author)}}</md-avatar>
            <div class="message-info">
                <span>{{message.date | toLocaleString}}</span>
                <span v-if="!isSender" class="author"> - {{message.author}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import 'animate.css';

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

    filters: {
        toLocaleString(date) {
            return new Date(date).toLocaleTimeString('fr-FR');
        },
    }
}
</script>

<style lang="scss">
@mixin message-animation-duration {
    animation-duration: .25s;
}

.message {
    display: flex;
    flex-direction: row;
    align-items: last baseline;
    margin: 1em;
    white-space: pre-wrap;
    text-align: left;

    .bubble {
        padding: .5em 1.5em;
        border-radius: .3em;
        word-break: break-all;
    }

    .meta-data {
        display: flex;
        flex-direction: column;
        margin: 0 1em;
        align-items: flex-start;

        .message-info {
            color: #a8a8a8;
            display: flex;
            flex-direction: row;
            font-style: italic;

            .author {
                text-align: center;
                word-break: break-all;
            }
        }
    }
}

.received {
    align-self: start;
    flex-direction: row-reverse;
    animation: fadeInLeft;
    @include message-animation-duration();

    .bubble {
        color: white;
        background: linear-gradient(rgb(0, 182, 255), rgb(0, 133, 255));
    }
    
}

.sent {
    align-self: end;
    float: right;
    animation: fadeInRight;
    @include message-animation-duration();
}

.md-avatar-icon {
    margin-left: .5em !important;
}
</style>
