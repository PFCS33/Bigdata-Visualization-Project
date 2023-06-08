import { createRouter, createWebHistory } from "vue-router";

import WelcomePage from "./pages/WelcomePage.vue";
import RoadMap from "./pages/RoadMap.vue";
import HeatMap from "./pages/HeatMap.vue";

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
    {
      path: "/heatmap",
      component: HeatMap,
    },
  ],
});

export default router;
