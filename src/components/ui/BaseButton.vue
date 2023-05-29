<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot> </slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>

<style scoped>
button,
a {
  /* font-size: 14px; */
  font-size: 1.1vw;
  text-decoration: none;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.transparent {
  /* font-size: 12px; */
  font-size: 0.9vw;
  background-color: transparent;
  border: none;
  color: #3a0061;
}
.transparent:hover,
.transparent:active {
  background-color: transparent;
  color: #270041;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>
