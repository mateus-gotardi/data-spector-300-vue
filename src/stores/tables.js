import { defineStore } from 'pinia'

export const useTableStore = defineStore('table', {
  state: () => ({
    tables: [],
  }),
  actions: {
    addTable(table) {
      this.tables.push(table);
    },
    removeTable(index) {
      if (index >= 0 && index < this.objects.length) {
        this.tables.splice(index, 1);
      } else {
        console.error('Índice inválido.');
      }
    }
  },
})
