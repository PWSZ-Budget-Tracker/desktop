<template>
    <div class="progress-bar">
        <v-progress-linear value="75" height="20" color="#9090EE" background-color="#c7c7f6"></v-progress-linear>
    </div>
</template>

<script>
    export default {
        name: "ProgressBar"
    }
</script>

<style scoped>
    .progress-bar {
        width: 300px;
        padding-top: 15px;
        padding-bottom: 15px;
    }
</style>