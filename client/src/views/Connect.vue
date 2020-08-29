<template>
    <div id="connect">
        <md-field>
            <label>Username</label>
            <md-input v-model="username"></md-input>
            <span class="md-helper-text">Choose a username or keep input blank to stay anonym</span>
        </md-field>

        <md-field>
            <label>Chat password</label>
            <md-input v-model="password"></md-input>
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
        
        <div>
            <md-button v-if="!notificationAllowed" class="md-raised md-primary" @click="allowNotification">Allow notifications</md-button>
            <md-switch v-model="detailNotification" @change="onToggleDetailNotification">{{ !detailNotification ? 'Discreet notifications' : 'Show detail on notifications' }}</md-switch>
        </div>
        <md-button class="md-raised md-primary" @click="connect">Continue</md-button>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

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
        ...mapMutations(
            [
                'SET_USERNAME',
                'SET_PASSWORD',
                'SET_SERVER',
                'TOGGLE_DETAIL_NOTIFICATION'
            ]
        ),

        connect() {
            this.$store.commit('SET_USERNAME', this.username);
            this.$store.commit('SET_PASSWORD', this.password);
            this.$store.commit('SET_SERVER', this.server);
            console.log(this.server);
            this.$router.push('/chat');
        },
        allowNotification() {
            Notification.requestPermission();
        },
        onToggleDetailNotification() {
            this.$store.commit('TOGGLE_DETAIL_NOTIFICATION');
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