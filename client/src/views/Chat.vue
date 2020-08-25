<template>
    <div id="chat" @keyup.enter.exact="sendMessage">
        <MessageList :messages="messages" id="messageList" />
        <md-field>
            <label>Your message</label>
            <md-textarea v-model="content"></md-textarea>
        </md-field>
        <md-button class="md-raised md-primary" @click="sendMessage">Send</md-button>
        <div id="inputChat">
            
        </div>
    </div>
</template>

<script>
import MessageList from '@/components/MessageList.vue';
import Message from './../models/Message.js';

export default {
    name: 'chat',
    
    components: {
        MessageList
    },

    data() {
        return {
            ws: null,
            username: null,
            password: null,
            content: "",
            messages: [],
            readyToChat: false,
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
            if (!this.content || this.content == "") return ;
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
            this.messages.push(message);
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

    created() {
        this.connectWebsocket();
        this.username = this.$store.state.username;
        this.password = this.$store.state.password;
    }
}
</script>

<style>
#chat {
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;

    flex-direction: column;
    flex-wrap: nowrap;
}

#messageList {
    flex-grow: 1;
    overflow: auto;
}

#inputChat {
    flex-shrink: 0;
}
</style>
