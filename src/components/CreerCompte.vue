<template>
  <div class="card bg-light mx-auto" style="width: 30%;">
    <div class="card-header">Connexion</div>
    <div class="card-body">
      <div class="form-group">
        <label for="exampleInputEmail1">Votre email</label>
        <input type="email" class="form-control" aria-describedby="emailHelp" v-model="mail" />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Votre nom</label>
        <input type="text" class="form-control" aria-describedby="emailHelp" v-model="nom" />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Votre prenom</label>
        <input type="text" class="form-control" aria-describedby="emailHelp" v-model="prenom" />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Mot de passe</label>
        <input type="password" class="form-control" v-model="mdp" />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Comfirmer le mot de passe</label>
        <input type="password" class="form-control" v-model="mdp2" />
      </div>
      <button class="btn btn-info" v-on:click="newAccount()">Valider</button>
      <button type="submit" class="btn btn-primary" v-on:click="makeConnection()">Se connecter</button>
    </div>
    <modal name="err" :width="450" :height="400">
      <div class="card text-white bg-warning">
        <div class="card-header">Attention</div>
        <div class="card-body">
          <h5 class="card-title">Erreur lors de la connexion</h5>
          <p class="card-text">Vérifier votre mot de passe ou votre nom d'utilisateur</p>
          <p>{{erreur}}</p>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Connexion",
  data() {
    return {
      mail: "",
      prenom: "",
      nom: "",
      mdp: "",
      mdp2: "",
      erreur: ""
    };
  },
  mounted() {},
  methods: {
    makeConnection() {
      this.$router.push({ path: "/connexion" });
    },
    newAccount() {
      console.log("PRENOM : " + this.prenom);
      console.log("nom : " + this.nom);
      if (
        this.mail === null ||
        this.mail === "" ||
        this.mdp === null ||
        this.mdp === "" ||
        this.mdp !== this.mdp2
      ) {
        this.$modal.show("err");
      } else {
        axios
          .post("https://warm-badlands-86536.herokuapp.com/utilisateur", {
            email: this.mail,
            password: this.mdp,
            prenom: this.prenom,
            nom: this.nom
          })
          .then(res => {
            console.log(res.data);
            this.$router.push({ path: "/connexion" });
          })
          .catch(err => {
            this.$modal.show("err", { erreur: err });
          });
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->