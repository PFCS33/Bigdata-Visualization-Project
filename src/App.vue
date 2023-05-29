<template>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"> </component>
    </transition>
  </router-view>
</template>

<script>
export default {};
</script>

<style>
/* color:
#edd2ff
#270041
#3a0061
#3d008d
#71008d
#8d006e

*/
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Noto Sans SC", sans-serif;
}

html {
  /* Set rem */
  /* percentage of user-browser setting */
  font-size: 62.5%;
}

body {
  /* ------------------------------ Initial setup ----------------------------- */
  line-height: 1;
  font-weight: 400;
  color: #555;
  overflow: hidden;
  height: 100vh;
  /* -------------------------------------------------------------------------- */
}

#app {
  height: 100%;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
