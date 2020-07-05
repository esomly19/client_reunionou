<template>
  <div class="main">
    <div class="event">
      <div v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li :key="error" v-for="error in errors">{{ error }}</li>
        </ul>
      </div>

      <div>
        <label for="name">Nom de l'événement</label>
        <input id="name" v-model="event.titre" type="text" name="name" />
      </div>
      <div>
        <label for="name">Description de l'événement</label>
        <textarea id="name" v-model="event.description" name="name" />
      </div>

      <div>
        <label for="age">Date</label>
        <input id="age" v-model="date" type="date" />
      </div>

      <div class="custom-control custom-switch">
        <input
          v-model="event.publik"
          type="checkbox"
          class="custom-control-input"
          id="customSwitch1"
        />
        <label class="custom-control-label" for="customSwitch1">Evénément {{check}}</label>
      </div>
      <p>IDUSER : {{event.iduser}}</p>
      <div class="row">
        <l-map
          class="col-8"
          style="height: 700px;"
          :zoom="zoom"
          :center="center"
          :markerZoomAnimation="true"
        >
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker :lat-lng.sync="positionCentre" :draggable="true" :icon="icon" id="rr"></l-marker>
        </l-map>
        <div class="col-4">
          <input type="text" placeholder="Entrez votre adresse" v-model="adresse" />

          <button class="button" v-on:click="getLocation">Marquer !</button>
          <div v-if="wait">...</div>
          <section v-if="erreur">
            <p>Désolé, mais nous n'avons trouvé aucun résultat pour {{ adresse }}.</p>
          </section>

          <section v-if="resultats">
            <div v-if="loading">Chargement...</div>
            <div v-else v-for="poi in resultats" v-bind:key="poi.address">
              <h2>Résultats pour {{ adresse }}</h2>
              <input type="number" :value="positionCentre.lat" />
              <input type="number" :value="positionCentre.lng" />
              <div v-if="poi.address.postcode">
                <h3>{{ poi.address.postcode }} {{ poi.address.city }} {{ poi.address.suburb }}</h3>
              </div>
            </div>
          </section>
        </div>
      </div>
      <p>
        <button v-on:click="updateevent">Valider</button>
      </p>
    </div>
  </div>
</template>
<script src="https://unpkg.com/vue@latest/dist/vue.js"></script>
<script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>
<script src="https://unpkg.com/vue2-leaflet@1.0.1/dist/vue2-leaflet.js"></script>
<script>
import axios from "axios";
import moment from "moment";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon, icon } from "leaflet";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
export default {
  name: "Home",
  components: { LMap, LTileLayer, LMarker },
  data: () => ({
    ok: 0,
    name: null,
    description: null,
    date: null,
    publik: false,
    state: 1,
    adresse: "",
    loading: false,
    wait: false,
    resultats: [],
    erreur: false,
    errors: [],
    zoom: 10,
    event: null,
    url:
      "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
    positionCentre: { lat: 48.8566969, lng: -2.746309 },
    icon: icon({
      iconUrl: "http://pngimg.com/uploads/gps/gps_PNG74.png",
      iconSize: [32, 37],
      iconAnchor: [16, 37]
    }),
    center: { lat: 48.8566969, lng: -2.746309 }
  }),
  methods: {
    checkForm: function(e) {
      if (this.name) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push("Name required.");
      }
      if (!this.age) {
        this.errors.push("Age required.");
      }

      e.preventDefault();
    },
    getLocation: function() {
      console.log(this.adresse);

      this.loading = true;
      this.wait = false;

      axios
        .get(
          "https://nominatim.openstreetmap.org/search?q=" +
            encodeURIComponent(this.adresse) +
            "&format=json&polygon=1&addressdetails=1&limit=1"
        )
        .then(response => {
          //console.log(response.data[0].lat);
          this.loading = false;
          console.log(response);
          this.resultats = response.data;

          this.positionCentre.lat = parseFloat(response.data[0].lat);
          this.positionCentre.lng = parseFloat(response.data[0].lon);
        })
        .catch(error => {
          console.log(error);
          this.erreur = true;
          console.log("33");
        })
        .finally(() => {
          this.loading = false;
          console.log("bruhh");
        });
    },
    getEvent() {
      this.event = this.$route.params.event;
      console.log("date : " + this.event.date);
      this.date = this.format_date(this.event.date);
      console.log("date2 : " + this.date);
      console.log("event : " + this.event.titre);
      this.positionCentre.lat = this.event.x;
      this.positionCentre.lng = this.event.y;
      this.center.lat = this.event.x;
      this.center.lng = this.event.y;
      this.adresse = this.event.adresse;
    },
    format_date(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },
    updateevent() {
      if (this.publik) {
        this.state = 0;
      } else {
        this.state = 1;
      }
      axios
        .put(
          "https://warm-badlands-86536.herokuapp.com/event/" + this.event.id,
          {
            titre: this.event.titre,
            description: this.event.description,
            date: this.date,
            etat: this.state,
            x: this.positionCentre.lat,
            y: this.positionCentre.lng,
            adresse: this.adresse,
            iduser: this.event.iduser
          }
        )
        .then(res => {
          console.log(res.data);
          this.$router.go(-1);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getEvent();
  },
  computed: {
    check: function() {
      if (this.publik) {
        return "publique";
      } else {
        return "privé";
      }
    }
  },
  watch: {
    /* check variables in real time */
    //remove marker
    adresse: function() {
      this.wait = true;
      //this.map.removeLayer(marker);
    },
    longitude: function() {
      console.log("WATCHER : mise à jour de longitude");
    }
  }
};
</script>

<style>
.main {
  margin-left: 180px; /* Same as the width of the sidenav */
  font-size: 28px; /* Increased text to enable scrolling */
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>
