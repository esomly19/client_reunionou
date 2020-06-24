<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Reunionou</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-item nav-link" to="/">Home</router-link>

          <router-link class="nav-item nav-link" to="/levent">Evenements</router-link>

          <router-link class="nav-item nav-link" to="/profil">Profil</router-link>
          <button
            v-if="isConnected()"
            type="button"
            class="btn btn-primary btn-sm"
            v-on:click="creer"
          >Créer un événement</button>
        </div>
      </div>

      <ul class="nav navbar-nav flex-row justify-content-between ml-auto">
        <router-link class="nav-item nav-link" to="/connexion">
          <p v-if="isConnected()" v-on:click="seDeconnecter">Se Déconnecter</p>
          <p v-else>Se Connecter</p>
        </router-link>
      </ul>
    </nav>

    <router-view />
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "App",

  data() {
    return {
      Email: null,
      EmailIns: null,
      pass: null,
      passIns: null,
      Nom: null,
      Prenom: null
    };
  },
  props: {},
  methods: {
    creer() {
      this.$router.push({ name: "Evenement" });
    },
    log() {
      var browsers = [
        "Firefox",
        "MSIE",
        "Trident",
        "Edge",
        "Chrome",
        "Safari",
        "Android"
      ];

      function getBrowser() {
        var ua = navigator.userAgent;
        for (var b in browsers) {
          b = browsers[b];
          if (ua.indexOf(b) != -1) return b;
        }
        return false;
      }

      var browser = getBrowser();
      if (browser == "Trident" || browser == "MSIE") browser = "IE/Edge";
      if (browser === false) {
        document.write("Navigateur inconnu.");
      } else {
        axios
          .post("https://warm-badlands-86536.herokuapp.com/log", {
            navigateur: browser,
            plateform: navigator.platform
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    seDeconnecter() {
      localStorage.removeItem("jwt");
      localStorage.removeItem("id");
      console.log(localStorage.getItem("jwt"));
      this.connected = false;
      this.$router.push({ name: "Home" });
    },
    isConnected() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {},
  mounted() {
    this.log();
  }
};
</script>
<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}
* {
  box-sizing: border-box;
}

/* Full-width input fields */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

/* Add a background color when the inputs get focus */
input[type="text"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for all buttons */
button {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity: 1;
}

/* Extra styles for the cancel button */
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
}

/* Float cancel and signup buttons and add an equal width */
.cancelbtn,
.signupbtn {
  float: left;
  width: 50%;
}

/* Add padding to container elements */
.container {
  padding: 16px;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: #474e5d;
  padding-top: 50px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* Style the horizontal ruler */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* The Close Button (x) */
.close {
  position: absolute;
  right: 35px;
  top: 15px;
  font-size: 40px;
  font-weight: bold;
  color: #f1f1f1;
}

.close:hover,
.close:focus {
  color: #f44336;
  cursor: pointer;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn,
  .signupbtn {
    width: 100%;
  }
}
</style>
