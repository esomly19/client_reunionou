<template>
  <div class="event">
    <!-- <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li  :key="error" v-for="error in errors">{{ error }}</li>
    </ul>
    </p>-->
    <div class="form-row justify-content-center">
      <div class="col-md-6 mb-3">
        <p>
          <label for="name">Nom de l'événement</label>
          <input
            class="form-control"
            id="validationDefault01"
            v-model="name"
            type="text"
            name="name"
            required
          />
        </p>
        <p>
          <label for="name">Description de l'événement</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="6"
            v-model="description"
            name="name"
            required
          />
        </p>
        <div class="valid-feedback">Looks good!</div>
      </div>
      <p>
        <label for="age">Date</label>
        <input class="form-control" id="age" v-model="date" type="date" name="age" min="0" required />
      </p>

      <div class="custom-control custom-switch">
        <input
          v-model="publik"
          type="checkbox"
          class="custom-control-input form-control"
          id="customSwitch1"
        />
        <label class="custom-control-label form-control" for="customSwitch1">Evénément {{check}}</label>
      </div>
    </div>

    <div class="form-row justify-content-center">
      <div class="col-md-6 mb-3">
        <l-map style="height: 500px;" :zoom="zoom" :center="center" :markerZoomAnimation="true">
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker :lat-lng.sync="positionCentre" :draggable="true" :icon="icon" id="rr"></l-marker>
        </l-map>

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

    <button :disabled="verif" class="btn btn-primary" v-on:click="creeevent">Valider</button>
  </div>
</template>
<script src="https://unpkg.com/vue@latest/dist/vue.js"></script>
<script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>
<script src="https://unpkg.com/vue2-leaflet@1.0.1/dist/vue2-leaflet.js"></script>
<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon, icon } from "leaflet";
import axios from "axios";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
export default {
  name: "event",
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      errors: [],
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
      ville: null,
      //map: null,
      zoom: 5,
      url:
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
      positionCentre: { lat: 45.8566969, lng: 3.3514616 },
      icon: icon({
        iconUrl: "http://pngimg.com/uploads/gps/gps_PNG74.png",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      center: [55.746309, 4.3514616]
    };
  },
  props: {},
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
    creeevent() {
      if (this.publik) {
        this.state = 0;
      } else {
        this.state = 1;
      }
      axios
        .post("https://warm-badlands-86536.herokuapp.com/event", {
          titre: this.name,
          description: this.description,
          date: this.date,
          etat: this.state,
          x: this.positionCentre.lat.toString(),
          y: this.positionCentre.lng.toString(),
          adresse: this.adresse,
          ville: this.ville,
          iduser: localStorage.id
        })
        .then(res => {
          console.log(res.data);
          this.$router.push({ name: "Home" });
        })
        .catch(err => {
          console.log(err);
        });
    },

    getLocation: function() {
      console.log("ooook");

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
          this.resultats = response.data;
          if (typeof response.data[0].address.town !== "undefined") {
            this.ville = response.data[0].address.town;
          } else {
            this.ville = response.data[0].address.city;
          }
          console.log("Ville " + this.ville);
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
    }

    // mettre à jour latitude et longitude sur déplacement du marker
  },
  computed: {
    check: function() {
      if (this.publik) {
        return "public";
      } else {
        return "privé";
      }
    },
    verif: function() {
      if (this.publik || this.nom || this.description || this.adresse) {
        return false;
      } else {
        return true;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
.event {
  height: 100%;
  overflow-y: hidden;
  width: 100%;
  overflow-x: hidden;
}
</style>
