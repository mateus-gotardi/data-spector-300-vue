<template>
    <div class="header">
        <h3>Planilha: {{ props.table_data.fileName.split('.')[0] }}</h3>
    </div>
    <div class="container">
        <div class="graph">
            <div class="head">
                <p>MRR ($/tempo)</p>
                <select name="select" @change="selectYear($event.target.value, 'MRR')">
                    <option value="">todo o periodo</option>
                    <option v-for="(year, index) in props.table_data.years" :key="index" :value="year">20{{ year }}
                    </option>
                </select>
            </div>
            <canvas :id="props.table_data.fileName + 'mrr'" width="400" height="400"></canvas>
        </div>
        <div class="graph">
            <div class="head">
                <p>Churn Rate (%/tempo)</p>
                <select name="select" @change="selectYear($event.target.value, 'churn')">
                    <option value="">todo o periodo</option>
                    <option v-for="(year, index) in props.table_data.years" :key="index" :value="year">20{{ year }}
                    </option>
                </select>
            </div>
            <canvas :id="props.table_data.fileName + 'churn'" width="400" height="400"></canvas>
        </div>
        <div class="graph">
            <div class="head">
                <p>Usuarios (qtd/tempo)</p>
                <select name="select" @change="selectYear($event.target.value, 'users')">
                    <option value="">todo o periodo</option>
                    <option v-for="(year, index) in props.table_data.years" :key="index" :value="year">20{{ year }}
                    </option>
                </select>
            </div>
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
let mrrChart
let churnChart
let active_cancel

const selectYear = (year, chart) => {
    let labels = []
    if (year === '') {
        labels = imutableLabels.value
    } else {
        labels = imutableLabels.value.filter(v => v.split('-')[0] == year)
    }
    switch (chart) {
        case "MRR": mrrChart.destroy();
            mountMRRChart(labels)
            break;
        case "churn": churnChart.destroy();
            mountChurnChart(labels)
            break;
        case "users": active_cancel.destroy();
            mountUserChart(labels)
    }

}
const mountMRRChart = (labels) => {
    const datasets = []
    const table_data = props.table_data;
    const interestKeys = ['mrr', 'churn_amount', 'new_clients_amount']
    interestKeys.map(i => {
        let dataset = createDataset(table_data.monthly[i], i, labels)
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
        }
    }
    // eslint-disable-next-line no-unused-vars
    mrrChart = new Chart(
        document.getElementById(props.table_data.fileName + 'mrr'),
        config
    )
}
const mountChurnChart = (labels) => {
    const table_data = props.table_data;

    const churnData = {
        labels: labels,
        datasets: [createDataset(table_data.monthly.churn_rate, 'Churn Rate', labels)]
    }
    const churnConfig = {
        type: 'line',
        data: churnData,
        options: {
            aspectRatio: 16 / 9,
            responsive: true,
        }
    }
    // eslint-disable-next-line no-unused-vars
    churnChart = new Chart(
        document.getElementById(props.table_data.fileName + 'churn'),
        churnConfig
    )
}
const mountUserChart = (labels) => {
    const table_data = props.table_data;
    const userData = {
        labels: labels,
        datasets: [createDataset(table_data.monthly.users_active, 'Usuários ativos', labels),
        createDataset(table_data.monthly.cancels, 'Cancelamentos', labels),
        createDataset(table_data.monthly.user_growth, 'usuários totais', labels),
        createDataset(table_data.monthly.new_clients, 'Novos Usuários', labels)
        ]
    }
    const usersConfig = {
        type: 'line',
        data: userData,
        options: {
            aspectRatio: 16 / 9,
            responsive: true,
        }
    }
    // eslint-disable-next-line no-unused-vars
    active_cancel = new Chart(
        document.getElementById(props.table_data.fileName + 'users'),
        usersConfig
    )

}
const mountCharts = (labels) => {
    mountMRRChart(labels)
    mountChurnChart(labels)
    mountUserChart(labels)
}
onMounted(() => {
    let labels = [...props.table_data.months]
    imutableLabels.value = [...props.table_data.months]
    mountCharts(labels)
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

.head {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 1rem
}

.header {
    display: flex;
    justify-content: center;
    align-items: center;
}

p {
    margin: 0
}
</style>