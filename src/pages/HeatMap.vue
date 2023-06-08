<template>
  <div class="container">
    <BaseCard class="nav"> </BaseCard>
    <BaseCard class="map-container">
      <HeatMapComponent
        v-if="showMap"
        :dataParam="getDrawData"
      ></HeatMapComponent>
    </BaseCard>
  </div>
</template>

<script>
import * as d3 from "d3";
import HeatMapComponent from "../components/HeatMapData/HeatMapComponent.vue";
export default {
  components: {
    HeatMapComponent,
  },
  data() {
    return {
      fileNamePrefix: "heatmap_data_time",
      hourNum: 1, //图个数
      dataSet: [],
      showMap: false,
    };
  },
  methods: {
    async loadData() {
      for (let i = 0; i < this.hourNum; i++) {
        let filePath = "./data/heatmap/" + this.fileNamePrefix + i + ".json";
        let data = await d3.json(filePath);
        this.dataSet.push(data);
      }
    },
  },
  computed: {
    getDrawData() {
      const rest = this.dataSet[0];
      //console.log("rest", rest);
      return rest;
    },
  },
  async created() {
    await this.loadData();
    this.showMap = true;
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.nav {
  margin: 1vw;
  display: flex;
  padding: 1vw;
  gap: 0.8vw;
}
.map-container {
  flex: 1 1 auto;
  margin: 1vw;
  padding: 1vw;
}
</style>
