<script setup lang="ts">
import { computed } from 'vue'

interface Column {
  key: string
  label: string
}

interface Props {
  columns: Column[]
  data: Record<string, any>[]
  currentPage?: number
  pageSize?: number
  total?: number
  loading?: boolean
}

interface Emits {
  (e: 'page-change', page: number): void
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  pageSize: 10,
  total: 0,
  loading: false
})

const emit = defineEmits<Emits>()

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('page-change', page)
  }
}
</script>

<template>
  <div class="table_container">
    <div v-if="loading" class="loading">Загрузка...</div>
    
    <table v-else class="main_table">
      <thead class="main_table_head">
        <tr class="main_table_head_row">
          <th v-for="column in columns" :key="column.key" class="main_table_head_column">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="main_table_body">
        <tr v-if="data.length === 0">
          <td :colspan="columns.length" class="empty_message">Нет данных</td>
        </tr>
        <tr v-for="(row, index) in data" :key="index" class="main_table_body_row">
          <td v-for="column in columns" :key="column.key" class="main_table_body_column">
            {{ row[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="total > pageSize" class="pagination">
      <button 
        class="pagination_button" 
        :disabled="currentPage === 1"
        @click="handlePageChange(currentPage - 1)"
      >
        ←
      </button>
      
      <span class="pagination_info">
        Страница {{ currentPage }} из {{ totalPages }} (Всего: {{ total }})
      </span>
      
      <button 
        class="pagination_button" 
        :disabled="currentPage === totalPages"
        @click="handlePageChange(currentPage + 1)"
      >
        →
      </button>
    </div>
  </div>
</template>

<style scoped>
.table_container {
  width: 100%;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.main_table {
  width: 100%;
  border-collapse: collapse;
  font-size: medium;
  text-align: center;
}

.main_table_head_row {
  background-color: var(--color1);
}

.main_table_head_column {
  border: 2px solid var(--main_color2);
  padding: 10px;
}

.main_table_body_column {
  border: 2px solid var(--main_color2);
  padding: 8px;
}

.main_table_body_row:nth-child(even) {
  background-color: var(--color2);
}

.empty_message {
  text-align: center;
  padding: 40px;
  font-style: italic;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  padding: 20px;
}

.pagination_button {
  background-color: var(--main_color2);
  color: var(--main_color1);
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 4px;
  transition: opacity 0.2s;
}

.pagination_button:hover:not(:disabled) {
  opacity: 0.8;
}

.pagination_button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.pagination_info {
  font-size: 16px;
}
</style>