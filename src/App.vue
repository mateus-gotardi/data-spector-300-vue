<script>
import FileUploader from './components/FileUploader.vue';
import Box from './components/Box.vue';
import { useTableStore } from './stores/tables';
import { createDataset } from './components/utils/datasets'
import Chart from './components/ChartComponent.vue';

export default {
  components: {
    Box, FileUploader, Chart
  },
  setup() {
    const store = useTableStore()
    const tables = store.tables
    const removeTable = (index) => {
      store.removeTable(index);
    };

    return { tables, removeTable, createDataset };
  }
};

</script>

<template>
  <header>
    <img class="logo-img" src='./assets/logo.png' />
    <span class="logo-text">DATA SPECTOR</span>
  </header>

  <main>
    <Box>
      <h2>Envie Suas Planilhas</h2>
      <div class="uploader">
        <FileUploader />
      </div>
    </Box>
    <Box v-for="(table, index) in tables" :key="index">
      <Chart :table_data="table">
      </Chart>
    </Box>
  </main>
</template>

<style scoped>
header {
  background-color: var(--ascents);
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: .3rem;
}

main {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 1rem;
  gap: 1rem;
}

.uploader {
  max-width: 1100px;
  width: 100%;
  padding: 1rem
}

.logo-text {
  font-size: 10px;
}

.logo-img {
  height: 1rem
}
</style>
