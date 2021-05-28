<template>
  <div id="LoginPage">
    <div class="Form">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            placeholder="Username"
            v-model.number="ruleForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            placeholder="Password"
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="FormBtn">
          <el-button type="primary" @click="login('ruleForm')">Login</el-button>
        </el-form-item>
        <el-form-item class="FormBtn">
          <RouterLink to="/register">Create an account</RouterLink>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { API_URL } from "../../config";
import { router } from "../../router";
import API from "../../API";

export default {
  data() {
    let checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please enter your username"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("pass");
          this.username = value;
        }
        callback();
      }
    };

    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.pass = value;
        }
        callback();
      }
    };

    return {
      ruleForm: {
        pass: "",
        username: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: checkUsername, trigger: "blur" }],
      },
    };
  },

  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let body = { username: this.username, password: this.pass };
          API.methods.apiPOST(
            "/login",
            body,
            (result) => {
              API.methods.saveInLocalStorage(result.data);
              router.push(API_URL + "/dashboard");
            },
            (err) => {
              this.$message.error(err.response.data.error);
            }
          );
        } else {
          this.$message.error("Invalid form");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.Form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.FormBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  left: auto;
}
</style>