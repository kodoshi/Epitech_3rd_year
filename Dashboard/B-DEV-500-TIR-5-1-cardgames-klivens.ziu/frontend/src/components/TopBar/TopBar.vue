<template>
  <div class="top-bar">
    <el-menu
      :default-active="activeLink"
      :router="true"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/dashboard">Dashboard</el-menu-item>
      <el-menu-item index="/account">Account</el-menu-item>
      <el-menu-item index="/about.json">About.json</el-menu-item>
      <el-button
        type="primary"
        @click="LogOut"
        style="position: absolute; top: 17%; right: 1%"
      >
        Logout
      </el-button>
    </el-menu>
  </div>
</template>

<script>
import API from "../../API";

export default {
  data() {
    return {
      activeLink: "",
    };
  },
  methods: {
    LogOut() {
      API.methods.logOut();
    },
  },
  mounted() {
    this.activeLink = this.$route.path;
  },
  watch: {
    $route(newVal, oldVal) {
      this.activeLink = newVal.path;
    },
  },
};
</script>

<style>
.top-bar {
  position: fixed;
  top: 0;
  width: 100%;
}
</style>