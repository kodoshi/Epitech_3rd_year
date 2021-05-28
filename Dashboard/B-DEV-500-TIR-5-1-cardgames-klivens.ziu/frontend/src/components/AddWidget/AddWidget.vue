<template>
  <div>
    <el-button type="primary" round @click="dialogVisible = true">
      Add a new widget</el-button
    >
    <el-dialog
      title="Add a new widget"
      :visible.sync="dialogVisible"
      width="90%"
    >
      <el-steps align-center>
        <el-step
          title="Service"
          :status="form.service === -1 ? 'process' : 'success'"
          :description="
            form.service !== -1 ? services[form.service].display_name : ''
          "
        />
        <el-step
          title="Widget"
          :status="
            form.service === -1
              ? 'wait'
              : form.widget === -1
              ? 'process'
              : 'success'
          "
          :description="
            form.widget !== -1
              ? services[form.service].widgets[form.widget].display_name
              : ''
          "
        />
        <el-step
          title="Parameters"
          :status="
            form.service !== -1 && form.widget !== -1 ? 'process' : 'wait'
          "
        />
      </el-steps>
      <el-button
        @click="formBack"
        type="primary"
        round
        :disabled="form.service === -1"
      >
        < Return
      </el-button>
      <div v-if="form.service === -1" class="form-page">
        <div
          v-for="(service, index) in services"
          v-model="form.service"
          v-bind:key="index"
          class="form-element"
        >
          <el-button type="info" plain @click="form.service = index">
            {{ service.display_name }}</el-button
          >
        </div>
      </div>
      <div v-else-if="form.widget === -1" class="form-page">
        <div
          v-for="(widget, index) in services[form.service].widgets"
          v-model="form.widget"
          v-bind:key="index"
          class="form-element"
        >
          <el-button type="info" plain @click="form.widget = index">
            {{ widget.display_name }} <br /><br />
            {{ widget.description }}
          </el-button>
        </div>
      </div>
      <div v-else class="form-page">
        <WidgetParameters
          v-bind:set-params="setParams"
          v-bind:params="services[form.service].widgets[form.widget].params"
          v-bind:defaultParam="{}"
          v-bind:opened="true"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false"> Cancel </el-button>
        <el-button type="primary" @click="submitForm"> Submit </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import API from "../../API";
import WidgetParameters from "../WidgetParameters/WidgetParameters";

export default {
  data() {
    return {
      loading: false,
      services: [],
      dialogVisible: false,
      step: 1,
      form: {
        service: -1,
        widget: -1,
        params: {},
      },
    };
  },
  props: {
    update: Function,
  },
  mounted() {},
  components: {
    WidgetParameters,
  },
  methods: {
    getAbout() {
      if (this.loading) return;
      this.loading = true;
      API.methods.apiGET(
        "/about-complete.json",
        (result) => {
          this.services = result.data.server.services;
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
    },
    clearForm() {
      this.form.service = -1;
      this.form.widget = -1;
    },
    formBack() {
      if (this.form.widget !== -1) {
        this.form.widget = -1;
        this.form.params = {};
      } else {
        this.form.service = -1;
      }
    },
    submitForm() {
      if (this.form.service === -1) {
        this.$message.error("No service selected");
        return;
      } else if (this.form.widget === -1) {
        this.$message.error("No widget selected");
        return;
      }
      const body = {
        service: this.services[this.form.service].name,
        widget: this.services[this.form.service].widgets[this.form.widget].name,
        params: this.form.params,
      };
      API.methods.apiPOST(
        "/widget",
        body,
        (result) => {
          this.$message({
            message: "Widget created",
            type: "success",
          });
          this.dialogVisible = false;
          this.update();
        },
        (err) => {
          this.$message.error(err.response.data.error);
        }
      );
    },
    setParams(params) {
      this.form.params = params;
    },
  },
  watch: {
    dialogVisible(oldValue, newValue) {
      if (oldValue === true && newValue === false) this.getAbout();
      else this.clearForm();
    },
  },
};
</script>

<style>
.form-page {
  padding: 3em;
}
.form-element {
  margin: 1em;
}
</style>