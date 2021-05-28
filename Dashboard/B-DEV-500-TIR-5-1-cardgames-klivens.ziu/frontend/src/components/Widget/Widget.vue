<template>
  <el-card class="widget-card" :body-style="{ padding: '0px' }">
    <div class="widget-header">
      <div class="end-button">
        <el-button
          type="info"
          @click="dialogVisible = true"
          icon="el-icon-edit"
          circle
        ></el-button>
        <el-button
          type="info"
          @click="movePrev"
          icon="el-icon-caret-left"
          circle
        ></el-button>
        <el-button
          type="info"
          @click="moveNext"
          icon="el-icon-caret-right"
          circle
        ></el-button>
        <el-button
          type="info"
          @click="getWidget"
          icon="el-icon-refresh-left"
          circle
        ></el-button>
        <el-button
          type="danger"
          @click="deleteWidget"
          icon="el-icon-delete"
          circle
        ></el-button>
      </div>
    </div>
    <div class="widget-content" v-loading="loading" v-html="info.html"></div>
    <el-dialog
      title="Change widget parameters"
      :visible.sync="dialogVisible"
      width="90%"
      destroy-on-close
    >
      <WidgetParameters
        v-bind:set-params="setParams"
        v-bind:params="info.params"
        v-bind:defaultParam="info.current"
        v-bind:opened="dialogVisible"
      >
      </WidgetParameters>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false"> Cancel </el-button>
        <el-button type="primary" @click="patchWidget"> Submit </el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import API from "../../API";
import WidgetParameters from "../WidgetParameters/WidgetParameters";

export default {
  data() {
    return {
      loading: false,
      dialogVisible: false,
      temp_params: {},
      info: {
        params: [],
        current: {},
        html: "<div> Not loaded yet </div>",
      },
      interval: null,
    };
  },
  props: {
    service: String,
    widget: String,
    widgetId: Number,
    update: Function,
    index: Number,
  },
  components: {
    WidgetParameters,
  },
  mounted() {
    this.getWidget();
  },
  methods: {
    getWidget() {
      if (this.loading) return;
      this.loading = true;
      if (this.interval) clearInterval(this.interval);
      API.methods.apiGET(
        "/widget/" + this.service + "/" + this.widget + "/" + this.widgetId,
        (response) => {
          this.info = response.data;
          this.loading = false;
          this.temp_params = this.info.current;
          if (response.data.params.refresh)
            this.interval = setInterval(
              this.getWidget,
              1000 * response.data.params.refresh
            );
          else this.interval = setInterval(this.getWidget, 60000);
        },
        (err) => {
          this.$message.error(err.response.data.error);
          this.loading = false;
          this.interval = setInterval(this.getWidget, 60000);
        }
      );
    },
    patchWidget() {
      API.methods.apiPATCH(
        "/widget/" + this.service + "/" + this.widget + "/" + this.widgetId,
        this.temp_params,
        (result) => {
          this.$message({
            message: "Widget updated",
            type: "success",
          });
          this.dialogVisible = false;
          this.getWidget();
        },
        (err) => {
          this.$message.error(err.response.data.error);
        }
      );
    },
    deleteWidget() {
      API.methods.apiDELETE(
        "/widget/" + this.service + "/" + this.widget + "/" + this.widgetId,
        (response) => {
          this.update();
        },
        (err) => {
          this.$message.error(err.response.data.error);
          this.update();
        }
      );
    },
    moveNext() {
      let local = JSON.parse(
        localStorage.getItem(API.methods.getLocalStorageUsername() + "-order")
      );

      if (this.index + 1 < local.length) {
        [local[this.index], local[this.index + 1]] = [
          local[this.index + 1],
          local[this.index],
        ];
        localStorage[
          API.methods.getLocalStorageUsername() + "-order"
        ] = JSON.stringify(local);
        this.update();
      }
    },
    movePrev() {
      let local = JSON.parse(
        localStorage.getItem(API.methods.getLocalStorageUsername() + "-order")
      );

      if (this.index - 1 >= 0) {
        [local[this.index - 1], local[this.index]] = [
          local[this.index],
          local[this.index - 1],
        ];
        localStorage[
          API.methods.getLocalStorageUsername() + "-order"
        ] = JSON.stringify(local);
        this.update();
      }
    },
    setParams(params) {
      this.temp_params = params;
    },
  },
  watch: {
    service() {
      this.getWidget();
    },
    widget() {
      this.getWidget();
    },
    widgetId() {
      this.getWidget();
    },
    dialogVisible() {
      this.temp_params = this.info.current;
    },
  },
};
</script>

<style>
.widget-header {
  background-color: #545c64;
  width: 100%;
  height: 50px;
  color: darkgray;
  align-items: center;
  justify-content: flex-end;
  display: flex;
  font-size: 12px;
}

.widget-card {
  height: 300px;
  width: 300px;
}

.end-button {
  margin-left: 20px;
  margin-right: 10px;
}

.widget-content {
  height: 250px;
  width: 300px;
}
</style>