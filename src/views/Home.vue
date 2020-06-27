<template>
  <div class="home">
    <div id="demo" width="100%" height="100%" class="carousel slide" data-ride="carousel">
      <ul class="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" class="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
      </ul>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/img/cal.jpg" alt="Los Angeles" width="100%" height="100%" />
          <div class="carousel-caption">
            <h3>Indiquez une date !</h3>
            <p>Grâce à l'outil reunionou.app</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/img/reun.jpg" alt="Chicago" width="100%" height="100%" />
          <div class="carousel-caption">
            <h3>Organiser des réunions simplement !</h3>
            <p>Grâce à l'outil reunionou.app</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/img/carte.jpg" alt="New York" width="100%" height="100%" />
          <div class="carousel-caption">
            <h3>Indiquez une adresse</h3>
            <p>Grâce à l'outil reunionou.app</p>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#demo" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </a>
      <a class="carousel-control-next" href="#demo" data-slide="next">
        <span class="carousel-control-next-icon"></span>
      </a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {}
};
</script>
<style>
.carousel-inner img {
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: 100%;
  height: 100%;
}
.carousel-caption {
  transform: translateY(-50%);
  bottom: 0;
  top: 50%;
  color: black;
}
</style>