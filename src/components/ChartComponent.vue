<template>
    <div class="container">
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
        labels: labels,
        datasets: [createDataset(table_data.monthly.churn_rate, 'Churn Rate')]
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
        labels: labels,
        datasets: [createDataset(table_data.monthly.users_active, 'Usuários ativos'),
        createDataset(table_data.monthly.cancels, 'Cancelamentos'),
        createDataset(table_data.monthly.user_growth, 'usuários totais'),
        createDataset(table_data.monthly.new_clients, 'Novos Usuários')
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
    console.log(config)
    // eslint-disable-next-line no-unused-vars
    const mrrChart = new Chart(
        document.getElementById(props.table_data.fileName + 'mrr'),
        config
    )
    // eslint-disable-next-line no-unused-vars
    const churnChart = new Chart(
        document.getElementById(props.table_data.fileName + 'churn'),
        churnConfig
    )
    // eslint-disable-next-line no-unused-vars
    const active_cancel = new Chart(
        document.getElementById(props.table_data.fileName + 'users'),
        usersConfig
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
    width: 90%;
    margin-bottom: 1rem;
}
</style>