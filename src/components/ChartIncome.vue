<template>
    <div>
        <apexchart type="bar" height= "400" width="550" v-bind:options="chartOptions" v-bind:series="series" v-if="incomes.length != 0"></apexchart>
        <h1 class="text-center" v-else>Brak przychodów</h1>
        <div class="d-flex justify-space-around">
            <div class="text-center d-inline pr-8 pl-10 pt-2">
                <v-btn rounded color="#9090ee" @click="updateChart()">Zaktualizuj</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChartIncome",
        data: function () {
            return {
                series: [{
                    data: []
                }],
                chartOptions: {
                    chart: {
                        type: 'bar',
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
                        }
                    },
                    plotOptions: {
                        bar: {
                            barHeight: '100%',
                            distributed: true,
                            horizontal: true,
                            dataLabels: {
                                position: 'bottom'
                            },
                        }
                    },
                    colors: ['#3EB4A7', '#45B1AD', '#4DADB4', '#54AABA', '#5CA7C1', '#63A4C7', '#6BA0CE', '#729DD4', '#7A9ADB', '#8197E1', '#8993E8', '#9090EE', '#3EB4A7', '#9090EE'],
                    dataLabels: {
                        enabled: true,
                        textAnchor: 'start',
                        style: {
                            colors: ['#fff']
                        }
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 400
                            },
                            legend: {
                                show: false
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
                    stroke: {
                        width: 1,
                        colors: ['#fff']
                    },
                    xaxis: {
                        categories: [],
                    },
                    yaxis: {
                        labels: {
                            show: false
                        }
                    },
                    tooltip: {
                        theme: 'dark',
                        x: {
                            show: true
                        },
                        y: {
                            title: {
                                formatter: function () {
                                    return ''
                                }
                            }
                        }
                    }
                }
            }
        },

        computed: {
            incomes() {
                return this.$store.getters.getIncomes
            },
        },

        methods: {
            updateChart() {
                var income = [];
                var names = [];
                for (let i = 0; i < this.incomes.length; i++) {
                    income[i] = this.incomes[i].amount
                    names[i] = this.incomes[i].categoryName + ' (' + this.incomes[i].currency.shortName + ')'
                } 
                for (let i = 0; i < income.length; i++) {
                        this.chartOptions = {...this.chartOptions, ...{
                        xaxis: {
                                categories: names,
                            }
                        }
                    }
                        this.series[0].data.map(() => {
                        return income[i]
                    })
                }
                this.series = [{
                    data: income
                }]
            }
        },
    };
</script>

<style scoped>

</style>