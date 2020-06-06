<template>
    <div>
        <v-row class="d-flex justify-center pb-3">
					<v-btn outlined rounded class="mr-2" style="color: #3eb4a7" v-for="(currency, index) in currencies" :key="index" @click="choosedCurrency = index" >
						{{ currency }}
					</v-btn>
		</v-row>
        <h2>Budżet na miesiąc: <span style="color: #9090ee">{{ new Date().toLocaleString('default', {month: 'long'}) }}</span></h2>
        <div class="progress-bar">
            <v-progress-linear :value = "value" height="20" color="#9090EE" background-color="#c7c7f6"></v-progress-linear>
        </div>
        <h2 class="d-inline text-center pt-4">Pozostało: </h2>
        <h2 class="d-inline text-center pt-4" style="color: #9090ee">{{getBudget(currencies[choosedCurrency])}} {{currencies[choosedCurrency]}}</h2>
    </div>
</template>

<script>
    export default {
        name: "ProgressBar",
        data() {
            return {
                currencies: ["EUR", "USD", "PLN"],
                choosedCurrency: ''
            }
        },
        computed: {
            value() {
                return 100 - (this.getBudget(this.currencies[this.choosedCurrency]) / this.getIncomesSum(this.currencies[this.choosedCurrency])) * 100
            },
            incomes() {
                return this.$store.getters.getIncomes
            },
            expenses() {
                return this.$store.getters.getExpenses
            },
            notifications() {
                return this.$store.getters.getNotifications
            }
        }, 
        watch: {
            value() {
                this.setNotifications()
            }
        },
        methods: {
            getExpensesSum(currency) {
                let total = 0;
                for (let i = 0; i < this.expenses.length; i++) {
                    if (this.expenses[i].currency.shortName === currency) {
                        total += this.expenses[i].amount
                    }
                }
                return total;
            },
            getIncomesSum(currency) {
                let total = 0;
                for (let i = 0; i < this.incomes.length; i++) {
                    if (this.incomes[i].currency.shortName === currency) {
                        total += this.incomes[i].amount
                    }
                }
                return total;
            },
            getBudget(currency) {
                return this.getIncomesSum(currency) - this.getExpensesSum(currency)
            },
            setAlertNotifications(currency) {
                if (currency === "PLN") {
                    this.notifications.budgetPLN = "Twój budżet (PLN) kończy się!"
                }
                else if (currency === "USD") {
                    this.notifications.budgetUSD = "Twój budżet (USD) kończy się!"
                }
                else {
                    this.notifications.budgetEUR = "Twój budżet (EUR) kończy się!"
                }
            },
            setFinalNotifications(currency) {
                if (currency === "PLN") {
                    this.notifications.budgetPLN = "Twój budżet (PLN) skończył się!"
                }
                else if (currency === "USD") {
                    this.notifications.budgetUSD = "Twój budżet (USD) skończył się!"
                }
                else {
                    this.notifications.budgetEUR = "Twój budżet (EUR) skończył się!"
                }
            },
            setNotificationsToNull(currency) {
                if (currency === "PLN") {
                    this.notifications.budgetPLN = null
                }
                else if (currency === "USD") {
                    this.notifications.budgetUSD = null
                }
                else {
                    this.notifications.budgetEUR = null
                }
            },
            setNotifications() {
                if (this.choosedCurrency === 0) {
                    this.currency = "EUR"
                }
                else if (this.choosedCurrency === 1) {
                    this.currency = "USD"
                }
                else {
                    this.currency = "PLN"
                }
                
                if (this.value >= 80) {
                    this.setAlertNotifications(this.currency)
                }
                else {
                    this.setNotificationsToNull(this.currency)
                }
                if (this.value >= 100) {
                    this.setFinalNotifications(this.currency)
                }
                this.$store.commit("setNotifications", this.notifications)
            },
        },
        created() {
            this.setNotifications();
        }
    }
</script>

<style scoped>
    .progress-bar {
        width: 450px;
        padding-top: 15px;
        padding-bottom: 15px;
        padding-left: 15px;
    }
</style>