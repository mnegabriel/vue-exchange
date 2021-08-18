<template>
  <main class="wrapper">
    <div class="row">
      <h1 class="col-sm-12 text-center text-bold">vue-exchange</h1>
    </div>

    <div class="row">
      <div class="col-sm-12 text-center">
        <MyTable
          :fromTitle="objectFrom.label"
          :toTitle="objectTo.label"
          :fromValue="fromFormatted"
          :toValue="toFormatted"
        />
      </div>
    </div>

    <form class="text-center">
      <label for="amount">Valor</label>
      <input
        type="text"
        id="amount"
        name="amount"
        v-model="value"
        @input="isNumber"
      />

      <div class="row">
        <div class="col-sm-12 col-md-6">
          <fieldset>
            <legend>De:</legend>

            <label v-for="opt in options" :key="opt.id" :for="`from-${opt.id}`">
              <input
                type="radio"
                :id="`from-${opt.id}`"
                :name="`from-${opt.id}`"
                :value="opt.id"
                v-model="currencyFrom"
                @change="setInitialFrom"
              />
              <span> {{ opt.label }} </span>
            </label>
          </fieldset>
        </div>
        <div class="col-sm-12 col-md-6">
          <fieldset>
            <legend>Para:</legend>

            <label
              v-for="opt in optionsMissing"
              :key="opt.id"
              :for="`to-${opt.id}`"
            >
              <input
                type="radio"
                :id="`to-${opt.id}`"
                :name="`to-${opt.id}`"
                :value="opt.id"
                v-model="currencyTo"
              />
              <span> {{ opt.label }} </span>
            </label>
          </fieldset>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import {
  currencyBra,
  currencyUsd,
  currencyEur,
  maskToFloat,
} from "./helpers/index";

import MyTable from "./components/MyTable.vue";

export default {
  name: "App",
  components: {
    MyTable,
  },
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
    optionsMissing() {
      return this.options.filter((opt) => opt.id !== this.currencyFrom);
    },
    objectFrom() {
      return this.options.find((opt) => opt.id === this.currencyFrom);
    },
    objectTo() {
      return this.options.find((opt) => opt.id === this.currencyTo);
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
    fromFormatted() {
      return this.objectFrom.formatter(this.value);
    },
    toFormatted() {
      return this.objectTo.formatter(this.convertedValue);
    },
  },
  methods: {
    setInitialFrom(event) {
      const { value } = event.target;

      const initialToValue = this.options.find((opt) => opt.id !== value);

      if (initialToValue) this.currencyTo = initialToValue.id;
    },
    isNumber(event) {
      const [test, mask] = maskToFloat();

      const { value } = event.target;

      if (test(value)) {
        this.value = mask(value);
        event.preventDefault();
      }
    },
  },
};
</script>

<style>
body,
#app {
  min-height: 100vh;
}

.wrapper {
  width: calc(100% - 20px);
  max-width: 650px;
  margin: 20px auto 0;
}

.wrapper > *:not(:last-child) {
  margin-bottom: 30px;
}

.text-center {
  text-align: center;
}

.text-bold {
  font-weight: bold;
}
</style>
