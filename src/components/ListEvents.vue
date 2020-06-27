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
        .get("https://warm-badlands-86536.herokuapp.com/events")
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
.card {
  width: 300px;
  margin: 10px;
  background-color: white;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
}
.card:hover {
  margin-bottom: -10px;
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
}
.card__title {
  display: -webkit-box;
  max-height: 85px;
  overflow: hidden;
  font-family: "Playfair Display", serif;
  font-size: 23px;
  line-height: 28px;
  text-shadow: 0px 1px 5px black;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.card__snippet {
  display: -webkit-box;
  max-height: 150px;
  margin: 60px 0;
  overflow: hidden;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  line-height: 20px;
  text-overflow: ellipsis;
  transition: 0.5s ease-in-out;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
</style>
