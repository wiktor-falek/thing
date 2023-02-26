import { defineStore } from "pinia";
import { ref, Ref } from "vue";

const useCurrencyStore = defineStore("currency", () => {
  const currency: Ref<null | any> = ref(null);

  const fetchCurrency = async (): Promise<boolean> => {
    const resource = `http://localhost:3000/currency`
    const response = await fetch(resource, { method: "GET" });
    if (response.ok) {
      const data = await response.json();
      currency.value = data
      return true;
    }
    return false;
  }

  return {
    currency,
    fetchCurrency
  };
});

export default useCurrencyStore;