<template>
  <form-wizard @onComplete="onComplete">
    <tab-content title="Nom et description de l'événement" :selected="true">
      <div class="form-group">
        <label for="titre">Nom de l'événement</label>
        <input
          type="text"
          class="form-control"
          :class="hasError('titre') ? 'is-invalid' : ''"
          placeholder="Enter your name"
          v-model="formData.titre"
        />
        <div v-if="hasError('titre')" class="invalid-feedback">
          <div class="error" v-if="!$v.formData.titre.required">Un nom pour l'événement est requis.</div>
        </div>
      </div>
      <div class="form-group">
        <label for="description">Description de l'événement</label>
        <textarea
          type="text"
          class="form-control"
          id="exampleFormControlTextarea1"
          :class="hasError('description') ? 'is-invalid' : ''"
          placeholder="Description de l'événement"
          v-model="formData.description"
        />

        <div v-if="hasError('description')" class="invalid-feedback">
          <div class="error" v-if="!$v.formData.description.required">Une description est requise</div>
        </div>
      </div>
    </tab-content>
    <tab-content title="Date et statut de l'événement">
      <div class="form-group">
        <label for="date">Date de l'événement</label>
        <input class="form-control" v-model="formData.date" type="date" required />
      </div>
      <div class="form-group">
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
    </tab-content>
    <tab-content title="Localisation de l'événement">
      <div class="form-group">
        <label for="date">Localisation</label>
        <div class="row justify-content-center">
          <div class="col-md-12 mb-3">
            <l-map style="height: 500px;" :zoom="zoom" :center="center" :markerZoomAnimation="true">
              <l-tile-layer :url="url"></l-tile-layer>
              <l-marker :lat-lng.sync="positionCentre" :draggable="true" :icon="icon" id="rr"></l-marker>
            </l-map>

            <input type="text" placeholder="Entrez votre adresse" v-model="adresse" />

            <button type="button" class="button" v-on:click="getLocation">Marquer !</button>
            <div v-if="wait">...</div>
            <section v-if="erreur">
              <p>Désolé, mais nous n'avons trouvé aucun résultat pour {{ adresse }}.</p>
            </section>

            <section v-if="resultats">
              <div v-if="loading">Chargement...</div>
              <div v-else v-for="poi in resultats" v-bind:key="poi.address">
                <h2>Résultats pour {{ adresse }}</h2>
                <div v-if="poi.address.postcode">
                  <h3>{{ poi.address.postcode }} {{ poi.address.city }} {{ poi.address.suburb }}</h3>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </tab-content>
    <tab-content title="Récapitulatif">
      <div class="form-group text-center">
        <label>Récapitulatif de la création d'évenement</label>
        <hr />
        <label>Nom : {{formData.titre}}</label>
        <hr />
        <label>Description : {{formData.description}}</label>
        <hr />
        <label>Date : {{formData.date}}</label>
        <hr />
        <label>Adresse : {{adresse}}</label>
        <hr />
        <label>Statut : événement {{check}}</label>
        <hr />
      </div>
    </tab-content>
  </form-wizard>
</template>
<script src="https://unpkg.com/vue@latest/dist/vue.js"></script>
<script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>
<script src="https://unpkg.com/vue2-leaflet@1.0.1/dist/vue2-leaflet.js"></script>
<script>
import { FormWizard, TabContent, ValidationHelper } from "vue-step-wizard";
import "vue-step-wizard/dist/vue-step-wizard.css";
import { required } from "vuelidate/lib/validators";
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
  name: "StepFormValidation",
  components: {
    FormWizard,
    TabContent,
    LMap,
    LTileLayer,
    LMarker
  },
  mixins: [ValidationHelper],
  data() {
    return {
      zoom: 5,
      url:
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
      positionCentre: { lat: 45.8566969, lng: 3.3514616 },
      icon: icon({
        iconUrl: "http://pngimg.com/uploads/gps/gps_PNG74.png",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      errors: [],
      state: 1,
      adresse: "",
      loading: false,
      wait: false,
      resultats: [],
      center: [55.746309, 4.3514616],
      publik: false,
      formData: {
        titre: "",
        description: "",
        date: null,
        etat: null,
        x: null,
        y: null,
        ville: ""
      },
      validationRules: [{ titre: { required }, description: { required } }]
    };
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
  },
  methods: {
    onComplete() {
      this.creeevent();
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
    },
    creeevent() {
      if (this.publik) {
        this.state = 0;
      } else {
        this.state = 1;
      }
      axios
        .post("https://warm-badlands-86536.herokuapp.com/event", {
          titre: this.formData.titre,
          description: this.formData.description,
          date: this.formData.date,
          etat: this.state,
          x: this.positionCentre.lat.toString(),
          y: this.positionCentre.lng.toString(),
          adresse: this.adresse,
          ville: this.ville,
          iduser: localStorage.id
        })
        .then(res => {
          console.log(res.data);
          alert("Création de l'événement " + this.formData.titre + " réussi !");
          if (this.publik) {
            this.$router.push({ name: "Levent" });
          } else {
            this.$router.push({ name: "profil" });
          }
        })
        .catch(err => {
          alert("Création de l'événement " + this.formData.titre + " échoué !");
          console.log(err);
        });
    }
  },
  computed: {
    check: function() {
      if (this.publik) {
        return "public";
      } else {
        return "privé";
      }
    }
  }
};
</script>