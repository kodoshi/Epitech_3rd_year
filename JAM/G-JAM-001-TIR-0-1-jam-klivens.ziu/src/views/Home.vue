<template>
  <div class="home">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">The Gorrilla World Project</h1>
        </div>
      </div>
    </section>
    <EventsList />
  </div>
</template>
<script>
import EventsList from "../components/EventsList";
export default {
  name: "home",
  components: {
    EventsList,
  },
};
</script>
<style lang="scss" scoped>
.hero {
  text-align: center;
  background-image: url("https://wallpaperaccess.com/full/2795472.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
}
.hero-body .title {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.322);
  padding: 40px 0 20px 0;
  font-size: 60px;
}
.subtitle {
  text-shadow: 4px 4px 4px rgba(0.322, 0.322, 0.322, 0.322);
  font-size: 30px;
}
.welcome {
  width: 400px;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
}
.is-xl {
  font-size: 1.7rem;
}
</style>