<template>
  <div class="polaroid">
    <div class="cardmap" v-on:click="detail(soro.token)">
      <p style="justify-content: center;">{{soro.titre}}</p>

      <l-map
        style="height: 200px;  width:100%"
        :zoom="zoom"
        :center="center"
        :markerZoomAnimation="true"
        attribution="ok"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="positionCentre" :draggable="false" :icon="icon"></l-marker>
      </l-map>
    </div>
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
<style lang="scss" scoped></style>