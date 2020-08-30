<template>
    <div id="connect">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <span class="md-title">direct-chat</span>
                </div>
            </md-app-toolbar>
    
            <md-app-content class="inline-flex flex-column">
                <div class="inline-flex flex-column">
        <md-field>
            <label>Username</label>
            <md-input v-model="username"></md-input>
            <span class="md-helper-text">Choose a username or keep input blank to stay anonym</span>
        </md-field>

        <md-field>
            <label>Chat password</label>
            <md-input v-model="password"></md-input>
        </md-field>
                </div>

                <div class="inline-flex flex-column align-items-center">
                    <md-switch v-model="connection.remote">
                        {{ !connection.remote ? 'Host conversation' : 'Connect to remote conversation' }}</md-switch>
            <div v-if="!connection.remote">
                <!-- <ul>
                    <li>LAN : (in coming)</li>
                    <li>Public : (in coming)</li>
                </ul> -->
            </div>
            <div v-else>
                        <md-field>
                            <label>IP Adress</label>
                            <md-input v-model="connection.ip"></md-input>
                        </md-field>
            </div>
        </div>
        
        <div>
                    <md-button v-if="!notificationAllowed" class="md-raised md-primary" @click="allowNotification">Allow
                        notifications
                    </md-button>
                    <md-switch v-else v-model="detailNotification" @change="onToggleDetailNotification">
                        {{ !detailNotification ? 'Hide notifications content' : 'Show notifications content' }}
                    </md-switch>
        </div>
        <md-button class="md-raised md-primary" @click="connect">Continue</md-button>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'connect',
    
    data() {
        return {
            connection: {
                remote: false,
                ip: "10.1.250.157",
                url: ""
            },
            username: null,
            password: null,
            notificationAllowed: false,
            detailNotification: false,
        }
    },

    methods: {
        ...mapActions(
            [
                'setUsername',
                'setPassword',
                'setServer',
                'toggleDetailNotification'
            ]
        ),

        connect() {
            this.setUsername(this.username);
            this.setPassword(this.password);
            this.setServer(this.server);
            console.log(this.server);
            this.$router.push('/chat');
        },
        allowNotification() {
            Notification.requestPermission();
        },
        onToggleDetailNotification() {
            this.toggleDetailNotification();
            this.detailNotification = this.$store.state.detailNotification;
            console.log(this.$store.state.detailNotification);
        },
    },

    computed: {
        server() {
            let server;
            if (this.connection.remote) {
                server = `ws://${this.connection.ip}:5000`;
            } else {
                server = `ws://localhost:5000`;
            }
            return server;
        },
    },

    created() {
        const notificationAllowed = Notification.permission === 'granted';
        if (notificationAllowed) {
            this.notificationAllowed = true;
        }
    }
}
</script>

<style lang="scss">
#connect {
    text-align: center;
}
</style>