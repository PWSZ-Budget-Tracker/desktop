<template>
    <v-row justify="center">
        <v-dialog v-model="incomeDialog" max-width="800">
            <template v-slot:activator="{ on }">
                <v-btn dark v-on="on" icon color="#9090ee">
                    <v-icon x-large>mdi-cash-multiple</v-icon>
                </v-btn>
            </template>
            <v-data-table
                    :headers="headers"
                    :items="incomes"
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
                        <v-dialog v-model="addIncomeDialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="#9090ee" dark class="mb-2" v-on="on">Nowy przychód</v-btn>
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
                                                        label="Przychody"
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
                                    <v-btn color="blue darken-1" text @click="addIncome()">Zapisz</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-spacer></v-spacer>

                        <Categories toolbarTitle="PRZYCHODY" @clicked="close"/>

                    </v-toolbar>
                </template>

                <template v-slot:item.currency="{ item }">
                    {{ currencies[item.currencyId] }}
                </template>

                <template v-slot:item.action="{ item }">
                    <v-icon
                            small
                            class="mr-2"
                            @click="editIncome(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                            small
                            @click="deleteIncome(item)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
                <template v-slot:no-data>
                    <p class="pt-5">Brak przychodów</p>
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
        name: "Income",
        components: {
            Categories
        },
        data: () => ({
            addIncomeDialog: false,
            incomeDialog: false,
            search: '',
            selectedCategory: '',
            choosedCurrency: '',
            incomeCategories: [],
            disable: false,
            headers: [
                {
                    text: 'Przychody',
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
                return this.editedIndex === -1 ? 'Nowy przychód' : 'Edytuj przychód'
            },
            incomes() {
                return this.$store.getters.getIncomes;
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
            this.$store.dispatch("fetchIncomes", {});
        },

        methods: {
            editIncome(item) {
                this.disable = true
                this.editedIndex = this.incomes.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.addIncomeDialog = true
            },

            deleteIncome(item) {
                const index = this.incomes.indexOf(item)
                if (confirm('Czy jesteś pewien, że chcesz usunąć ten przychód?')) {
                    axios.delete('/api/Income/Delete', {
                        data: {incomeId: item.id}
                    })
                }
                this.incomes.splice(index, 1)
            },

            addIncome () {
                if (this.editedIndex > -1) {
                    Object.assign(this.incomes[this.editedIndex], this.editedItem)
                    axios.put('/api/Income/Edit', {
                        incomeId: this.editedItem.id,
                        amount: parseInt(this.editedItem.amount)
                    })
                        .catch(error => {
                            console.log(error)
                        })
                } else {
                    axios.post('/api/Income/Add', {
                        categoryId: this.selectedCategory,
                        amount: parseInt(this.editedItem.amount),
                        currencyId: Currency.getCurrency(this.choosedCurrency)
                    })
                        .catch(error => {
                            console.log(error)
                        })
                }
                this.$store.dispatch('fetchIncomes')
                this.close()
            },

            close () {
                this.addIncomeDialog = false
                this.disable = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
                this.$store.dispatch('fetchIncomes')
            },
        },
    }
</script>

<style scoped>

</style>