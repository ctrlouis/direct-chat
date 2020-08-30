<template>
    <div class="message" :class="{'sent': isSender, 'received': !isSender}">
        <div class="flex flex-column">
            <span v-if="!isSender" class="metadata">{{message.author}}</span>
            <span class="bubble md-elevation-2">{{message.content}}</span>
            <span class="metadata">{{message.date | toLocaleString}}</span>
        </div>
        <md-avatar class="md-avatar-icon">{{avatarChar(message.author)}}</md-avatar>
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
$message-margin-x: .3em;

@mixin message-animation-duration {
    animation-duration: .25s;
}

.message {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin: 1em;
    white-space: pre-wrap;
    text-align: left;
    position: relative;

    div {
        &:first-child {
            margin: 0 1em;
        }
    }

    .md-avatar {
        margin-bottom: .7em;
    }

    .bubble {
        padding: .5em 1.5em;
        border-radius: .3em;
        word-break: break-all;
    }

    .author {
        position: absolute;
        top: -1.5em;
    }

    .metadata {
        color: #a8a8a8; 
        font-style: italic;
    }
}

.received {
    flex-direction: row-reverse;
    animation: fadeInLeft;
    @include message-animation-duration();
    margin-left: $message-margin-x;
    margin-right: auto;

    .bubble {
        color: white;
        background: linear-gradient(rgb(0, 182, 255), rgb(0, 133, 255));
    }
    
}

.sent {
    animation: fadeInRight;
    @include message-animation-duration();
    margin-left: auto;
    margin-right: $message-margin-x;
}

.md-avatar-icon {
    margin-left: .5em !important;
}
</style>
