<template>
    <div>
        <apexchart type="donut" width="550" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
    export default {
        name: "ChartExpenses",
        data: function() {
            return {
                series: [120, 240, 350, 410, 60, 610, 70],
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
                        colors: ['#3EB4A7', '#4BAEB2', '#59A8BE', '#67A2CA', '#749CD6', '#8296E2', '#9090EE']
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
                    labels: ["DOM", "TRANSPORT", "ZDROWIE", "SPORT", "JEDZENIE", "WAKACJE", "INNE"],
                    dataLabels: {
                        enabled: true,
                    },
                    responsive: [{
                        breakpoint: 480,
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
                            fillColors: ['#3EB4A7', '#4BAEB2', '#59A8BE', '#67A2CA', '#749CD6', '#8296E2', '#9090ee']
                        }
                    },
                },
            }
        }
    };
</script>

<style scoped>

</style>