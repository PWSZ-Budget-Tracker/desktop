<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" max-width="1200">
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
                                @click="$refs.calendar.prev()"
                        >
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                            <v-toolbar-title>{{title}}</v-toolbar-title>
                        <v-btn
                                icon
                                class="ma-2"
                                @click="$refs.calendar.next()"
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
                                :now="today"
                                :events="events"
                                :event-color="getEventColor"
                                :interval-count = 0
                                @change="getEvents"
                                @click:more="viewDay"
                                @click:date="viewDay"
                        ></v-calendar>
                    </v-sheet>
                </div>
            </template>

        </v-dialog>

        <v-dialog v-model="showModal" scrollable max-width="250">
            <v-card class="daily">
                <div v-for="name in names" v-bind:key="name">
                    <div v-if="dates[names.indexOf(name)] === focus">
                        <p class="mt-4">{{ combine(names.indexOf(name)) }}</p>
                        <v-divider
                                horizontal
                        ></v-divider>
                    </div>
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
            dialog: false,
            showModal: false,
            selectedElement: null,
            selectedOpen: false,
            start: null,
            merged: '',
            weekday: [1, 2, 3, 4, 5, 6, 0],
            events: [],
            colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1', 'red'],
            names: ['PRACA', 'STYPENDIUM', 'URODZINY', 'DOM', 'TRANSPORT', 'ZDROWIE', 'SPORT', 'JEDZENIE'],
            dates: ['2020-04-01', '2020-04-02', '2020-04-21', '2020-04-02', '2020-04-02', '2020-04-02', '2020-04-21', '2020-04-23'],
            amounts: ['2000zł', '500zł', '200zł', '800zł', '250zł', '80zł', '100zł', '340zł'],
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
        },
        methods: {
            getEvents ({start}) {
                const events = []

                new Date(`${start.date}T00:00:00`)

                const eventCount = 8;

                for (let i = 0; i < eventCount; i++) {
                    events.push({
                        name: this.names[i] + " - " + this.amounts[i],
                        start: this.dates[i],
                        color: this.colors[i],
                    })
                }
                this.events = events
                this.start = start
            },
            getEventColor (event) {
                return event.color
            },
            setToday () {
                this.focus = this.today
            },
            viewDay ({ date }) {
                this.focus = date
                this.showModal = true
            },
            combine (i) {
                 return this.merged = this.names[i] + ' - ' + this.amounts[i];
            }
        },
    }
</script>

<style scoped>
    .daily {
    text-align: center;
    padding-top: 10px;
    font-weight: bold;
    color: #9090ee;
    }
</style>