<template>
    <div class="text-center">
        <v-dialog
                v-model="dialog"
                width="500"
        >
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon x-large>mdi-information</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-toolbar color="#9090ee">
                    <v-toolbar-title class="headline lighten-2 white--text">O aplikacji</v-toolbar-title>
                </v-toolbar>

                <v-card-text class="pt-5">
                    <strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</strong>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "About",
        data () {
            return {
                dialog: false,
            }
        },
    }
</script>

<style scoped>

</style>