<template>
  <div class="event-single">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ event.name }}
          </h1>
          <h2 class="subtitle">
            <strong>Date:</strong> {{ event.date }}
            <br />
            <strong>Time:</strong> {{ event.time }}
          </h2>
        </div>
      </div>
    </section>
    <section class="event-content">
      <div class="container">
        <p class="is-size-4 description">{{ event.description }}</p>
        <p class="is-size-5"><strong>Location:</strong> {{ event.location }}</p>
        <p class="is-size-5"><strong>Category:</strong> {{ event.category }}</p>
        <div class="event-images columns is-multiline has-text-centered">
          <div
            v-for="image in event.images"
            :key="image.id"
            class="column is-one-third"
          >
            <img :src="image" :alt="event.name" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "EventSingle",
  data() {
    return {
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
      event: {},
    };
  },
  created() {
    const ID = Number(this.$route.params.id);
    let event = this.events.find((event) => event.id === ID);
    this.event = event;
  },
};
</script>