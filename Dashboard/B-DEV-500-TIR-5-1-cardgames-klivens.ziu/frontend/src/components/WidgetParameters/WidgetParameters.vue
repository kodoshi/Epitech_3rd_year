<template>
  <div v-if="this.opened" class="parameters">
    <div
      v-for="(param, index) in params"
      v-bind:key="index"
      class="parameter-input"
    >
      {{ param.description }}
      <div v-if="param.type === 'number'">
        <InputInteger
          :name="param.name"
          :change="change"
          :defaultParam="
            defaultParam[param.name] ? defaultParam[param.name] : param.default
          "
          :min="param.min"
          :max="param.max"
          :placeholder="param.placeholder"
        />
      </div>
      <div v-else>
        <InputString
          v-bind:name="param.name"
          v-bind:change="change"
          v-bind:defaultParam="
            defaultParam[param.name] ? defaultParam[param.name] : param.default
          "
          :placeholder="param.placeholder"
        />
      </div>
    </div>
  </div>
</template>

<script>
import InputString from "./InputString";
import InputInteger from "./InputInteger";

export default {
  data() {
    return {
      my_params: {},
    };
  },
  props: {
    params: Array,
    defaultParam: Object,
    setParams: Function,
    opened: Boolean,
  },
  components: {
    InputInteger,
    InputString,
  },
  created() {
    for (const param of this.params) {
      if (this.defaultParam.hasOwnProperty(param.name)) {
        this.my_params[param.name] = this.defaultParam[param.name];
      } else if (param.type === "integer") {
        this.my_params[param.name] = 0;
      } else {
        this.my_params[param.name] = "";
      }
    }
    this.setParams(this.my_params);
  },
  methods: {
    change(field, value) {
      this.my_params[field] = value;
      this.setParams(this.my_params);
    },
  },
};
</script>

<style>
.parameters {
  display: grid;
  align-content: center;
}
.parameter-input {
  max-width: 300px;
  width: 100%;
  padding: 1em;
  align-self: center;
  justify-self: center;
  text-align: center;
}
</style>