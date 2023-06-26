<template>
  <div class="container">
    <IconButton
      labelstate
      size="large"
      icon="arrow_back"
      class="back-btn"
      @click="$router.push({ path: '/main' })"
    ></IconButton>
    <RateBubble></RateBubble>
  </div>
</template>

<script>
import RateBubble from "@/components/rate/RateBubble.vue";
export default {
  components: {
    RateBubble,
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  background: linear-gradient(91.58deg, #99e9f2 -8.01%, #96f2d7 105.39%);
  padding: 1vw;
}

.back-btn {
  position: fixed;
  top: 1;
  left: 1;
}
</style>
