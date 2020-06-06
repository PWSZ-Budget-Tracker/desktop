<template>
    <v-row justify="center">
        <v-dialog v-model="expensesDialog" max-width="800">
            <template v-slot:activator="{ on }">
                <v-btn dark v-on="on" icon color="#9090ee">
                    <v-icon x-large>mdi-wallet</v-icon>
                </v-btn>
            </template>
            <v-data-table
                    :headers="headers"
                    :items="expenses"
                    :search="search"
                    sort-by="amount"
                    class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>WYDATKI</v-toolbar-title>
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
                        <v-dialog v-model="addExpensesDialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="#9090ee" dark class="mb-2" v-on="on">Nowy wydatek</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-select
                                                        v-model="selectedCategory"
                                                        :items="categories"
                                                        item-text="name"
                                                        item-value="id"
                                                        menu-props="auto"
                                                        label="Wydatki"
                                                        :disabled="disable"
                                                ></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.amount" label="Kwota"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-select v-model="choosedCurrency" :items="currencies" label="Waluta" :disabled="disable"></v-select>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Anuluj</v-btn>
                                    <v-btn color="blue darken-1" text @click="addExpenses()">Zapisz</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <Categories toolbarTitle="WYDATKI"/>

                    </v-toolbar>
                </template>

                <template v-slot:item.currency="{ item }">
                    {{ currencies[item.currencyId] }}
                </template>

                <template v-slot:item.action="{ item }">
                    <v-icon
                            small
                            class="mr-2"
                            @click="editExpenses(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                            small
                            @click="deleteExpenses(item)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
                <template v-slot:no-data>
                    <p class="pt-5">Brak wydatków</p>
                </template>
            </v-data-table>
        </v-dialog>
    </v-row>
</template>

<script>
    import * as Currency from '../helpers/currency';
    import Categories from "./Categories";
    import axios from "axios";

    export default {
        name: "Expenses",
        components: {
            Categories
        },
        data: () => ({
            addExpensesDialog: false,
            expensesDialog: false,
            search: '',
            selectedCategory: '',
            choosedCurrency: '',
            disable: false,
            headers: [
                {
                    text: 'Wydatki',
                    align: 'start',
                    sortable: false,
                    value: 'categoryName',
                },
                { text: 'Kwota', value: 'amount' },
                { text: 'Waluta', value: 'currency.shortName' },
                { text: 'Akcje', value: 'action', sortable: false },
            ],
            currencies: ["EUR", "USD", "PLN"],
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
                return this.editedIndex === -1 ? 'Nowy wydatek' : 'Edytuj wydatek'
            },
            expenses() {
                return this.$store.getters.getExpenses;
            },
            categories() {
                return this.$store.getters.getCategories;
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {
            this.$store.dispatch("fetchExpenses", {});
        },

        methods: {
            editExpenses(item) {
                this.disable = true
                this.editedIndex = this.expenses.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.addExpensesDialog = true
            },

            deleteExpenses(item) {
                const index = this.expenses.indexOf(item)
                if (confirm('Czy jesteś pewien, że chcesz usunąć ten wydatek?')) {
                    axios.delete('/api/Expenses/Delete', {
                        data: {expenseId: item.id}
                    })
                }
                this.expenses.splice(index, 1)
            },

            addExpenses() {
                if (this.editedIndex > -1) {
                    Object.assign(this.expenses[this.editedIndex], this.editedItem)
                    axios.put('/api/Expenses/Edit', {
                        expenseId: this.editedItem.id,
                        amount: parseInt(this.editedItem.amount)
                    })
                        .then(
                            this.$store.dispatch('fetchExpenses')
                        )
                        .catch(error => {
                            console.log(error)
                        })
                } else {
                    axios.post('/api/Expenses/Add', {
                        categoryId: this.selectedCategory,
                        amount: parseInt(this.editedItem.amount),
                        currencyId: Currency.getCurrency(this.choosedCurrency)
                    })
                        .then(
                            this.$store.dispatch('fetchExpenses')
                        )
                        .catch(error => {
                            console.log(error)
                        })
                }
                this.close()
            },

            close () {
                this.addExpensesDialog = false
                this.disable = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },
        },
    }
</script>

<style scoped>

</style>