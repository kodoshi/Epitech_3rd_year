<template>
  <el-input-number
    v-model="my_int"
    :min="min"
    :max="max"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  data() {
    return {
      int: 0,
    };
  },
  props: {
    name: String,
    change: Function,
    defaultParam: Number,
    min: Number,
    max: Number,
    placeholder: String,
  },
  created() {
    if (this.defaultParam) {
      this.int = this.defaultParam;
    } else {
      this.int = 0;
    }
    this.change(this.name, this.int);
  },
  computed: {
    my_int: {
      get() {
        return this.int;
      },
      set(int) {
        this.int = int;
        this.change(this.name, int);
      },
    },
  },
};
</script>

<style>
</style>