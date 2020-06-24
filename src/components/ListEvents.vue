<template>
  <div class="eventlist">
    <div class="conatiner flex">
      <div class="wrap">
        <div v-for="item in events" :key="item.id" class="card">
          <eventcard :soro="item" />
          <!--<div class="card-header">{{ item.titre }}</div>
          <div class="card-body">{{ item.description }}</div>
          <div class="card-footer">{{ item.date }}</div>
          <button v-on:click="detail(item.token)">Detail</button>-->
        </div>
      </div>
    </div>
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
      events: null
    };
  },
  props: {},
  methods: {
    recupevents() {
      axios
        .get("http://localhost:3000/events")
        .then(res => {
          console.log(res.data);
          this.events = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    detail(token) {
      this.$router.push({ name: "detail", params: { token: token } });
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

.card-deck {
  margin: 0 -15px;
  justify-content: space-between;
}

.card-deck .card {
  margin: 0 0 1rem;
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .card-deck .card {
    -ms-flex: 0 0 48.7%;
    flex: 0 0 48.7%;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .card-deck .card {
    -ms-flex: 0 0 32%;
    flex: 0 0 32%;
  }
}

@media (min-width: 992px) {
  .card-deck .card {
    -ms-flex: 0 0 24%;
    flex: 0 0 24%;
  }
}
body {
  font-family: "Roboto", sans-serif;
  background: #fff;
}
.conatiner {
  width: 100%;
  height: 500px;
}
.wrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}
.box {
  margin: 10px;
  width: 300px;
  height: 490px;
  text-align: center;
  border-radius: 3px;
  -webkit-transition: 200ms ease-in-out;
  -o-transition: 200ms ease-in-out;
  transition: 200ms ease-in-out;
  -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  background: rgba(126, 214, 192, 0.6);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}
.box:hover {
  margin-bottom: -10px;
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
}
.box h1 {
  color: black;
  padding: 30px;
  margin-top: 100px;
  text-align: center;
  font-weight: 100;
  font-size: 25px;
  background: rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
}
</style>
