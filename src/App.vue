<template>
  <main>
    <input v-model="value" @input="isNumber" />

    <span>{{ fromFormatted }} => {{ toFormatted }}</span>
  </main>
</template>

<script>
import { currencyBra, currencyUsd, currencyEur } from "./helpers/index";

export default {
  name: "App",
  data() {
    return {
      value: 0,
      currencyFrom: "0",
      currencyTo: "1",
      options: [
        {
          id: "0",
          label: "BRL",
          fx_rate: {
            USD: 1 / 5.2164,
            EUR: 1 / 6.397,
          },
          formatter: currencyBra,
        },
        {
          id: "1",
          label: "USD",
          fx_rate: {
            BRL: 5.2164,
            EUR: 1 / 1.2206,
          },
          formatter: currencyUsd,
        },
        {
          id: "2",
          label: "EUR",
          fx_rate: {
            USD: 1.2206,
            BRL: 6.397,
          },
          formatter: currencyEur,
        },
      ],
      tax: {
        iof: 0.011,
        fx: 0.01,
      },
    };
  },
  computed: {
    objectFrom() {
      return this.options.find((opt) => opt.id === this.currencyFrom);
    },
    objectTo() {
      return this.options.find((opt) => opt.id === this.currencyTo);
    },
    fromFormatted() {
      return this.objectFrom.formatter(this.value);
    },
    toFormatted() {
      return this.objectTo.formatter(this.convertedValue);
    },
    fxRate() {
      return this.objectFrom.fx_rate[this.objectTo.label];
    },
    fxValue() {
      return parseFloat(this.value) * this.tax.fx;
    },
    iofValue() {
      return parseFloat(this.value) * this.tax.iof;
    },
    convertedValue() {
      const result = (this.value - this.iofValue - this.fxValue) * this.fxRate;
      return result ? result : 0;
    },
  },
  methods: {
    isNumber(event) {
      const notNumberRegex = /[^\d\.]/g;
      const floatingNumberRegex = /(.*\..*)(\.)/g;
      const removeZerosRegex = /^0*/g;
      const decimalRegex = /(.*\..{0,2}).*/g

      if (
        notNumberRegex.test(event.target.value) ||
        floatingNumberRegex.test(event.target.value) ||
        removeZerosRegex.test(event.target.value) ||
        decimalRegex.test(event.target.value)
      ) {
        this.value = this.value
          .replace(notNumberRegex, "")
          .replace(floatingNumberRegex, "$1")
          .replace(removeZerosRegex, "")
          .replace(decimalRegex, "$1");
        event.preventDefault();
      }
    },
  },
};
</script>

<style>
</style>
