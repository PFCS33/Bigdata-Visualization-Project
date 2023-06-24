import { createStore } from "vuex";
import queueModule from "./modules/queue";

const store = createStore({
  modules: {
    queue: queueModule,
  },
});

export default store;
