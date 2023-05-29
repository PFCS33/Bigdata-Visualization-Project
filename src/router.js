import { createRouter, createWebHistory } from "vue-router";

import WelcomePage from "./pages/WelcomePage.vue";
import RoadMap from "./pages/RoadMap.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/welcome",
    },
    {
      path: "/welcome",
      component: WelcomePage,
    },
    {
      path: "/roadmap",
      component: RoadMap,
    },
  ],
});

export default router;
