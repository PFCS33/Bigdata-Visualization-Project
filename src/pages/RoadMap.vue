<template>
  <div class="container">
    <BaseCard class="nav">
      <div class="form-control">
        <input
          id="boundary"
          name="boundary"
          type="checkbox"
          v-model="selectedMaps"
          value="boundary"
        />
        <label for="boundary">boundary</label>
      </div>
      <div class="form-control">
        <input
          id="crosswalk"
          name="crosswalk"
          type="checkbox"
          v-model="selectedMaps"
          value="crosswalk"
        />
        <label for="crosswalk">crosswalk</label>
      </div>
      <div class="form-control">
        <input
          id="lane"
          name="lane"
          type="checkbox"
          v-model="selectedMaps"
          value="lane"
        />
        <label for="lane">lane</label>
      </div>
      <div class="form-control">
        <input
          id="signal"
          name="signal"
          type="checkbox"
          v-model="selectedMaps"
          value="signal"
        />
        <label for="signal">signal</label>
      </div>
      <div class="form-control">
        <input
          id="stopline"
          name="stopline"
          type="checkbox"
          v-model="selectedMaps"
          value="stopline"
        />
        <label for="stopline">stopline</label>
      </div>

      <div class="form-control">
        <input
          type="roadSec"
          id="roadSec"
          :min="0"
          :max="134"
          placeholder="[0,134]"
          v-model="roadSec"
          @input="handleInput"
          class="number-input-box"
        />
        <label for="roadSec">路段</label>
      </div>
      <BaseButton @click="resetData" class="btn"> 重置</BaseButton>
      <BaseButton @click="setAllData" class="btn"> 全选</BaseButton>
    </BaseCard>
    <BaseCard class="map-container">
      <MapComponent
        v-if="showMap"
        :dataParam="getDrawData"
        :roadSec="roadSec"
      ></MapComponent>
    </BaseCard>
  </div>
</template>

<script>
import * as d3 from "d3";
import MapComponent from "../components/roadData/MapComponent.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
export default {
  components: {
    MapComponent,
    BaseButton,
  },
  data() {
    return {
      fileNames: [
        "processed_boundaryroad_with9road.geojson",
        "processed_laneroad_with9road.geojson",
        "processed_crosswalkroad_with9road.geojson",
        "processed_signalroad_with9road.geojson",
        "processed_stoplineroad_with9road.geojson",
      ],
      // fileNames: ["test.geojson"],
      selectedMaps: [],
      dataSet: [],
      roadSec: 0,
    };
  },
  methods: {
    loadData() {
      this.fileNames.forEach((fileName) => {
        const filePath = "./data/processed/" + fileName;
        d3.json(filePath).then((data) => {
          this.dataSet.push(data);
        });
      });
      //console.log(this.dataSet);
    },
    resetData() {
      this.selectedMaps = [];
    },
    setAllData() {
      this.selectedMaps = [
        "boundary",
        "crosswalk",
        "lane",
        "signal",
        "stopline",
      ];
    },
    handleInput() {
      // 根据范围调整选择的数字
      if (this.roadSec < 0) {
        this.roadSec = 0;
      } else if (this.roadSec > 134) {
        this.roadSec = 134;
      }
    },
  },
  computed: {
    /* -------------------------------------------------------------------------- */
    // 传送进入map的数据
    /* -------------------------------------------------------------------------- */
    getDrawData() {
      let dataSum = [];
      this.dataSet.forEach((data) => {
        //console.log(data);
        //传入的data是完整的geojson结构
        if (this.selectedMaps.includes(data.name)) {
          dataSum.push(data);
        }
      });
      //console.log(dataSum);
      console.log(dataSum);
      return dataSum;
    },
    showMap() {
      return this.getDrawData.length > 0;
    },
  },
  created() {
    this.loadData();
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
.btn {
  border-radius: 6px;
}
.form-control {
  display: flex;
  align-items: center;
  gap: 0.2vw;
  font-size: 1vw;
  color: #71008d;
}
.map-container {
  flex: 1 1 auto;
  margin: 1vw;
  padding: 1vw;
}

.number-input-box {
  width: 3vw;
}
</style>
