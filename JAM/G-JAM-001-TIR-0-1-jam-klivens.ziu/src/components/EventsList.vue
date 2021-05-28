<template>
  <div class="events container">
    <h2 class="subtitle is-3">Pictures</h2>
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
          name: "The Past",
          category: "Pictures",
          description: "Gorillas of the past",
          featuredImage:
            "https://static01.nyt.com/images/2015/10/25/travel/25GORILLA1/25GORILLA1-superJumbo-v2.jpg",
          images: [
            "https://static01.nyt.com/images/2015/10/25/travel/25GORILLA1/25GORILLA1-superJumbo-v2.jpg",
            "https://www.columbusmonthly.com/galleryimage/OH/20190930/PHOTOGALLERY/930009995/PH/0/9/PH-930009995.jpg",
            
            "https://www.columbusmonthly.com/galleryimage/OH/20190930/PHOTOGALLERY/930009995/PH/0/2/PH-930009995.jpg",
            "https://i.pinimg.com/236x/2c/6f/ee/2c6fee5346971c3bf579e07979c14a1e--little-rock-a-father.jpg",
            "https://static.torontopubliclibrary.ca/da/images/LC/tspa_0116263f.jpg",
            "https://www.jasongoodman.com/wp-content/uploads/2017/05/gorilla-trekking-rwanda-silverback-profile-landscape.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/51OCHs%2B55xL._AC_.jpg",
            "https://img.lumas.de/showimg_wad19_620_440.jpg",
            "https://static1.bigstockphoto.com/6/7/2/large1500/276841993.jpg",
          ],
          location: "Jungles of Africa",
          quote: '"All warfare is based on deception." - Sun Tzu',
          date: "2000s",
        },
        {
          id: 2,
          name: "The Present",
          category: "Pictures",
          description: "Gorillas of the present",
          featuredImage:
            "https://c402277.ssl.cf1.rackcdn.com/photos/18330/images/hero_small/Mountain_Gorilla_Silverback_WW22557.jpg?1576515753",
          images: [
            "https://c402277.ssl.cf1.rackcdn.com/photos/18330/images/hero_small/Mountain_Gorilla_Silverback_WW22557.jpg?1576515753",
            "https://images.wsj.net/im-124485?width=1280&size=1",
            "https://storage.googleapis.com/afs-prod/media/e2a9aae4ddfc460eab6ca9c36ae0b3df/2000.jpeg",
            "https://images.theconversation.com/files/267521/original/file-20190404-131437-psnnwu.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip",
            "https://i.guim.co.uk/img/media/ff64a79ef5f9ccde78458ea20eb3e6efe3eca2ae/0_363_5472_3283/master/5472.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=987181ade213ea0cfa196d37d780e7a2",
            "https://cdn.vox-cdn.com/thumbor/RWexAHjx-adCqBCgRlCWFTftGHo=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22172414/578019678.jpg",
            "https://www.popsci.com/resizer/IQmIbHUVUyRSGycbVywFWMm7N0g=/760x506/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/MM522Q5GHZXTDCUTXTIVX5QGDE.jpg",
            "https://i.natgeofe.com/n/aa2604e2-c5cd-4e0e-ad0e-c27db1ea6667/kwita-izina-visit-rwanda-gorillas-2.jpg?w=1200",
            "https://www.gannett-cdn.com/presto/2020/12/07/NCOD/a9f61566-4ac8-4d60-bf69-d8889198a0ba-130523626_10158085938567106_4320360091727638230_o.jpg",
            "https://thumbs-prod.si-cdn.com/5pXre9QxlV2wK6QRCL7xzSuPZYQ=/fit-in/1600x0/https://public-media.si-cdn.com/filer/45/e8/45e81e74-8044-4a89-a679-6d0eaa70d6fc/caters_gorilla_punch_03.jpg",
          ],
          location: "Jungles of Africa",
          quote:
            '"They are grabbing power right before our eyes." - Alex Jones',
          date: "2010s",
        },
        {
          id: 3,
          name: "The Future",
          category: "Picture",
          description: "Gorillas of the future",
          featuredImage:
            "https://www.wonderwall.com/wp-content/uploads/sites/2/2020/08/ivan_07_14afe500.jpeg?h=800",
          images: [
            "https://mtv.mtvnimages.com/uri/mgid:ao:image:mtv.com:16025?quality=0.8&format=jpg&width=1440&height=810&.jpg",
            "https://i.dailymail.co.uk/i/pix/scaled/2011/07/22/article-2016793-0D15BCC800000578-132_308x185.jpg",
            "https://lh3.googleusercontent.com/proxy/fIje6pi_HqW42BSmGvpMybjqw_sFEqLflJNl1KCQq3NdV7uGXz0LvAxwXF6NccFuXNtSUV_UFchAHMB2Rj6eFJfxi9Pl5miadkT3YHymbjWsIC5p0rtK_QX-9SF23netoFK8eXkcDkqm8fSt",
            "https://i.pinimg.com/originals/1a/71/b7/1a71b77905f9e5d55a538a151aaf9662.jpg",
            "https://pbs.twimg.com/media/D26Z5-PX0AACrC9.jpg",
            "https://image.shutterstock.com/image-photo/monkey-gun-260nw-142205047.jpg",
          ],
          location: "Your moms basement",
          quote:
            '"The best way to predict the future is to create it." - Futuristic monkey with an AK',
          date: "unknown",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.events {
  margin-top: 80px;
  text-align: center;
}
</style>