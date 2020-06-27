<template>
  <div class="card" v-on:click="detail(soro.token)">
    <figure class="card__thumb">
      <l-map
        style="height: 400px;  width:100%"
        :zoom="zoom"
        :center="center"
        :markerZoomAnimation="true"
        attribution="ok"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="positionCentre" :draggable="false" :icon="icon"></l-marker>
      </l-map>
      <figcaption class="card__caption">
        <h2 class="card__title">{{soro.titre}}</h2>
        <p class="card__snippet">{{soro.description}}</p>
      </figcaption>
    </figure>
  </div>
</template>
<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon, icon } from "leaflet";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
//import axios from "axios";
export default {
  props: ["soro"],
  components: {
    LMap,
    LTileLayer,
    LMarker
  },

  data: function() {
    return {
      zoom: 10,
      url:
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
      positionCentre: {
        lat: this.soro.x,
        lng: this.soro.y
      },
      icon: icon({
        iconUrl: "http://pngimg.com/uploads/gps/gps_PNG74.png",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      center: [this.soro.x, this.soro.y]
    };
  },
  methods: {
    detail(token) {
      this.$router.push({ name: "detail", params: { token: token } });
    }
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
.card {
  width: 300px;
  margin: 10px;
  background-color: white;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
}
.card:hover .card__caption {
  top: 50%;
  transform: translateY(-50%);
}
.card:hover .card__image {
  transform: translateY(-10px);
}
.card:hover .card__thumb::after {
  top: 0;
}
.card:hover .card__snippet {
  margin: 20px 0;
}
.card__thumb {
  position: relative;
  max-height: 500px;
  overflow: hidden;
}
.card__thumb::after {
  position: absolute;
  top: calc(100% - 140px);
  display: block;
  content: "";
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.5) 40%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: 0.3s;
}
.card__image {
  transition: 0.5s ease-in-out;
}
.card__caption {
  position: absolute;
  top: calc(100% - 110px);
  z-index: 1;
  padding: 0 20px;
  color: white;
  text-align: center;
  transition: 0.3s;
}
.card__title {
  display: -webkit-box;
  max-height: 85px;
  overflow: hidden;
  font-family: "Playfair Display", serif;
  font-size: 23px;
  line-height: 28px;
  text-shadow: 0px 1px 5px black;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.card__snippet {
  display: -webkit-box;
  max-height: 150px;
  margin: 60px 0;
  overflow: hidden;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  line-height: 20px;
  text-overflow: ellipsis;
  transition: 0.5s ease-in-out;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.card__button {
  display: inline-block;
  padding: 10px 20px;
  color: white;
  border: 1px solid white;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  text-decoration: none;
  transition: 0.3s;
}
.card__button:hover {
  color: black;
  background-color: white;
}

.disclaimer {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: "Roboto", sans-serif;
  font-size: 16px;
}
.disclaimer__link {
  color: #755d87;
  text-decoration: none;
}
</style>