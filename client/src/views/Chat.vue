<template>
    <div id="chat" @keyup.enter.exact.prevent="sendMessage">
        <MessageList id="messageList"/>
        <div class="message-form md-elevation-5">
            <!-- <input type="text" class="md-elevation-2" v-model="content" placeholder="Your message"> -->
            <textarea rows="1" class="md-elevation-2" v-model="content" placeholder="Your message" spellcheck="true"></textarea>
            <md-button class="md-icon-button md-raised md-primary" @click="sendMessage">
                <md-icon>send</md-icon>
            </md-button>
        </div>
    </div>
</template>

<script>
import MessageList from '@/components/MessageList.vue';
import Message from './../models/Message.js';
import { mapState } from 'vuex';

export default {
    name: 'chat',
    
    components: {
        MessageList
    },

    data() {
        return {
            ws: null,
            content: "",
            readyToChat: false,
            textAreaFilled: true 
        }
    },

    methods: {
        connectWebsocket() {
            const server = this.$store.state.server;
            this.ws = new WebSocket(server);
            this.ws.addEventListener("open", () => {
                console.log("WebSocket connection done!");
            });
            this.ws.addEventListener("message", res => {
                const encryptMessage = res.data;
                this.addMessage(encryptMessage);
            });
        },

        sendMessage() {
            console.log(this.content);
            if (!this.content || this.content == ""){
                return;
            }
            const message = new Message(this.content, this.username);
            message.encrypt(this.password);
            this.ws.send(message.encrypted);
            this.addMessage(message, true);
            this.content = "";
        },

        addMessage(newMessage, sendByMe =false) {
            let message;
            if (sendByMe) {
                newMessage.sendByMe = true;
                message = newMessage;
            } else {
                message = new Message();
                message.decrypt(newMessage, this.password);
                this.notify(message);
            }
            this.$store.commit('ADD_MESSAGE', message);
            this.scrollToEnd();
        },

        notify(message) {
            const focused = document.hasFocus();
            const allowedNotificaiton = Notification.permission === 'granted';

            if (!focused && allowedNotificaiton) {
                let title = `New message`;
                let options = null;

                if (this.$store.state.detailNotification) {
                    title = `Message from ${message.author}`;
                    options = {
                        body: `${message.content}`,
                    };
                } 

                new Notification(title, options);
            }
        },

        scrollToEnd() {    	
            const container = this.$el.querySelector("#messageList");
            container.scrollTop = container.scrollHeight * 10;
        }
    },

    computed: mapState([
        'username',
        'password'
    ]),

    created() {
        this.connectWebsocket();
    }
}
</script>

<style lang="scss">
$material-icons-font-path: '~material-icons/iconfont/';
@import '~material-icons/iconfont/material-icons.scss';

#chat {
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;

    flex-direction: column;
    flex-wrap: nowrap;

    .md-field {
        flex-shrink: 0;
    }

    .md-button {
        flex-shrink: 0;
    }
}

.message-form {
    display: flex;
    flex-direction: row;
    padding: 1em 2em;
    
    textarea {
        flex-grow: 1;
        padding: 1em;
        border-radius: 2em;
        border: none;
        background-color: white;
        resize: none;
        height: max-content;
        outline: none;
        overflow-y: auto;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */

        &::-webkit-scrollbar{
            display: none;
        }
    }
}

#messageList {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: auto;
}
</style>
