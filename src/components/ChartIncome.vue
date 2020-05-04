<template>
    <div>
        <apexchart type="bar" height= "400" width="550" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
    export default {
        name: "ChartIncome",
        data: function () {
            return {
                series: [{
                    data: [1800, 400, 250, 70]
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
                    colors: ['#3EB4A7', '#4BAEB2', '#8296E2', '#9090ee'
                    ],
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
                        categories: ['PRACA', 'STYPENDIUM', 'URODZINY', 'INNE'],
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
        }
    };
</script>

<style scoped>

</style>