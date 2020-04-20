<template>
    <div class="main">
        <v-container>
            <v-row justify="center" align="center">
                <v-col
                        md="5"
                        class="text-center justify-center"
                >
                    <h1>Wydatki</h1>
                    <h1>1700 zł</h1>
                </v-col>

                <v-divider
                        vertical
                ></v-divider>

                <v-col
                        class="text-center justify-center"
                        md="5"
                >
                    <h2>Budżet na miesiąc: {{ new Date().toLocaleString('default', {month: 'long'}) }}</h2>

                    <ProgressBar/>

                    <h2 class="d-inline text-center">Pozostało: </h2>
                    <h2 class="d-inline text-center">150zł</h2>
                </v-col>
            </v-row>

            <v-divider
                    horizontal
            ></v-divider>

            <v-row justify="center" align="center">
                <v-col
                        class="justify-center"
                        md="5"
                >
                    <ChartExpenses/>
                </v-col>

                <v-divider
                        vertical
                ></v-divider>

                <v-col
                        class="text-center"
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
                    <v-btn icon color="#9090ee">
                        <v-icon x-large>mdi-calendar-today</v-icon>
                    </v-btn>
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
                    <Savings/>
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
    import Savings from "../components/Savings.vue";

    export default {
        name: "Main",
        components: {
            ChartExpenses, ChartIncome, ProgressBar, Income, Expenses, Savings
        }
    }
</script>

<style scoped>

</style>