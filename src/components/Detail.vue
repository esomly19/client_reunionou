<template>
  <div class="eventlist">
    <div v-if="load" class="loader"></div>
    <div v-if="!load">
      <div class="row">
        <div class="col-8 ga">
          <l-map
            style="height: 600px;  width:100%"
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
            class="btn btn-light"
            data-toggle="modal"
            data-target="#participer"
            data-backdrop="true"
          >Participer</button>
          <button
            type="button"
            class="btn btn-dark"
            v-clipboard:copy="message"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >Partager</button>
          <h1 class="text-center">{{events.titre}}</h1>
          <p>{{events.description}}</p>
          <p>{{events.date}}</p>
          <p>{{events.iduser}}</p>
        </div>
        <div class="col-4 dr">
          <div class="comments-list" id="comm">
            <div class="comment" v-for="comment in comments" :key="comment.nom">
              <h4>{{ comment.nom }} dit</h4>
              <p>{{ comment.commentaire }}</p>
              <p class="comment-time">{{ comment.date }}</p>
            </div>
          </div>

          <div>
            <button
              type="button"
              class="btn btn-secondary"
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
          <div class="w-100"></div>
          <div class="col-12 dr" id="parti">
            <table class="table text-center table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">Partipants</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th
                    scope="row"
                    v-for="participant in participantes"
                    :key="participant.nom"
                  >{{ participant.nom }}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="participer"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Participer à {{events.titre}}</h5>
            <button type="button" class="close right" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              id="name"
              v-model="namee"
              name="name"
              required
              minlength="4"
              maxlength="8"
              size="10"
              placeholder="nom"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" v-on:click="participer">Participer</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Ne pas participer</button>
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
        "https://5efda2e434512975b2190cb6--clever-colden-64ff33.netlify.app/event/" +
        this.$route.params.token,
      participantes: null,
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
      },
      namee: ""
    };
  },
  props: {},
  methods: {
    meteo() {
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
          this.participantes = res.data;
        })
        .catch(err => {
          console.log("CASSE");
          console.log(err);
        });
    },
    loadModal() {
      "#myModal".modal("show");
    },
    participer() {
      axios
        .post("https://warm-badlands-86536.herokuapp.com/participe", {
          nom: this.namee,
          token: this.$route.params.token
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
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
    this.commentaires();
    this.participants();
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
.comments {
  width: 500px;
  max-width: 80%;
  background: #fff;
  padding: 20px 30px;
  border-radius: 5px;
}

.comments-list {
  margin-top: 30px;
  height: 50%;
  overflow-y: hidden;
}
.comment {
  position: relative;
  border-top: 1px dotted #bbb;
  padding: 10px 20px;
}
.comment-time {
  position: absolute;
  top: 2px;
  right: 20px;
  color: #777;
}
h4 {
  margin-top: 10px;
}
html {
  height: 100%;
  overflow-y: hidden;
  width: 100%;
  overflow-x: hidden;
}

#parti {
  height: 30%;
  overflow-y: hidden;
}
#comm {
  height: 70%;
  overflow-y: hidden;
}
</style>
