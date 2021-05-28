<template>
  <el-input
    v-model="my_string"
    :placeholder="placeholder"
    maxlength="255"
    show-word-limit
  />
</template>

<script>
export default {
  data() {
    return {
      str: "",
    };
  },
  props: {
    name: String,
    change: Function,
    defaultParam: String,
    placeholder: String,
  },
  created() {
    if (this.defaultParam) {
      this.str = this.defaultParam;
    } else {
      this.str = "";
    }
    this.change(this.name, this.str);
  },
  computed: {
    my_string: {
      get() {
        return this.str;
      },
      set(str) {
        this.str = str;
        this.change(this.name, str);
      },
    },
  },
};
</script>

<style scoped>
</style>