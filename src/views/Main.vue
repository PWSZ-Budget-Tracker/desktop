<template>
    <div class="main">
        <v-container>
            <v-row justify="center" align="center">
                <v-col
                        md="5"
                        class="text-center justify-center"
                >
                    <h1 style="color: #9090ee" class="pb-3">Wydatki</h1>
                    <h3 style="color: #3eb4a7" class="d-inline-flex font-italic">{{getExpensesSum(currencies[0])}} {{currencies[0]}}</h3>
                    <v-divider class="pr-3" vertical></v-divider>
                    <h3 style="color: #3eb4a7" class="d-inline-flex font-italic">{{getExpensesSum(currencies[1])}} {{currencies[1]}}</h3>
                    <v-divider class="pr-3" vertical></v-divider>
                    <h3 style="color: #3eb4a7" class="d-inline-flex font-italic">{{getExpensesSum(currencies[2])}} {{currencies[2]}}</h3>
                </v-col>

                <v-divider
                        vertical
                ></v-divider>

                <v-col
                        class="text-center justify-center"
                        md="5"
                >

                    <ProgressBar/>

                </v-col>
            </v-row>

            <v-divider
                    horizontal
            ></v-divider>

            <v-row justify="center" align="center">
                <v-col
                        md="5"
                >
                    <ChartExpenses/>
                </v-col>

                <v-divider
                        vertical
                ></v-divider>

                <v-col
                        md="5"
                >
                    <ChartIncome/>
                </v-col>
            </v-row>

            <v-divider
                    horizontal
            ></v-divider>

            <v-row justify="center" align="center">
                <v-col
                        class="text-center"
                        md="5"
                >
                    <Calendar/>
                    <p><strong>KALENDARZ</strong></p>

                    <Income/>
                    <p><strong>PRZYCHODY</strong></p>
                </v-col>

                <v-divider
                        vertical
                ></v-divider>

                <v-col
                        class="text-center"
                        md="5"
                >
                    <Goals/>
                    <p><strong>OSZCZĘDNOŚCI</strong></p>

                    <Expenses/>
                    <p><strong>WYDATKI</strong></p>
                </v-col>

            </v-row>
        </v-container>
    </div>
</template>

<script>
    import ChartExpenses from "../components/ChartExpenses.vue";
    import ChartIncome from "../components/ChartIncome.vue";
    import ProgressBar from "../components/ProgressBar.vue";
    import Income from "../components/Income.vue";
    import Expenses from "../components/Expenses.vue";
    import Goals from "../components/Goals.vue";
    import Calendar from "../components/Calendar.vue";

    export default {
        name: "Main",
        components: {
            ChartExpenses, ChartIncome, ProgressBar, Income, Expenses, Goals, Calendar
        },
        data() {
            return {
                currencies: ["EUR", "USD", "PLN"],
            }
        },

        computed: {
            incomes() {
                return this.$store.getters.getIncomes
            },
            expenses() {
                return this.$store.getters.getExpenses
            }
        },
        
        methods: {
            getExpensesSum(currencies) {
                let total = 0;
                for (let i = 0; i < this.expenses.length; i++) {
                    if (this.expenses[i].currency.shortName === currencies) {
                        total += this.expenses[i].amount
                    }
                }
                return total;
            }
        }
    }
</script>

<style scoped>

</style>