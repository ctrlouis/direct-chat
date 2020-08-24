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

        <md-button class="md-raised md-primary" @click="connect">Continue</md-button>
    </div>
</template>

<script>
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
        }
    },

    methods: {
        connect() {
            this.$store.commit('setUsername', this.username);
            this.$store.commit('setPassword', this.password);
            this.$store.commit('setServer', this.server);
            console.log(this.server);
            this.$router.push('/chat');
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
    }
}
</script>