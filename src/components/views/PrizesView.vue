<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import DataTable from '@/components/DataTable.vue'
import NobelService from '@/services/NobelService'
import type { NobelPrize } from '@/types/nobel'

const columns = ref([
  { key: 'year', label: 'Год' },
  { key: 'category', label: 'Категория' },
  { key: 'dateAwarded', label: 'Дата вручения' },
  { key: 'amount', label: 'Стоимость гранта (SEK)' },
  { key: 'laureatesCount', label: 'Количество лауреатов' },
])

const prizes = ref<NobelPrize[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const selectedYear = ref('')
const selectedCategory = ref('')

const categories = [
  { value: '', label: 'Все категории' },
  { value: 'phy', label: 'Физика' },
  { value: 'che', label: 'Химия' },
  { value: 'med', label: 'Медицина' },
  { value: 'lit', label: 'Литература' },
  { value: 'pea', label: 'Мир' },
  { value: 'eco', label: 'Экономика' },
]

const tableData = computed(() => {
  return prizes.value.map((prize) => ({
    year: prize.awardYear,
    category: prize.category.en,
    dateAwarded: prize.dateAwarded || 'Не указано',
    amount: prize.prizeAmount.toLocaleString(),
    laureatesCount: prize.laureates?.length || 0,
  }))
})

const fetchPrizes = async () => {
  loading.value = true
  try {
    const offset = (currentPage.value - 1) * pageSize.value
    const params: any = {
      offset,
      limit: pageSize.value,
    }

    if (selectedYear.value) {
      params.nobelPrizeYear = selectedYear.value
    }

    if (selectedCategory.value) {
      params.nobelPrizeCategory = selectedCategory.value
    }

    const response = await NobelService.getNobelPrizes(params)
    prizes.value = response.nobelPrizes
    
    total.value = offset + response.nobelPrizes.length + (response.nobelPrizes.length === pageSize.value ? pageSize.value : 0)
  } catch (error) {
    console.error('Ошибка загрузки премий:', error)
    prizes.value = []
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchPrizes()
}

const handleFilterChange = () => {
  currentPage.value = 1
  fetchPrizes()
}

onMounted(() => {
  fetchPrizes()
})
</script>

<template>
  <div>
    <header class="header">
      <h2 class="header_title">Нобелевские премии</h2>
    </header>
    
    <div class="filters">
      <div class="filter_group">
        <label for="year">Год:</label>
        <input
          id="year"
          v-model="selectedYear"
          type="number"
          min="1901"
          :max="new Date().getFullYear()"
          placeholder="Введите год"
          class="filter_input"
          @change="handleFilterChange"
        />
      </div>

      <div class="filter_group">
        <label for="category">Категория:</label>
        <select
          id="category"
          v-model="selectedCategory"
          class="filter_select"
          @change="handleFilterChange"
        >
          <option v-for="cat in categories" :key="cat.value" :value="cat.value">
            {{ cat.label }}
          </option>
        </select>
      </div>

      <button class="reset_button" @click="selectedYear = ''; selectedCategory = ''; handleFilterChange()">
        Сбросить фильтры
      </button>
    </div>

    <main class="main">
      <DataTable
        :columns="columns"
        :data="tableData"
        :loading="loading"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @page-change="handlePageChange"
      />
    </main>
    
    <footer class="footer">
      <h2 class="footer_title">Данные получены из Nobel Prize API</h2>
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

.filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 30px;
  flex-wrap: wrap;
}

.filter_group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filter_group label {
  font-size: 14px;
}

.filter_input,
.filter_select {
  padding: 8px 12px;
  border: 1px solid var(--main_color2);
  background-color: var(--main_color1);
  color: var(--main_color2);
  border-radius: 4px;
  font-size: 14px;
}

.reset_button {
  padding: 8px 16px;
  background-color: var(--color1);
  color: var(--main_color2);
  border: 1px solid var(--main_color2);
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.reset_button:hover {
  background-color: var(--main_color2);
  color: var(--main_color1);
}

.main {
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  min-height: 400px;
}

.footer {
  background-color: var(--main_color2);
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.footer_title {
  color: var(--main_color1);
  font-weight: 100;
  padding: 20px;
}
</style>