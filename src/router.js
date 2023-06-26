import { createRouter, createWebHistory } from "vue-router";

import WelcomePage from "./pages/WelcomePage.vue";
import RoadMap from "./pages/RoadMap.vue";
import HeatMap from "./pages/HeatMap.vue";
import RoadChartPage from "./pages/RoadChartPage.vue";
// import BubbleChart from "./components/queueData/BubbleChart.vue";
import RoadChart from "./components/queueData/RoadChart.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/main",
    },
    {
      path: "/main",
      component: RoadMap,
    },
    {
      path: "/roadmap",
      component: RoadMap,
    },
    {
      path: "/heatmap",
      component: HeatMap,
    },
    {
      path: "/welcome",
      component: WelcomePage,
    },
    {
      path: "/roadchart",
      component: RoadChartPage,
    },
    {
      path: "/test",
      component: RoadChart,
    },
  ],
});

export default router;
