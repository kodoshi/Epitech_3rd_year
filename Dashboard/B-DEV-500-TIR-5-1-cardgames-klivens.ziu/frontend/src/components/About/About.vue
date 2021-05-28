<template>
  <div class="About">
    <TopBar />
    <el-card>
      <pre>{{ posts }}</pre>
    </el-card>
  </div>
</template>

<script>
import TopBar from "../TopBar/TopBar";
import API from "../../API";

export default {
  data() {
    return {
      posts: {},
    };
  },
  created() {
    API.methods.apiGET(
      "/about.json",
      (result) => {
        this.posts = result.data;
      },
      (err) => {
        this.$message.error(err.message);
      }
    );
  },
  components: {
    TopBar,
  },
};
</script>
