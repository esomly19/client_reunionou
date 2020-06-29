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
  justify-content: space-around;
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
</style>
