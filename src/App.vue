<script setup lang="ts">
import { ref } from 'vue'

const tasks = ref<string[]>([
  'Задача 1',
  'Задача 2',
  'Задача 3',
])

const userTask = ref<string>('')

const onClick = () => {
  if (userTask.value != '') {
    tasks.value.push(userTask.value);
  }
}
</script>

<template>
  <input v-model="userTask">
  <button @click="onClick">Добавить задачу</button>
  <ul>
    <li v-for="task in tasks" :key="task">
      {{task}}
    </li>
  </ul>
</template>

<style scoped></style> // стили только для вот этой штуки(в этом скоупе)
