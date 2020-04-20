<template>
    <v-row justify="center">
        <v-dialog v-model="dialog2" max-width="620">
            <template v-slot:activator="{ on }">
                <v-btn dark v-on="on" icon color="#9090ee">
                    <v-icon x-large>mdi-cash-multiple</v-icon>
                </v-btn>
            </template>
    <v-data-table
            :headers="headers"
            :items="income"
            :search="search"
            sort-by="amount"
            class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>PRZYCHODY</v-toolbar-title>
                <v-divider
                        class="mx-4"
                        inset
                        vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="#9090ee" dark class="mb-2" v-on="on">Nowa kategoria</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.name" label="Przychody"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.amount" label="Kwota"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Anuluj</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Zapisz</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                    small
                    @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "Income",
        data: () => ({
            dialog: false,
            dialog2: false,
            search: '',
            headers: [
                {
                    text: 'Przychody',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Kwota', value: 'amount' },
                { text: 'Akcje', value: 'action', sortable: false },
            ],
            income: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                amount: 0,
            },
            defaultItem: {
                name: '',
                amount: 0,
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nowa kategoria przychodów' : 'Edytuj kategorie'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {
            this.initialize()
        },

        methods: {
            initialize () {
                this.income = [
                    {
                        name: 'PRACA',
                        amount: 1800,
                    },
                    {
                        name: 'STYPENDIUM',
                        amount: 400,
                    },
                    {
                        name: 'URODZINY',
                        amount: 250,
                    },
                    {
                        name: 'INNE',
                        amount: 70,
                    },
                ]
            },

            editItem (item) {
                this.editedIndex = this.income.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.income.indexOf(item)
                confirm('Czy jesteś pewien, że chcesz usunąć tę kategorię?') && this.income.splice(index, 1)
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.income[this.editedIndex], this.editedItem)
                } else {
                    this.income.push(this.editedItem)
                }
                this.close()
            },
        },
    }
</script>

<style scoped>

</style>