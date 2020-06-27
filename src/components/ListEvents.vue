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
body {
  background-color: #e6e6e6;
}

.container {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  transform: translateY(-50%) translateX(-50%);
}

.card {
  width: 300px;
  margin: 10px;
  background-color: white;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
}
.card:hover .card__caption {
  top: 50%;
  transform: translateY(-50%);
}
.card:hover .card__image {
  transform: translateY(-10px);
}
.card:hover .card__thumb::after {
  top: 0;
}
.card:hover .card__snippet {
  margin: 20px 0;
}
.card__thumb {
  position: relative;
  max-height: 500px;
  overflow: hidden;
}
.card__thumb::after {
  position: absolute;
  top: calc(100% - 140px);
  display: block;
  content: "";
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.5) 40%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: 0.3s;
}
.card__image {
  transition: 0.5s ease-in-out;
}
.card__caption {
  position: absolute;
  top: calc(100% - 110px);
  z-index: 1;
  padding: 0 20px;
  color: white;
  text-align: center;
  transition: 0.3s;
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
.card__button {
  display: inline-block;
  padding: 10px 20px;
  color: white;
  border: 1px solid white;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  text-decoration: none;
  transition: 0.3s;
}
.card__button:hover {
  color: black;
  background-color: white;
}

.disclaimer {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: "Roboto", sans-serif;
  font-size: 16px;
}
.disclaimer__link {
  color: #755d87;
  text-decoration: none;
}

/*# sourceMappingURL=levent.css.map */
</style>
