<template>
  <div class="eventlist">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div v-if="load" class="loader"></div>
        <div v-if="!load">
          <h1 class="text-center">
            {{events.titre}}
            <div class="btn-group pull-right" role="group" aria-label="Basic example">
              <div class="dropdown">
                <button
                  class="btn btn-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fa fa-bars"></i>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <button
                    class="dropdown-item"
                    type="button"
                    data-toggle="modal"
                    data-target="#myModal"
                  >Commenter</button>
                  <button
                    type="button"
                    class="dropdown-item"
                    data-toggle="modal"
                    data-target="#ddd"
                  >Liste des commentaires</button>
                  <button
                    type="button"
                    class="dropdown-item"
                    data-toggle="modal"
                    data-target="#eeee"
                  >Liste des participants</button>
                </div>
              </div>
            </div>
          </h1>
          <p class="text-center">{{jour}} {{date.getDate()}} {{mois}} {{date.getFullYear()}}</p>
          <p v-if="meteook" class="text-center">{{meteod}} {{temp}}°c</p>

          <p
            v-if="!meteook"
            class="text-center"
          >Pas de données méteo pour cette événement, veuillez nous excusez.</p>

          <p>{{events.description}}</p>

          <p>{{nom}}</p>

          <div v-if="loadi" id="loading"></div>
          <ul class="social-icons pull-left">
            <li>
              <a v-on:click="gotweet()">
                <img src="../assets/img/Twitter_3.png" />
              </a>
            </li>

            <li>
              <a v-on:click="gofacebook()">
                <img src="../assets/img/Facebook_3.png" />
              </a>
            </li>
          </ul>
          <div class="btn-group pull-right" role="group" aria-label="Basic example">
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
            >
              <i class="fa fa-share-alt" aria-hidden="true"></i>
            </button>
          </div>
          <l-map
            style="height: 600px;  width:100%"
            :zoom="zoom"
            :center="center"
            :markerZoomAnimation="true"
          >
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="positionCentre" :draggable="false" :icon="icon"></l-marker>
            <l-marker
              v-for="poi in poilist"
              :key="poi.id"
              :lat-lng="[poi.positionX, poi.positionY]"
              :icon="icon2"
            ></l-marker>
            <l-routing-machine :waypoints="waypoints" />
          </l-map>
        </div>
      </div>
    </div>
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
            <h5 class="modal-title" id="exampleModalLongTitle">Commenter</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              id="exampleFormControlInput1"
              v-model="name"
              name="name"
              class="form-control"
              required
              placeholder="Nom"
            />
            <textarea
              rows="5"
              cols="60"
              class="form-control"
              id="exampleFormControlTextarea1"
              v-model="description"
              name="name"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="commenter"
              data-dismiss="modal"
            >Poster</button>
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
            <button
              type="button"
              class="btn btn-success"
              v-on:click="participer"
              data-dismiss="modal"
            >Participer</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Ne pas participer</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" id="ddd">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h1 class="modal-title">Commentaires</h1>
            <button type="button" class="close pull-right" data-dismiss="modal">×</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="comments-list" id="comm">
              <div class="comment" v-for="comment in comments" :key="comment.nom">
                <h4>{{ comment.nom }} dit</h4>
                <p>{{ comment.commentaire }}</p>
                <p
                  class="comment-time"
                >{{ datec.getDate() }}/{{ datec.getMonth()+1 }}/{{ datec.getFullYear() }}</p>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" id="eeee">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h1 class="modal-title">Participants</h1>
            <button type="button" class="close" data-dismiss="modal">×</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body"></div>
          <table class="table text-center table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Partipants</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="participant in participantes" :key="participant.nom">
                <td scope="col">{{ participant.nom }}</td>
              </tr>
            </tbody>
          </table>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import LRoutingMachine from "./LRoutingMachine";
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
    LMarker,
    LRoutingMachine
  },
  data() {
    return {
      twitter:
        "https://twitter.com/intent/tweet?url=https://reunionouapp.netlify.app/event/" +
        this.idevebt +
        "&text=Evénement%20crée%20via%20reunionou",

      facebook:
        "https://facebook.com/sharer.php?u=https://reunionouapp.netlify.app/event/" +
        this.idevebt,
      x: 0,
      y: 0,
      events: null,
      message:
        "https://reunionouapp.netlify.app/eventparticiper/" + this.idevebt,
      participantes: null,
      comments: null,
      name: "",
      description: "",
      ville: null,
      loadi: false,
      load: false,
      date: new Date(),
      datec: new Date(),
      meteod: null,
      temp: null,
      nom: null,
      zoom: 10,
      meteook: false,
      id: null,
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
      icon2: icon({
        iconUrl: "http://pngimg.com/uploads/gps/gps_PNG73.png",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      center: {
        lat: 0,
        lng: 0
      },
      namee: "",
      waypoints: [],
      location: null,
      gettingLocation: false,
      getLoc: false,
      errorStr: null,
      poilist: [],
      event: null,
      mois: "",
      jour: "",
      idevebt: null
    };
  },
  props: {},
  methods: {
    onCopy() {
      alert("Lien copié");
    },
    onError() {
      alert("Failed to copy texts");
    },
    getEvent() {
      this.event = this.$route.params.token;
      this.recupevents(this.event.token);
      this.commentaires();
      this.participants();
    },
    gotweet() {
      window.open(this.twitter);
    },
    gofacebook() {
      window.open(this.facebook);
    },
    meteo() {
      let apiKey = "a579a57df9601dfb8d080dbd25538189";

      let options = "&lang=fr" + "&units=metric";
      let weatherUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        this.ville +
        options +
        "&APPID=" +
        apiKey;
      axios
        .get(weatherUrl)
        .then(res => {
          console.log("Données METEO " + res.data);
          this.meteod = res.data.weather[0].description;
          let e = res.data.main.temp;
          this.temp = Math.floor(e);
          this.meteook = true;
        })
        .catch(err => {
          console.log("CASSE");
          console.log(err);
        });
    },
    jourd() {
      var jdaur = new Array();
      jdaur[1] = "Lundi";
      jdaur[2] = "Mardi";
      jdaur[3] = "Mercredi";
      jdaur[4] = "Jeudi";
      jdaur[5] = "Vendredi";
      jdaur[6] = "Samedi";
      jdaur[7] = "Dimanche";

      this.jour = jdaur[this.date.getDay()];
    },
    moisd() {
      var month = new Array();
      month[0] = "Janvier";
      month[1] = "Février";
      month[2] = "Mars";
      month[3] = "Avril";
      month[4] = "Mai";
      month[5] = "Juin";
      month[6] = "Juillet";
      month[7] = "Août";
      month[8] = "Septembre";
      month[9] = "Octobre";
      month[10] = "Novembre";
      month[11] = "Décembre";

      this.mois = month[this.date.getMonth()];
    },

    recupevents(toke) {
      this.load = true;
      axios
        .get("https://warm-badlands-86536.herokuapp.com/event/" + toke)
        .then(res => {
          console.log("Donnéesddd" + res.data.titre);
          this.center.lat = res.data.x;
          this.idevebt = res.data.id;
          this.message =
            "https://reunionouapp.netlify.app/eventparticiper/" + this.idevebt;
          this.facebook =
            "https://facebook.com/sharer.php?u=https://reunionouapp.netlify.app/event/" +
            this.idevebt;
          this.twitter =
            "https://twitter.com/intent/tweet?url=https://reunionouapp.netlify.app/event/" +
            this.idevebt +
            "&text=Evénement%20crée%20via%20reunionou";
          this.center.lng = res.data.y;
          this.date = new Date(res.data.date);
          this.moisd();
          this.jourd();
          this.positionCentre.lat = res.data.x;
          this.positionCentre.lng = res.data.y;
          if (this.getLoc) {
            this.waypoints = [
              {
                lat: this.location.coords.latitude,
                lng: this.location.coords.longitude
              },
              { lat: this.positionCentre.lat, lng: this.positionCentre.lng }
            ];
          }
          this.ville = res.data.ville;
          this.events = res.data;
          this.id = res.data.iduser;
          this.load = false;
          this.meteo();
          this.userdata(this.id);
          this.getPoi(this.ville);
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
            this.event.token
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
          token: this.event.token
        })
        .then(res => {
          console.log(res.data);
          this.participants();
        })
        .catch(err => {
          console.log(err);
        });
    },
    commentaires() {
      axios
        .get(
          "https://warm-badlands-86536.herokuapp.com/commentaires/" +
            this.event.token
        )
        .then(res => {
          console.log("Données commentaires " + res.data);

          this.comments = res.data.comments;
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
          token: this.event.token,
          commentaire: this.description
        })
        .then(res => {
          console.log(res.data);
          this.commentaires();
        })
        .catch(err => {
          console.log(err);
        });
    },
    userdata(id) {
      console.log("ddddddddddddddddddddddddddd");
      axios
        .get("https://warm-badlands-86536.herokuapp.com/user/" + id)
        .then(res => {
          console.log(res.data);

          this.nom = res.data.nom;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPoi(ville) {
      this.loadi = true;
      axios
        .get(
          `https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:60];area["boundary"~"administrative"]["name"~` +
            ville +
            `];node(area)["amenity"~"cafe"];out;`
        )
        .then(res => {
          this.loadi = false;
          console.log(res.data.elements);
          let poi = res.data.elements;

          let poiii = {};
          poi.forEach(value => {
            poiii = {
              id: value.id,
              desc: value.tags.name,
              positionX: value.lat,
              positionY: value.lon
            };
            this.poilist.push(poiii);
            poiii = {};
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getEvent();
  },
  created() {
    //do we support geolocation
    if (!("geolocation" in navigator)) {
      this.errorStr = "Geolocation is not available.";
      return;
    }

    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.gettingLocation = false;
        this.getLoc = true;
        this.location = pos;
      },
      err => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      }
    );
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.eventlist {
  width: 100%;
  overflow-x: hidden;
}
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

.social-icons {
  text-align: left;
  margin-left: -40px;
  margin-bottom: -15px;
}
.social-icons li {
  display: inline-block;
  list-style-type: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}
.social-icons li a {
  border-bottom: none;
}
.social-icons li img {
  width: 40px;
  height: 40px;
  margin-right: 2px;
}

#loading {
  display: inline-block;
  width: 25px;
  height: 25px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: black;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
