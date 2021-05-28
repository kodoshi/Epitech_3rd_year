<template>
  <div class="events container">
    <h2 class="subtitle is-3">Future events</h2>
    <div class="columns is-multiline">
      <div
        v-for="event in events"
        :event="event"
        :key="event.id"
        class="column is-one-quarter"
      >
        <router-link :to="'/event/' + event.id">
          <EventCard :event="event" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import EventCard from "@/components/EventCard";
export default {
  name: "EventsList",
  components: {
    EventCard,
  },
  data() {
    return {
      event: {},
      events: [
        {
          id: 1,
          name: "Charity Ball",
          category: "Fundraising",
          description:
            "Spend an elegant night of dinner and dancing with us as we raise money for our charity.",
          featuredImage: "https://placekitten.com/500/500",
          images: [
            "https://placekitten.com/500/500",
            "https://placekitten.com/500/500",
            "https://placekitten.com/500/500",
          ],
          location: "1234 Fancy Ave",
          date: "12-28-2020",
          time: "11:30",
        },
        {
          id: 2,
          name: "French Alliance friendly get-together",
          category: "Dinner with Friends",
          description:
            "Come to the dinner hosted by the Alliance, newcomers are welcomed and encouraged to come and practice their French speaking skills.",
          featuredImage: "https://placekitten.com/500/500",
          images: ["https://placekitten.com/500/500"],
          location: "1234 Dog Alley",
          date: "11-29-2020",
          time: "12:00",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.events {
  margin-top: 100px;
  text-align: center;
}
</style>