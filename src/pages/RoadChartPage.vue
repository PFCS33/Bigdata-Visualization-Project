<template>
  <div class="container">
    <IconButton
      labelstate
      size="large"
      icon="arrow_back"
      class="back-btn"
      @click="$router.push({ path: '/main' })"
    ></IconButton>

    <RoadChart></RoadChart>
  </div>
</template>
<script>
import RoadChart from "../components/queueData/RoadChart.vue";
export default {
  components: { RoadChart },
};
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  align-items: center;
  padding-top: 2vw;
  background: linear-gradient(91.58deg, #99e9f2 -8.01%, #96f2d7 105.39%);
}
.back-btn {
  position: fixed;
  top: 1%;
  left: 1%;
}
</style>
