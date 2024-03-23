<template>
    <div class="container">
        <div class="header">
            <p>{{ props.table_data.fileName.split('.')[0] }}</p>
            <select name="select" @change="selectYear($event.target.value)">
                <option value="">todo o periodo</option>
                <option v-for="(year, index) in props.table_data.years" :key="index" :value="year">20{{ year }}</option>
            </select>
        </div>
        <div class="graph">
            <canvas :id="props.table_data.fileName + 'mrr'" width="400" height="400"></canvas>
        </div>
        <div class="graph">
            <canvas :id="props.table_data.fileName + 'churn'" width="400" height="400"></canvas>
        </div>
        <div class="graph">
            <canvas :id="props.table_data.fileName + 'users'" width="400" height="400"></canvas>
        </div>
    </div>
</template>

<script setup>
import Chart from 'chart.js/auto'
import { onMounted, ref } from 'vue';
import { createDataset } from './utils/datasets';

const props = defineProps({
    table_data: {
        type: Object,
        required: true
    }
});
const imutableLabels = ref([])
const labels = ref([])
let mrrChart
let churnChart
let active_cancel
const selectYear = (year) => {
    if (year === '') {
        labels.value = imutableLabels.value
    } else {
        const lbl = imutableLabels.value
        labels.value = lbl.filter(v => v.split('-')[0] == year)
    }
    mrrChart.destroy();
    churnChart.destroy();
    active_cancel.destroy();

    mountCharts();

}
const mountCharts = () => {
    const datasets = []
    const table_data = props.table_data;
    const interestKeys = ['mrr', 'churn_amount', 'new_clients_amount']

    interestKeys.map(i => {
        let dataset = createDataset(table_data.monthly[i], i, labels.value)
        datasets.push(dataset)
    })

    const data = {
        labels: labels.value,
        datasets: datasets
    }
    const config = {
        type: 'line',
        data: data,
        options: {
            aspectRatio: 16 / 9,
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'MRR ($/tempo)'
                }
            }
        }
    }
    const churnData = {
        labels: labels.value,
        datasets: [createDataset(table_data.monthly.churn_rate, 'Churn Rate', labels.value)]
    }
    const churnConfig = {
        type: 'line',
        data: churnData,
        options: {
            aspectRatio: 16 / 9,
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Churn Rate (%)'
                }
            }
        }
    }
    const userData = {
        labels: labels.value,
        datasets: [createDataset(table_data.monthly.users_active, 'Usuários ativos', labels.value),
        createDataset(table_data.monthly.cancels, 'Cancelamentos', labels.value),
        createDataset(table_data.monthly.user_growth, 'usuários totais', labels.value),
        createDataset(table_data.monthly.new_clients, 'Novos Usuários', labels.value)
        ]
    }
    const usersConfig = {
        type: 'line',
        data: userData,
        options: {
            aspectRatio: 16 / 9,
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Número de usuários/tempo'
                }
            }
        }
    }
    // eslint-disable-next-line no-unused-vars
    mrrChart = new Chart(
        document.getElementById(props.table_data.fileName + 'mrr'),
        config
    )
    // eslint-disable-next-line no-unused-vars
    churnChart = new Chart(
        document.getElementById(props.table_data.fileName + 'churn'),
        churnConfig
    )
    // eslint-disable-next-line no-unused-vars
    active_cancel = new Chart(
        document.getElementById(props.table_data.fileName + 'users'),
        usersConfig
    )
}
onMounted(() => {
    labels.value = [...props.table_data.months]
    imutableLabels.value = [...props.table_data.months]
    mountCharts()
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
    width: 90%;
    margin-bottom: 1rem;
}

.header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem
}

p {
    margin: 0
}
</style>