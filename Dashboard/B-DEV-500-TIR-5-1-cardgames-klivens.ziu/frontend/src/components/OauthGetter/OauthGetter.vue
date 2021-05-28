<template>
  <div class="oauth" v-loading="true" />
</template>

<script>
import API from "../../API";

export default {
  mounted() {
    API.methods.apiPOST(
      "/oauth/" + this.$route.params.service,
      this.$route.query,
      (result) => {
        this.$message({
          message: "Authentication succeeded",
          type: "success",
        });
        this.$router.push("/account");
      },
      (err) => {
        this.$message.error(err.response.data.error);
        this.$router.push("/account");
      }
    );
  },
};
</script>

<style>
.oauth {
  width: 100%;
  height: 100%;
}
</style>