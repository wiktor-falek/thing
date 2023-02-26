<template>
  <HomeView />
  <!-- <Loading /> -->
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import HomeView from './components/HomeView.vue'
import useCurrencyStore from './stores/currencyStore';
const currencyStore = useCurrencyStore()
const loaded = ref(false);

onBeforeMount(async () => {
  // fetch the data
  // and only if the data was fetched render HomeView
  loaded.value = await currencyStore.fetchCurrency()
  currencyStore.currency
})
</script>



