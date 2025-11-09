<script setup lang="ts">
import { ref } from 'vue'
import DataTable from '@/components/DataTable.vue'

const columns = ref([
  { key: 'category', label: 'Категория' },
  { key: 'date', label: 'Дата вручения' },
  { key: 'amount', label: 'Стоимость гранта' },
])

const data = ref([
  { category: 'Физика', date: '10 декабря 2025 г.', amount: '11 000 000 SEK' },
  { category: 'Химия', date: '10 декабря 2025 г.', amount: '11 000 000 SEK' },
  {
    category: 'Медицина / Физиология',
    date: '10 декабря 2025 г.',
    amount: '11 000 000 SEK',
  },
  { category: 'Литература', date: '10 декабря 2025 г.', amount: '11 000 000 SEK' },
  { category: 'Мир', date: '10 декабря 2025 г.', amount: '9 000 000 SEK' },
])
</script>

<template>
  <div>
    <header class="header">
      <h2 class="header_title">Нобелевские премии</h2>
    </header>
    <main class="main">
      <DataTable :columns="columns" :data="data" />
    </main>
    <footer class="footer">
      <h2 class="footer_title">Примите лабу пожалуйста</h2>
    </footer>
  </div>
</template>

<style scoped>
.header {
  height: 100px;
  display: flex;
  justify-content: center;
  border-top: 2px solid var(--main_color2);
  border-bottom: 2px solid var(--main_color2);
}

.header_title {
  padding-top: 15px;
  padding-bottom: 10px;
}

.main {
  padding-top: 40px;
  display: flex;
  justify-content: center;
  padding-bottom: 250px;
}

.footer {
  background-color: var(--main_color2);
  display: flex;
  justify-content: center;
}

.footer_title {
  color: var(--main_color1);
  font-weight: 100;
}
</style>