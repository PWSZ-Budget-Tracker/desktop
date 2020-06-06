<template>
    <div>
        <apexchart type="donut" width="550" v-bind:options="chartOptions" v-bind:series="series" v-if="expenses.length != 0"></apexchart>
        <h1 class="text-center" v-else>Brak wydatków</h1>
        <div class="d-flex justify-center text-center">
            <v-btn rounded color="#9090ee" @click="updateChart()">Zaktualizuj</v-btn>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChartExpenses",
        data: function() {
            return {
                series: [{
                    data: []
                }],
                chartOptions: {
                    chart: {
                        toolbar: {
                            show: true,
                            offsetX: 0,
                            offsetY: 0,
                            tools: {
                                download: true,
                                selection: true,
                                zoom: true,
                                zoomin: true,
                                zoomout: true,
                                pan: true,
                                customIcons: []
                            },
                            autoSelected: 'zoom'
                        },
                    },
                    fill: {
                        colors: ['#3EB4A7', '#45B1AD', '#4DADB4', '#54AABA', '#5CA7C1', '#63A4C7', '#6BA0CE', '#729DD4', '#7A9ADB', '#8197E1', '#8993E8', '#9090EE', '#3EB4A7', '#9090EE']
                    },
                    theme: {
                        palette: 'palette10',
                    },
                    plotOptions: {
                        pie: {
                            donut: {
                                labels: {
                                    show: true,
                                }
                            }
                        }
                    },
                    labels: [],
                    dataLabels: {
                        enabled: true,
                    },
                    responsive: [{
                        breakpoint: 1265,
                        options: {
                            chart: {
                                width: 450
                            },
                            legend: {
                                show: true
                            }
                        }
                    },
                    {
                        breakpoint: 960,
                        options: {
                            chart: {
                                width: 500
                            },
                            legend: {
                                show: true
                            }
                        }
                    },
                    {
                        breakpoint: 300,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                show: false
                            }
                        }
                    }],
                    legend: {
                        position: 'bottom',
                        offsetY: 0,
                        height: 100,
                        markers: {
                            fillColors: ['#3EB4A7', '#45B1AD', '#4DADB4', '#54AABA', '#5CA7C1', '#63A4C7', '#6BA0CE', '#729DD4', '#7A9ADB', '#8197E1', '#8993E8', '#9090EE', '#3EB4A7', '#9090EE']
                        }
                    },
                },
            }
        },

        computed: {
            expenses() {
                return this.$store.getters.getExpenses
            }
        },

        methods: {
            updateChart() {
                var expenses = [];
                var categories = [];
                for (let i = 0; i < this.expenses.length; i++) {
                    expenses[i] = this.expenses[i].amount
                    categories[i] = this.expenses[i].categoryName + ' (' + this.expenses[i].currency.shortName + ')'
                } 
                for (let i = 0; i < expenses.length; i++) {
                    this.series[i] = expenses[i]
                    this.chartOptions = {
                        labels: categories
                    }
                }
            }
        }
    };
</script>

<style scoped>

</style>