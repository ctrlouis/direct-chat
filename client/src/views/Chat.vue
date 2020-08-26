<template>
    <div id="chat" @keyup.enter.exact.prevent="sendMessage">
        <MessageList :messages="messages" :username="username" id="messageList" />
        <md-field :class="textInputClass">
            <label>Your message</label>
            <md-textarea v-model="content" required></md-textarea>
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
                this.textAreaFilled = false;
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

    computed: {
        textInputClass(){
            return {
                'md-invalid': !this.textAreaFilled
            }
        },
    },

    watch: {
        content() {
            if(this.content || this.content != "" && !this.textAreaFilled)
                this.textAreaFilled = true;
        }
    },

    created() {
        this.connectWebsocket();
        this.username = this.$store.state.username;
        this.password = this.$store.state.password;
    }
}
</script>

<style lang="scss">
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

#messageList {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: auto;
}
</style>
