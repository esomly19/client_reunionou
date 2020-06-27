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
  position: relative;

  height: 170px;
  background: url("https://image.freepik.com/free-vector/colorful-gradient-liquid-shapes-background_23-2148250143.jpg"),
    #ffffff;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 25px;
  margin: 10px;
  transition: 0.25s ease-in;
}

.card .overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 170px;
  background: linear-gradient(
    120.55deg,
    rgba(39, 39, 39, 0.38) 0%,
    rgba(39, 39, 39, 0.2394) 100%
  );
  border-radius: 25px;
}

.card .content {
  position: absolute;
  bottom: 10px;
  left: 25px;
}

.card .content h4 {
  font-family: Ubuntu;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  color: #f2f2f2;
  margin-bottom: 10px;
  margin-top: 0;
}

.card .content h6 {
  font-family: Ubuntu;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #f2f2f2;
  margin-bottom: 10px;
  margin-top: 0;
}

.card .fav {
  position: absolute;
  top: 25px;
  right: 25px;
  cursor: pointer;
}

.card .fav i {
  color: white;
}

.card:hover {
  transform: scale(1.05);
}

.card:hover {
  background-position: top;
}
</style>
