<template>
    <v-row justify="center">
        <v-dialog v-model="calendarDialog" max-width="1200">
            <template v-slot:activator="{ on }">
                <v-btn dark v-on="on" icon color="#9090ee">
                    <v-icon x-large>mdi-calendar-today</v-icon>
                </v-btn>
            </template>

            <template>
                <div>
                    <v-sheet
                            tile
                            height="64"
                            color="grey lighten-3"
                            class="d-flex"
                    >
                        <v-toolbar flat color="white">
                        <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                            Today
                        </v-btn>
                        <v-btn
                                icon
                                class="ma-2"
                                @click.native="$refs.calendar.prev()"
                        >
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                            <v-toolbar-title>{{title}}</v-toolbar-title>
                        <v-btn
                                icon
                                class="ma-2"
                                @click.native="$refs.calendar.next()"
                        >
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                        </v-toolbar>
                    </v-sheet>
                    <v-sheet height="600">
                        <v-calendar
                                ref="calendar"
                                v-model="focus"
                                :weekdays="weekday"
                                type="month"
                                color="#3EB4A7"
                                :events="getEvents"
                                :event-color="getEventColor"
                                :interval-count = 0
                                @change="updateRange"
                                @click:more="viewDay"
                                @click:date="viewDay"
                        ></v-calendar>
                    </v-sheet>
                </div>
            </template>

        </v-dialog>

        <v-dialog v-model="dailyModal" scrollable max-width="250">
            <v-card class="daily">
                <div class="dailyExpense">
                    <h1>WYDATKI</h1>
                    <v-divider
                                horizontal
                    ></v-divider>
                    <span v-for="value in combineExpenses()" v-bind:key="value">
                        <p class="mt-4">{{ value }}</p>
                        <v-divider
                                horizontal
                        ></v-divider>
                    </span>
                </div>
                <div class="dailyIncome">
                    <h1>PRZYCHODY</h1>
                    <v-divider
                                horizontal
                    ></v-divider>
                    <span v-for="value in combineIncomes()" v-bind:key="value">
                        <p class="mt-4">{{ value }}</p>
                        <v-divider
                                horizontal
                        ></v-divider>
                    </span>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "Calendar",
        data: () => ({
            type: 'month',
            focus: '',
            calendarDialog: false,
            dailyModal: false,
            selectedElement: null,
            selectedOpen: false,
            start: null,
            merged: '',
            weekday: [1, 2, 3, 4, 5, 6, 0],
            events: [],
        }),
        computed: {
            title () {
                const { start } = this
                if (!start) {
                    return ''
                }
                const startMonth = this.monthFormatter(start)
                const startYear = start.year
                return `${startMonth} ${startYear}`
            },
            monthFormatter () {
                return this.$refs.calendar.getFormatter({
                    timeZone: 'UTC', month: 'long',
                })
            },
            incomes() {
                return this.$store.getters.getIncomes;
            },
            expenses() {
                return this.$store.getters.getExpenses;
            },
            getEvents() {
                const events = []
                for (let i = 0; i < this.incomes.length; i++) {
                    events.push({
                        name: this.incomes[i].categoryName + " - " + this.incomes[i].amount + "(" + this.incomes[i].currency.shortName + ")",
                        start: this.incomes[i].timeStamp.slice(0,10),
                        color: "#9090ee",
                    })
                }
                for (let i = 0; i < this.expenses.length; i++) {
                    events.push({
                        name: this.expenses[i].categoryName + " - " + this.expenses[i].amount + "(" + this.expenses[i].currency.shortName + ")",
                        start: this.expenses[i].timeStamp.slice(0,10),
                        color: "#3eb4a7",
                    })
                }
                return events;
            }
        },
        methods: {
            getEventColor (events) {
                return events.color
            },
            setToday () {
                this.focus = this.today
            },
            updateRange({start,end}){
                this.start = start;
                this.end = end;
            },
            viewDay ({ date }) {
                this.focus = date
                this.dailyModal = true
            },
            combineExpenses () {
                const merged = [];
                let index = 0;
                for(let i = 0; i < this.expenses.length; i++) {
                    if(this.expenses[i].timeStamp.slice(0,10) === this.focus)
                    {
                        merged[index] = this.expenses[i].categoryName + " - " + this.expenses[i].amount + " (" + this.expenses[i].currency.shortName + ")"
                        index++;
                    }
                }
                return merged
            },
            combineIncomes () {
                const merged = [];
                let index = 0;
                for(let i = 0; i < this.incomes.length; i++) {
                    if(this.incomes[i].timeStamp.slice(0,10) === this.focus)
                    {
                        merged[index] = this.incomes[i].categoryName + " - " + this.incomes[i].amount + " (" + this.incomes[i].currency.shortName + ")"
                        index++;
                    }
                }
                return merged
            }
        },
    }
</script>

<style scoped>
    .daily {
    text-align: center;
    padding-top: 10px;
    font-weight: bold;
    }
    .dailyIncome {
    color: #9090ee;
    }
    .dailyExpense {
    color: #3eb4a7;
    }
</style>