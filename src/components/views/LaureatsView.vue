<script setup lang="ts">
import { ref } from 'vue'
import DataTable from '@/components/DataTable.vue'

const columns = ref([
  { key: 'name', label: 'Имя/Название' },
  { key: 'birthdate', label: 'Дата рождения/основания' },
  { key: 'prizes', label: 'Число премий' },
])

const data = ref([
  { name: 'Мари Кюри', birthdate: '7 ноября 1867', prizes: '2' },
  { name: 'Альберт Эйнштейн', birthdate: '14 марта 1879', prizes: '1' },
  { name: 'Мартин Лютер Кинг', birthdate: '15 января 1929', prizes: '1' },
  { name: 'Мальала Юсуфзай', birthdate: '12 июля 1997', prizes: '1' },
  {
    name: 'Организация Объединённых Наций (ООН)',
    birthdate: '24 октября 1945',
    prizes: '1',
  },
  { name: 'Жан-Поль Сартр', birthdate: '21 июня 1905', prizes: '1 (отказался)' },
  { name: 'Международный комитет Красного Креста', birthdate: '1863', prizes: '3' },
])
</script>

<template>
  <div>
    <header class="header">
      <h2 class="header_title">Лауреаты нобелевской премии</h2>
    </header>
    <main class="main">
      <DataTable :columns="columns" :data="data" />
    </main>
    <footer class="footer">
      <h2 class="footer_title">ПОЖАЛУСТААААА!!!!!!</h2>
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