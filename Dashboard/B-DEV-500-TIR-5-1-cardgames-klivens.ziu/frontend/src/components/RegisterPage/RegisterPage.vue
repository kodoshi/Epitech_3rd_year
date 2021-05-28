<template>
  <div id="RegisterPage">
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

        <el-form-item prop="checkPass">
          <el-input
            placeholder="Confirm password"
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item class="FormBtn">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >Register</el-button
          >
        </el-form-item>

        <el-form-item class="FormBtn">
          <RouterLink to="/login">Already registered</RouterLink>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import API from "../../API.js";
import { API_URL } from "../../config";
import { router } from "../../router";

export default {
  data() {
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please pick an username"));
      } else {
        if (this.ruleForm.username !== "") {
          this.username = value;
          this.$refs.ruleForm.validateField("pass");
        }
        callback();
      }
    };

    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please pick a password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please type your password again"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Passwords are not matching"));
      } else {
        this.pass = value;
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        username: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let body = { username: this.username, password: this.pass };
          API.methods.apiPOST(
            "/register",
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