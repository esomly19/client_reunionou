<template>
  <div class="eventlist">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="profile-usertitle">
            <div class="profile-usertitle-name">{{profil.nom}} {{profil.prenom}}</div>
            <div class="profile-usertitle-job">{{profil.email}}</div>
          </div>
        </div>
        <div class="col">
          <h2 class="text-center">Mes événements</h2>
          <div class="profile-content">
            <div class="card text-center" v-for="event in events" :key="event.id">
              <div class="card-body">
                <h5 class="card-title">{{event.titre}}</h5>
                {{event.adresse}}
                <br />
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button v-on:click="info(event)" class="btn btn-primary">Plus d'infos</button>
                  <button v-on:click="modifier(event)" class="btn btn-primary">modifier</button>
                </div>
                <div
                  class="card-footer text-muted"
                >{{new Date(event.date).getDate()}}/{{new Date(event.date).getMonth()+1}}/{{new Date(event.date).getFullYear()}}</div>
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
export default {
  name: "eventlist",
  components: {},
  data() {
    return {
      profil: null,
      events: null
    };
  },
  props: {},
  methods: {
    modifier(ev) {
      console.log("token" + ev);
      this.$router.push({ name: "Modif", params: { event: ev } });
    },
    recupeinfouser() {
      axios
        .get(
          "https://warm-badlands-86536.herokuapp.com/profiluser/" +
            localStorage.getItem("id")
        )
        .then(res => {
          console.log("Données" + res.data);
          this.profil = res.data.user;
        })
        .catch(err => {
          console.log("CASSE");
          console.log(err);
        });
    },
    info(info) {
      this.$router.push({ name: "detail", params: { token: info } });
    },
    recupeeventsuser() {
      axios
        .get(
          "https://warm-badlands-86536.herokuapp.com/eventuser/" +
            localStorage.getItem("id")
        )
        .then(res => {
          console.log("Données" + res.data);
          this.events = res.data.events;
        })
        .catch(err => {
          console.log("CASSE");
          console.log(err);
        });
    }
  },
  mounted() {
    this.recupeinfouser();
    this.recupeeventsuser();
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
  height: 100%;
}
body {
  display: flex;
  flex-direction: column;
  background: #f1f3fa;
}
body {
  overflow-x: hidden;
}
#mainNav {
  background-color: darkslategrey;
  color: white;
}
#mainNav .navbar-brand {
  color: #fed136;
  font-family: "Kaushan Script", "Helvetica Neue", Helvetica, Arial, cursive;
}

.content {
  flex: 1 0 auto;
}
.footer {
  flex-shrink: 0;
}

footer {
  text-align: center;
  background-color: white;
}
.ft {
  padding-left: 22px;
  padding-right: 31px;
}

footer span.copyright {
  font-size: 90%;
  line-height: 40px;
  text-transform: none;
  font-family: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: blak;
}

footer ul.quicklinks {
  font-size: 90%;
  line-height: 40px;
  margin-bottom: 0;
  text-transform: none;
  font-family: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

ul.social-buttons {
  margin-bottom: 0;
}

ul.social-buttons li a {
  font-size: 20px;
  line-height: 40px;
  display: block;
  width: 40px;
  height: 40px;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  color: white;
  border-radius: 100%;
  outline: none;
  background-color: #212529;
}

ul.social-buttons li a:active,
ul.social-buttons li a:focus,
ul.social-buttons li a:hover {
  background-color: #fed136;
}
.content {
  margin-top: 60px;
}

/* Profile container */
.profile {
  margin: 20px 0;
}

/* Profile sidebar */
.profile-sidebar {
  padding: 20px 0 10px 0;
  background: #fff;
}

.profile-userpic img {
  float: none;
  display: block;
  margin: auto;
  width: 50%;
  height: 50%;
  -webkit-border-radius: 50% !important;
  -moz-border-radius: 50% !important;
  border-radius: 50% !important;
}

.profile-usertitle {
  text-align: center;
  margin-top: 20px;
}

.profile-usertitle-name {
  color: #5a7391;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 7px;
}

.profile-usertitle-job {
  text-transform: uppercase;
  color: #5b9bd1;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}

.profile-userbuttons {
  text-align: center;
  margin-top: 10px;
}

.profile-userbuttons .btn {
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 15px;
  margin-right: 5px;
}

.profile-userbuttons .btn:last-child {
  margin-right: 0px;
}

.profile-usermenu {
  margin-top: 30px;
}

.profile-usermenu ul li {
  border-bottom: 1px solid #f0f4f7;
}

.profile-usermenu ul li:last-child {
  border-bottom: none;
}

.profile-usermenu ul li a {
  color: #93a3b5;
  font-size: 14px;
  font-weight: 400;
}

.profile-usermenu ul li a i {
  margin-right: 8px;
  font-size: 14px;
}

.profile-usermenu ul li a:hover {
  background-color: #fafcfd;
  color: #5b9bd1;
}

.profile-usermenu ul li.active {
  border-bottom: none;
}

.profile-usermenu ul li.active a {
  color: #5b9bd1;
  background-color: #f6f9fb;
  border-left: 2px solid #5b9bd1;
  margin-left: -2px;
}

/* Profile Content */
.profile-content {
  padding: 20px;
  background: #fff;
  min-height: 460px;
}

.nav > li {
  position: relative;
  display: block;
}
</style>
