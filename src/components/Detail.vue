<template>
  <div class="eventlist">
    <div v-if="load" class="loader"></div>
    <div v-if="!load">
      <div class="row">
        <div class="col-8 ga">
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
          <button
            type="button"
            class="btn btn-primary"
            v-clipboard:copy="message"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >Partager</button>
          <h1 class="text-center">{{event.titre}}</h1>
          <div id="calendar">
            <div id="calendar_header">
              <i class="icon-chevron-left"></i>
              <h1></h1>
              <i class="icon-chevron-right"></i>
            </div>
            <div id="calendar_weekdays"></div>
            <div id="calendar_content"></div>
          </div>
          <p>{{events}}</p>
        </div>
        <div class="col-4 dr">
          <ul>
            <li
              v-for="comment in comments"
              :key="comment.nom"
            >{{ comment.nom }}{{ comment.commentaire }}</li>
          </ul>
          <div>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#myModal"
              data-backdrop="true"
            >Commenter</button>

            <div
              class="modal fade"
              id="myModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <input
                      type="text"
                      id="name"
                      v-model="name"
                      name="name"
                      required
                      minlength="4"
                      maxlength="8"
                      size="10"
                      placeholder="nom"
                    />
                    <textarea id="name" v-model="description" name="name" />
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-success" v-on:click="commenter">Poster</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon, icon } from "leaflet";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
export default {
  name: "eventlist",
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      x: 0,
      y: 0,
      events: null,
      message:
        "https://warm-badlands-86536.herokuapp.com/evenement/" +
        this.$route.params.token,
      items: null,
      comments: null,
      name: "",
      description: "",
      ville: null,
      load: false,
      meteod: null,
      zoom: 10,
      url:
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
      positionCentre: {
        lat: 0,
        lng: 0
      },
      icon: icon({
        iconUrl: "http://pngimg.com/uploads/gps/gps_PNG74.png",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      center: {
        lat: 0,
        lng: 0
      }
    };
  },
  props: {},
  methods: {
    meteo() {
      console.log("METEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEOOOOOOOOOOOOOOOOOOOOO");
      let apiKey = "a579a57df9601dfb8d080dbd25538189";

      let options = "&lang=fr" + "&units=metric";
      let weatherUrl =
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        this.ville +
        options +
        "&APPID=" +
        apiKey;
      axios
        .get(weatherUrl)
        .then(res => {
          console.log("Données METEO " + res.data);
          this.meteod = res.data;
        })
        .catch(err => {
          console.log("CASSE");
          console.log(err);
        });
    },
    recupevents() {
      this.load = true;
      axios
        .get(
          "https://warm-badlands-86536.herokuapp.com/event/" +
            this.$route.params.token
        )
        .then(res => {
          console.log("Donnéesddd" + res.data.titre);
          this.center.lat = res.data.x;
          this.center.lng = res.data.y;
          this.positionCentre.lat = res.data.x;
          this.positionCentre.lng = res.data.y;
          this.ville = res.data.ville;
          this.events = res.data;
          this.load = false;
          //this.meteo();
        })
        .catch(err => {
          console.log("CASSE");
          console.log(err);
        });
    },
    participants() {
      axios
        .get(
          "https://warm-badlands-86536.herokuapp.com/participants/" +
            this.$route.params.token
        )
        .then(res => {
          console.log("Données" + res.data);
          this.items = res.data;
        })
        .catch(err => {
          console.log("CASSE");
          console.log(err);
        });
    },
    commentaires() {
      axios
        .get(
          "https://warm-badlands-86536.herokuapp.com/commentaires/" +
            this.$route.params.token
        )
        .then(res => {
          console.log("Données commentaires " + res.data);
          this.comments = res.data;
        })
        .catch(err => {
          console.log("CASSE");
          console.log(err);
        });
    },
    commenter() {
      axios
        .post("https://warm-badlands-86536.herokuapp.com/comment", {
          nom: this.name,
          token: this.$route.params.token,
          commentaire: this.description
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.recupevents();
    this.participants();
    this.commentaires();
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.modal.show {
  z-index: 100000 !important;
}

.modal-backdrop.show {
  z-index: 100000 !important;
}

.dr {
  height: 100%;
}

.ga {
  height: 100%;
}
#calendar {
  margin-left: auto;
  margin-right: auto;
  width: 320px;
  font-family: "Lato", sans-serif;
}
#calendar_weekdays div {
  display: inline-block;
  vertical-align: top;
}
#calendar_content,
#calendar_weekdays,
#calendar_header {
  position: relative;
  width: 320px;
  overflow: hidden;
  float: left;
  z-index: 10;
}
#calendar_weekdays div,
#calendar_content div {
  width: 40px;
  height: 40px;
  overflow: hidden;
  text-align: center;
  background-color: #ffffff;
  color: #787878;
}
#calendar_content {
  -webkit-border-radius: 0px 0px 12px 12px;
  -moz-border-radius: 0px 0px 12px 12px;
  border-radius: 0px 0px 12px 12px;
}
#calendar_content div {
  float: left;
}
#calendar_content div:hover {
  background-color: #f8f8f8;
}
#calendar_content div.blank {
  background-color: #e8e8e8;
}
#calendar_header,
#calendar_content div.today {
  zoom: 1;
  filter: alpha(opacity=70);
  opacity: 0.7;
}
#calendar_content div.today {
  color: #ffffff;
}
#calendar_header {
  width: 100%;
  height: 37px;
  text-align: center;
  background-color: #ff6860;
  padding: 18px 0;
  -webkit-border-radius: 12px 12px 0px 0px;
  -moz-border-radius: 12px 12px 0px 0px;
  border-radius: 12px 12px 0px 0px;
}
#calendar_header h1 {
  font-size: 1.5em;
  color: #ffffff;
  float: left;
  width: 70%;
}
i[class^="icon-chevron"] {
  color: #ffffff;
  float: left;
  width: 15%;
  border-radius: 50%;
}
</style>
