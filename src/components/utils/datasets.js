export const createDataset = (d, label) => {
    const keys = Object.keys(d); // Obtenha as chaves do objeto
    let data = []
    keys.map(i => {
        const amount = label === 'churn_amount' ? -d[i] : d[i]
        data.push(amount)
    })
    const chartData = {
        label: getLabel(label), data, backgroundColor: getBackgroundColor(label)
    }

    return chartData
}
const getBackgroundColor = (label) => {
    switch (label) {
        case 'mrr': return '#40AE41'
        case 'churn_amount': return '#FF5E6D'
        case 'new_clients_amount': return '#7146A5'
    }
}
const getLabel = (label) => {
    switch (label) {
        case 'mrr': return 'MRR'
        case 'churn_amount': return 'Churn'
        case 'new_clients_amount': return 'Novos Clientes'
        default: return label
    }
}