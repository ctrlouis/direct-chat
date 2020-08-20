<template>
    <div id="app">
        <div v-if="!readyToChat" id="connection">
            
            <md-field>
                <label>Username</label>
                <md-input v-model="username"></md-input>
                <span class="md-helper-text">Choose a username or keep input blank to stay anonym</span>
            </md-field>

            <div>
                <label>Connection type:</label>
                <md-switch v-model="connection.remote">{{ !connection.remote ? 'Host conversation' : 'Connect to remote conversation' }}</md-switch>
                <div v-if="!connection.remote">
                    <!-- <ul>
                        <li>LAN : (in coming)</li>
                        <li>Public : (in coming)</li>
                    </ul> -->
                </div>
                <div v-else>
                    <input v-model="connection.ip" placeholder="IP Adress">
                </div>
            </div>

            <md-button class="md-raised md-primary" @click="getReadyToChat">Continue</md-button>
        </div>

        <div v-if="readyToChat" id="chat">
            <md-app md-waterfall>
                <md-app-content>
                    <MessageList :messages="messages" id="messageList" />
                </md-app-content>
                <md-app-toolbar md-mode="fixed" class="md-primary">
                </md-app-toolbar>
            </md-app>
            <md-bottom-bar md-sync-route>
                    <md-field>
                        <label>Your message</label>
                        <md-textarea v-model="message"></md-textarea>
                    </md-field>
                    <md-button class="md-raised md-primary" @click="sendMessage">Send</md-button>
            </md-bottom-bar>
            <div id="inputChat">
                
            </div>
        </div>
    </div>
</template>

<script>
import MessageList from '@/components/MessageList.vue';
import Message from './../models/Message.js';

export default {
    name: 'App',
    
    components: {
        MessageList
    },

    data() {
        return {
            connection: {
                remote: true,
                ip: "10.1.250.157",
                url: ""
            },
            username: null,
            message: "",
            readyToChat: false,
            ws: null,
            messages: []
        }
    },

    methods: {
        getReadyToChat() {
            if (this.connection.remote) {
                this.connection.url = `ws://${this.connection.ip}:5000`;
            } else {
                this.connection.url = `ws://localhost:5000`;
            }

            this.ws = new WebSocket(this.connection.url);
            this.ws.addEventListener("open", () => {
                console.log("WebSocket connection done!");
            });

            this.ws.addEventListener("message", res => {
                const message = JSON.parse(res.data);
                this.addMessage(message);
            })

            this.readyToChat = true;
        },

        sendMessage() {
            if (!this.message || this.message == "") return ;
            const message = new Message(this.username, this.message);
            this.ws.send(JSON.stringify(message));
            this.addMessage(message);
            this.message = "";
        },

        addMessage(message, sendByMe =false) {
            if (sendByMe) message.sendByMe = true;
            this.messages.push(message);
            this.scrollToEnd();
        },

        scrollToEnd() {    	
            const container = this.$el.querySelector("#messageList");
            container.scrollTop = container.scrollHeight * 10;
        }
    },

    computed: {
        connectionType: () => {
            let type = "Host";
            //if (this.connection.remote) {
                type = "Remote";
            // }
            return type;
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

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
