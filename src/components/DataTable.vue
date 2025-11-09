<script setup lang="ts">
interface Column {
  key: string
  label: string
}

interface Props {
  columns: Column[]
  data: Record<string, any>[]
}

defineProps<Props>()
</script>

<template>
  <table class="main_table">
    <thead class="main_table_head">
      <tr class="main_table_head_row">
        <th v-for="column in columns" :key="column.key" class="main_table_head_column">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody class="main_table_body">
      <tr v-for="(row, index) in data" :key="index" class="main_table_body_row">
        <td v-for="column in columns" :key="column.key" class="main_table_body_column">
          {{ row[column.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.main_table {
  border-collapse: collapse;
  font-size: medium;
  text-align: center;
}

.main_table_head_row {
  background-color: var(--color1);
}

.main_table_head_column {
  border: 2px solid var(--main_color2);
  padding: 5px;
}

.main_table_body_column {
  border: 2px solid var(--main_color2);
  padding: 5px;
}

.main_table_body_row:nth-child(even) {
  background-color: var(--color2);
}
</style>