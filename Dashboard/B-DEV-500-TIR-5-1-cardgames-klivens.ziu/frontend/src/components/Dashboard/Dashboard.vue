<template>
  <div class="Dashboard">
    <TopBar />
    <div class="main-div">
      <div class="update-header">
        <AddWidget v-bind:update="getWidgets" />
      </div>
      <el-card
        v-if="!loading && widgets.length === 0"
        shadow="always"
        class="update-header"
      >
        You don't have any widgets
      </el-card>
      <ul class="wrapper-dashboard" v-loading="loading">
        <li class="widget" v-for="(widget, index) in widgets">
          <Widget
            v-bind:service="widget.service"
            v-bind:widget="widget.widget"
            v-bind:widget-id="widget.id"
            v-bind:index="index"
            v-bind:update="getWidgets"
          ></Widget>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TopBar from "../TopBar/TopBar";
import API from "../../API";
import Widget from "../Widget/Widget";
import AddWidget from "../AddWidget/AddWidget";

export default {
  data() {
    return {
      loading: false,
      widgets: [],
    };
  },
  mounted() {
    this.getWidgets();
  },
  components: {
    Widget,
    TopBar,
    AddWidget,
  },
  props: {},
  methods: {
    sortWidgets(data) {
      // console.log(data);
      let local = JSON.parse(
        localStorage.getItem(API.methods.getLocalStorageUsername() + "-order")
      );
      for (const elem of data) {
        let found = false;
        for (const elemLocal of local) {
          if (
            elemLocal.service === elem.service &&
            elemLocal.id === elem.id &&
            elemLocal.widget === elem.widget
          ) {
            found = true;
            break;
          }
        }
        if (!found) local.push(elem);
      }

      let i = 0;
      while (i < local.length) {
        let found = false;
        for (const elem of data) {
          if (
            local[i].service === elem.service &&
            local[i].id === elem.id &&
            local[i].widget === elem.widget
          ) {
            found = true;
            break;
          }
        }
        if (!found) local.splice(i, 1);
        else i++;
      }
      localStorage[
        API.methods.getLocalStorageUsername() + "-order"
      ] = JSON.stringify(local);
      this.widgets = local;
    },
    getWidgets() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      API.methods.apiGET(
        "/widgets",
        (response) => {
          this.loading = false;
          this.sortWidgets(response.data);
        },
        (err) => {
          this.loading = false;
          this.$message.error(err.response.data.error);
        }
      );
    },
  },
};
</script>

<style>
.main-div {
  padding: 2em;
  justify-content: center;
}
.wrapper-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 10px;
}

.update-header {
  text-align: center;
  padding-bottom: 2em;
}

.widget {
  list-style-type: none;
}
</style>
