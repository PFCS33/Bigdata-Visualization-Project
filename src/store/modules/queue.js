import * as d3 from "d3";

export default {
  namespaced: true,
  state() {
    return {
      roadId: 0,
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
    roadId(state) {
      return state.roadId;
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
    setRoadId(state, paylaod) {
      state.roadId = paylaod;
    },
  },
  actions: {
    loadData(context, _payload) {
      const roadId = context.getters["roadId"];
      let file = null;
      if (roadId === 0) {
        file = "sum.csv";
      } else {
        file = `type_${roadId}.0.csv`;
      }
      const path = `../../../public/data/queue/${file}`;
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
        console.log("loadDone");
        console.log(data);
      });
    },
  },
};
