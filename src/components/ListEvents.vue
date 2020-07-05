<template>
  <div class="eventlist">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <input class="form-control width80" type="text" v-model="search" placeholder="Search.." />
        </div>

        <div class="col-2">
          <button class="btn btn-outline-dark" v-on:click="searchd()">Search</button>
        </div>
        <div class="col-2">
          <button class="btn btn-outline-dark" v-on:click="recupevents()">Afficher tout</button>
        </div>
        <div class="col-2">
          <router-link to="/createevent">
            <button class="btn btn-outline-dark">Créer un événement</button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="conatiner flex">
      <div v-if="!recherche && !dada" class="wrap">
        <div v-for="item in events" :key="item.id" class="card">
          <eventcard :soro="item" />
        </div>
      </div>
      <div v-if="recherche && !dada" dada class="wrap">
        <div v-for="item in events" :key="item.id" class="card">
          <eventcard :soro="item" />
        </div>
      </div>
      <div v-if="dada">Pas d'événements avec le nom : {{search}}</div>
    </div>
    <footer>
      <nav v-if="!dada" aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <Button class="page-link" v-on:click="previousPage()">previous</Button>
          </li>
          <li class="page-item">
            <Button class="page-link" v-on:click="nextPage()">next</Button>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import eventcard from "./evenementcard";
export default {
  name: "eventlist",
  components: { eventcard },
  data() {
    return {
      events: null,
      page: 1,
      size: 10,
      numberofpages: 0,
      count: 0,
      search: "",
      recherche: false,
      dada: false
    };
  },
  props: {},
  methods: {
    nextPage() {
      if (this.page + 1 > this.numberofpages) {
        this.page = this.numberofpages;
      } else {
        this.page++;
      }
      this.recupevents();
    },
    previousPage() {
      if (this.page - 1 < 1) {
        this.page = 1;
      } else {
        this.page--;
      }
      this.recupevents();
    },
    recupevents() {
      this.recherche = false;
      this.dada = false;
      axios
        .get(
          "https://warm-badlands-86536.herokuapp.com/events?page=" +
            this.page +
            "&size=10"
        )
        .then(res => {
          this.count = res.data.count;
          this.numberofpages = res.data.nbpage;
          this.events = res.data.events;
          console.log(this.events);
        })
        .catch(err => {
          console.log(err);
        });
    },
    detail(token) {
      this.$router.push({ name: "detail", params: { token: token } });
    },
    searchd() {
      this.recherche = true;
      axios
        .get(
          "https://warm-badlands-86536.herokuapp.com/events/" +
            this.search +
            "?page=" +
            this.page +
            "&size=10"
        )
        .then(res => {
          this.count = res.data.count;
          this.numberofpages = res.data.nbpage;

          if (res.data.count === 0) {
            this.dada = true;
          } else {
            this.events = res.data.events;
          }

          console.log(this.events);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.recupevents();
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  padding-top: 20px;
}

body {
  font-family: "Roboto", sans-serif;
  background: #fff;
}
.conatiner {
  width: 100%;
  height: 90%;
  overflow-y: hidden;
}
.wrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-start;
  margin-left: 25px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}
.cardmap {
  border-spacing: 50px;
  padding: 10px;
  background: rgba(242, 246, 248, 1);
}
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
}
</style>
