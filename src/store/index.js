import { createStore } from "vuex";
import queueModule from "./modules/queue";
import roadModule from "./modules/road";
const store = createStore({
  modules: {
    road: roadModule,
    queue: queueModule,
  },
});

export default store;
