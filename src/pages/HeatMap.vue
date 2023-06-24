<template>
  <div class="container">
    <BaseCard class="nav">
      <BaseButton class="btn" @click="mode = 0">单张静态图</BaseButton>
      <input
        v-model="selectedHour"
        type="number"
        min="0"
        max="8"
        @input="handleInput"
      />
      <BaseButton class="btn" @click="mode = 1">连续动图</BaseButton>
    </BaseCard>
    <BaseCard class="map-container">
      <HeatMapComponent
        v-if="showMap"
        :mode="mode"
        :selectedHour="selectedHour"
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
      hourNum: 9, //图个数
      dataSet: [],
      showMap: false,
      mode: 0,
      selectedHour: 0,
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
    handleInput() {
      // 根据范围调整选择的数字
      if (this.selectedHour < 0) {
        this.selectedHour = 0;
      } else if (this.selectedHour > 8) {
        this.selectedHour = 8;
      }
    },
  },
  computed: {
    getDrawData() {
      //const rest = this.dataSet[0];
      //console.log("rest", rest);

      return this.dataSet;
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

.btn {
  border-radius: 6px;
}
</style>
