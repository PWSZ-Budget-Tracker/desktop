<template>
        <div id="app">
                <v-card
                        flat
                        tile
                >
                    <v-app-bar
                            color="#3eb4a7"
                            dark
                    >

                        <v-toolbar-side-icon>
                            <v-img alt="App logo" src="../assets/app_logo_t.png" width="90px"/>
                        </v-toolbar-side-icon>

                        <v-toolbar-title>Budget Tracker</v-toolbar-title>

                        <v-spacer></v-spacer>

                        <About/>

                        <v-menu offset-y>
                            <template v-slot:activator="{ on }">
                                <v-badge color="#9090ee" :content="messages" :value="messages" dot overlap>
                                    <v-btn v-on="on" icon>
                                        <v-icon>mdi-email</v-icon>
                                    </v-btn>
                                </v-badge>
                            </template>
                            <v-card class v-if="getNotifications.budgetPLN != null">
                                <v-alert class="mb-0" style="width: 250px" type="warning">{{getNotifications.budgetPLN}}</v-alert>
                            </v-card>
                            <v-card class v-if="getNotifications.budgetEUR != null">
                                <v-alert class="mb-0" style="width: 250px" type="warning">{{getNotifications.budgetEUR}}</v-alert>
                            </v-card>
                            <v-card class v-if="getNotifications.budgetUSD != null">
                                <v-alert class="mb-0" style="width: 250px" type="warning">{{getNotifications.budgetUSD}}</v-alert>
                            </v-card>
                        </v-menu>

                        <v-menu offset-y>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on">
                                    <v-icon>mdi-account</v-icon>
                                </v-btn>
                            </template>

                            <v-list>
                                <v-list-item @click="logout">
                                    <v-list-item-title @click="logout">Wyloguj się</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>

                    </v-app-bar>
                </v-card>
        </div>
</template>

<script>
    import About from "../components/About.vue";

    export default {
        name: "Main",
        components: {
            About
        },
        methods: {
            logout() {
                this.$store.dispatch('destroyToken')
                    .then(() => this.$router.push({name: 'login'}))
            },
        },
        computed: {
            getNotifications() {
                return this.$store.getters.getNotifications
            }
        },
        messages() {
            let messages = 0;
            for (const key in this.getNotifications) {
                if (this.getNotifications[key] != null) {
                    messages++;
                }
            }
            return messages
        }
    }
</script>

<style scoped>

</style>