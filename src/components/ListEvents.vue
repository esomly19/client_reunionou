<template>
  <div class="eventlist">
    <div class="conatiner flex">
      <div class="wrap">
        <div v-for="item in events" :key="item.id" class="card">
          <eventcard :soro="item" />
        </div>
        <nav>
          <Button class="page-link" v-on:click="previousPage()">previous</Button>
          <Button class="page-link" v-on:click="nextPage()">next</Button>
        </nav>
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
      events: null,
      page: 1,
      size: 10,
      numberofpages: 0,
      count: 0
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
      this.searchUsers();
    },
    previousPage() {
      if (this.page - 1 < 1) {
        this.page = 1;
      } else {
        this.page--;
      }
      this.searchUsers();
    },
    recupevents() {
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
</style>
