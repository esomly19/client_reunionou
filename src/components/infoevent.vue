<template>
  <div>
    <l-map
      class="col-8"
      style="height: 700px;"
      :zoom="zoom"
      :center="center"
      :markerZoomAnimation="true"
    >
      <l-tile-layer :url="url"></l-tile-layer>
    </l-map>
  </div>
</template>
<script src='https://npmcdn.com/@turf/turf/turf.min.js'></script>
<script>
import axios from "axios";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
export default {
  components: { LMap, LTileLayer, LMarker },
  data() {
    return {
      key: "5b3ce3597851110001cf6248d8cf521cc54d489c8fbe4117a6f4940b",
      startx: "8.681495",
      starty: "49.41461",
      endx: "8.687872",
      endy: "49.420318",
      zoom: 13,
      center: [47.41322, -1.219482],
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    };
  },
  methods: {
    initmap() {},
    detail() {
      axios
        .get(
          "https://api.openrouteservice.org/v2/directions/driving-car?api_key=" +
            this.key +
            "&start=8.681495,49.41461&end=8.687872,49.420318"
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);

          console.log("33");
        })
        .finally(() => {
          console.log("bruhh");
        });
    }
  },
  mounted() {
    this.detail();
  },
  computed: {}
};
</script>
<style>
body {
  padding: 0;
  margin: 0;
}

html,
body,
#map {
  height: 100%;
  width: 100%;
}
</style>