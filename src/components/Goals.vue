<template>
    <v-row justify="center">
        <v-dialog v-model="goalsDialog" max-width="750">
            <template v-slot:activator="{ on }">
                <v-btn dark v-on="on" icon color="#9090ee">
                    <v-icon x-large>mdi-bank</v-icon>
                </v-btn>
            </template>
            <v-data-table
                    :headers="headers"
                    :items="goals"
                    :search="search"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>OSZCZĘDNOŚCI</v-toolbar-title>
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
                        <v-dialog v-model="addGoalsDialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="#9090ee" dark class="mb-2" v-on="on" v-on:click="visible = false" @click=activateReset()>Nowy cel</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.name" label="Oszczędności" :disabled="editDisable"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.goalAmount" label="Cel" :disabled="editDisable"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-select v-model="choosedCurrency" :items="currencies" label="Waluta" :disabled="addDisable"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.amount" label="Aktualna kwota" v-if="visible" id="hidden"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Anuluj</v-btn>
                                    <v-btn color="blue darken-1" text @click="addGoal()">Zapisz</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>

                <template v-slot:item.currency="{ item }">
                    {{ currencies[item.currencyId] }}
                </template>

                <template v-slot:item.progress="{ item }">
                        <v-col cols="12" class="mr-0 ml-0 pl-0 pr-0"><v-progress-linear style="min-width: 50px" :value="(item.amount/item.goalAmount)*100" height="25" color="#9090EE" background-color="#c7c7f6"><strong>{{ Math.ceil((item.amount/item.goalAmount)*100) }}%</strong></v-progress-linear></v-col>
                </template>

                <template v-slot:item.action="{ item }">
                    <v-icon
                            small
                            class="mr-2"
                            @click="editGoal(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                            small
                            class="mr-2"
                            @click="deleteGoal(item)"
                    >
                        mdi-delete
                    </v-icon>
                    <v-icon
                            small
                            class="mr-2"
                            @click="addAmount(item)"
                    >
                        mdi-plus
                    </v-icon>
                    <v-icon
                            small
                            class="mr-2"
                            @click="deleteAmount(item)"
                    >
                        mdi-minus
                    </v-icon>
                </template>
                <template v-slot:no-data>
                    <p class="pt-5">Brak celów</p>
                </template>
            </v-data-table>
        </v-dialog>
    </v-row>
</template>

<script>
    import * as Currency from '../helpers/currency';
    import axios from "axios";

    export default {
        name: "Savings",
        data: () => ({
            addGoalsDialog: false,
            goalsDialog: false,
            search: '',
            sortBy: 'amount',
            sortDesc: false,
            addDisable: false,
            editDisable: false,
            visible: true,
            whichButton: 0,
            choosedCurrency: '',
            headers: [
                {
                    text: 'Oszczędności',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Cel', value: 'goalAmount' },
                { text: 'Aktualna kwota', value: 'amount' },
                { text: 'Waluta', value: 'currency.shortName' },
                { text: 'Postęp', value: 'progress' },
                { text: 'Akcje', value: 'action', sortable: false },
            ],
            currencies: ["EUR", "USD", "PLN"],
            editedIndex: -1,
            editedItem: {
                name: '',
                goalAmount: 0,
                amount: 0,
            },
            defaultItem: {
                name: '',
                goalAmount: 0,
                amount: 0,
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nowy cel' : 'Edytuj cel'
            },
            goals() {
                return this.$store.getters.getGoals;
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {
            this.$store.dispatch("fetchGoals", {});
        },

        methods: {
            editGoal(item) {
                this.addDisable = true
                this.editDisable = false
                this.visible = false
                this.editedIndex = this.goals.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.addGoalsDialog = true
                this.whichButton = 2
            },

            deleteGoal(item) {
                const index = this.goals.indexOf(item)
                if (confirm('Czy jesteś pewien, że chcesz usunąć ten cel?')) {
                    axios.delete('/api/Goal/Delete', {
                        data: {goalId: item.id}
                    })
                }
                this.goals.splice(index, 1)
            },

            addGoal() {
                if (this.editedIndex > -1) {
                    Object.assign(this.goals[this.editedIndex], this.editedItem)
                    if (this.whichButton === 2) {
                        alert('2')
                        axios.put('/api/Goal/Edit', {
                            goalId: this.editedItem.id,
                            name: this.editedItem.name,
                            goalAmount: parseInt(this.editedItem.goalAmount)
                        })
                            .catch(error => {
                                console.log(error)
                            })
                            this.whichButton = 0
                    }
                    else if(this.whichButton === 1) {
                        alert('3')
                        axios.put('/api/Goal/AddAmount', {
                            goalId: this.editedItem.id,
                            amount: parseInt(this.editedItem.amount),
                        })
                            .catch(error => {
                                console.log(error)
                            })
                        this.whichButton = 0
                    } else {
                        alert('4')
                        axios.delete('/api/Goal/DeleteAmount', {
                            data: {
                                goalId: this.editedItem.id,
                                amount: parseInt(this.editedItem.amount)
                            }
                        })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                } else {
                    axios.post('/api/Goal/Add', {
                        name: this.editedItem.name,
                        goalAmount: parseInt(this.editedItem.goalAmount),
                        currencyId: Currency.getCurrency(this.choosedCurrency)
                    })
                        .catch(error => {
                            console.log(error)
                        })
                }
                this.$store.dispatch('fetchGoals')
                this.visible = true
                this.addDisable = false
                this.editDisable = false
                this.close()
            },

            addAmount(item) {
                this.editDisable = true
                this.addDisable = true
                this.visible = true
                this.editedIndex = this.goals.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.addGoalsDialog = true
                this.whichButton = 1
            },

            deleteAmount(item) {
                this.editDisable = true
                this.addDisable = true
                this.visible = true
                this.editedIndex = this.goals.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.addGoalsDialog = true
            },

            close () {
                this.addGoalsDialog = false
                this.addDisable = false
                this.editDisable = false
                this.visible = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
                this.$store.dispatch('fetchGoals')
            },

            activateReset() {
                this.addDisable = false
                this.editDisable = false
                this.editedItem.name = ''
                this.editedItem.goalAmount = ''
            },
        },
    }
</script>

<style scoped>

</style>