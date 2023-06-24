import * as d3 from "d3";

export default {
  namespaced: true,
  state() {
    return {
      drawData: null,
      selected: null,
      piechartData: null,
    };
  },
  getters: {
    drawData(state) {
      return state.drawData;
    },
    selected(state) {
      return state.selected;
    },
    piechartData(state) {
      return state.piechartData;
    },
  },
  mutations: {
    setDrawData(state, payload) {
      state.drawData = payload;
      // console.log("in mitation:", state.drawData);
    },
    setSelected(state, payload) {
      state.selected = payload;
    },
    setPiechartData(state, payload) {
      //console.log("mutation change");
      state.piechartData = payload;
    },
  },
  actions: {
    loadData(context, payload) {
      const path = `../../../public/data/queue/${payload.file}`;
      d3.csv(path, d3.autoType).then(function (data) {
        // 将字符串转换成数字
        data.forEach(function (d) {
          d["type1_num"] = +d["type1_num"];
          d["type10_num"] = +d["type10_num"];
          d["type3_num"] = +d["type3_num"];
          d["type4_num"] = +d["type4_num"];
          d["type6_num"] = +d["type6_num"];
        });
        //console.log("in actions:", data);
        context.commit("setDrawData", data);
      });
    },
  },
};
