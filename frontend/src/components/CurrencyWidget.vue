<template>
  <div class="currency-widget">
    {{ currencyStore.currency }}
  </div>
</template>

<script setup lang="ts">
import useCurrencyStore from "../stores/currencyStore";
const currencyStore = useCurrencyStore();
</script>
