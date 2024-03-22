<template>
    <div class="container">
        <div class="graph">
            <canvas :id="props.table_data.fileName + 'churn'" width="400" height="400"></canvas>
        </div>
        <div class="graph">
            <canvas :id="props.table_data.fileName" width="400" height="400"></canvas>
        </div>
    </div>
</template>

<script setup>
import Chart from 'chart.js/auto'
import { onMounted } from 'vue';
import { createDataset } from './utils/datasets';

const props = defineProps({
    table_data: {
        type: Object,
        required: true
    }
});

onMounted(() => {
    const datasets = []
    const table_data = props.table_data;
    const labels = Object.keys(table_data.monthly.mrr)
    const interestKeys = ['mrr', 'churn_amount', 'new_clients_amount']
    interestKeys.map(i => {
        let dataset = createDataset(table_data.monthly[i], i)
        datasets.push(dataset)
    })
    const data = {
        labels: labels,
        datasets: datasets
    }
    const config = {
        type: 'bar',
        data: data,
        options: {
            aspectRatio: 4 / 3,
        }
    }
    const churnData = {
        labels: labels,
        datasets: [createDataset(table_data.monthly.churn_rate, 'Churn Rate')]
    }
    const churnConfig = {
        type: 'line',
        data: churnData,
        options: {
            aspectRatio: 4 / 3,
        }
    }
    console.log(config)
    // eslint-disable-next-line no-unused-vars
    const mrrChart = new Chart(
        document.getElementById(props.table_data.fileName + 'churn'),
        config
    )
    // eslint-disable-next-line no-unused-vars
    const churnChart = new Chart(
        document.getElementById(props.table_data.fileName),
        churnConfig
    )
})

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.graph {
    width: 100%;
}
</style>