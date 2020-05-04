<template>
        <div id="app">
                <v-card
                        flat
                        tile
                >
                    <v-toolbar
                            color="#3eb4a7"
                            dark
                    >

                        <v-toolbar-side-icon>
                            <img alt="App logo" src="../assets/app_logo_t.png" width="90px"/>
                        </v-toolbar-side-icon>

                        <v-toolbar-title>Budget Tracker</v-toolbar-title>

                        <v-spacer></v-spacer>

                        <About/>
                        <div class="mx-3"></div>
                        <v-icon>mdi-email</v-icon>
                        <div class="mx-3"></div>
                        <v-icon>mdi-account</v-icon>

                    </v-toolbar>
                </v-card>
        </div>
</template>

<script>
    import About from "../components/About.vue";

    export default {
        name: "Main",
        components: {
            About
        }
    }
</script>

<style scoped>

</style>