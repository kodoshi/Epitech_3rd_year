<template>
  <div class="UserPage">
    <TopBar></TopBar>
    <div class="InfosCard">
      <el-card>
        <div class="Infos">
          <h3>Username: {{ username }}</h3>
          <h3>User ID: {{ userID }}</h3>
          <h3>Widgets Count: {{ widgetCount }}</h3>
        </div>
      </el-card>
    </div>
    <div class="InfosCard">
      <el-card>
        <h3 class="Infos">Oauth services</h3>
        <div v-for="(oauth, index) in oauths" class="Infos">
          {{ oauth.service }}
          <a v-if="oauth.status === 0" :href="oauth.url">
            <el-button @click="" type="primary"> Sign in </el-button>
          </a>
          <el-button
            v-else-if="oauth.status === 1"
            @click="signOutOauth(oauth.service)"
            type="danger"
          >
            Sign out
          </el-button>
          <el-button v-else @click="" type="info" disabled>
            Unavailable
          </el-button>
        </div>
      </el-card>
    </div>
    <div class="InfosCard">
      <el-card>
        <div class="ResetPass">
          <h3>Reset Password</h3>
        </div>
        <el-form>
          <el-form-item prop="oldPass">
            <el-input
              placeholder="Old Password"
              v-model="oldpass"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="newPass">
            <el-input
              placeholder="New Password"
              v-model="newpass"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item class="FormBtn">
            <el-button type="primary" @click="resetPasswd()">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import TopBar from "../TopBar/TopBar";
import API from "../../API";

export default {
  data() {
    return {
      username: "",
      userID: "",
      widgetCount: "",
      oauths: [],
      oldpass: "",
      newpass: "",
    };
  },
  components: {
    TopBar,
  },
  methods: {
    getInfos() {
      API.methods.apiGET(
        "/account",
        (result) => {
          this.username = result.data.username;
          this.userID = result.data.id;
          this.widgetCount = result.data.widgets_count;
          this.oauths = result.data.oauth;
        },
        (err) => {
          this.$message.error(err.message);
        }
      );
    },
    resetPasswd() {
      let body = { old_password: this.oldpass, new_password: this.newpass };
      API.methods.apiPOST(
        "/change-password",
        body,
        (result) => {
          this.$message.success("Password changed");
        },
        (err) => {
          this.$message.error(err.response.data.error);
        }
      );
    },
    signOutOauth(service) {
      API.methods.apiDELETE(
        "/oauth/" + service,
        null,
        (result) => {
          this.$message.success("Oauth disconnected");
          this.getInfos();
        },
        (err) => {
          this.$message.error(err.response.data.error);
          this.getInfos();
        }
      );
    },
  },
  created() {
    this.getInfos();
  },
};
</script>

<style>
.InfosCard {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
}

.Infos {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ResetPass {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
