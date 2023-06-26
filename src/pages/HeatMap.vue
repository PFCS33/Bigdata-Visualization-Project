<template>
  <div
    class="container"
    :class="{ detailMode: detailMode }"
    @transitionend="handleTransitionEnd"
  >
    <IconButton
      labelstate
      size="large"
      icon="arrow_back"
      class="back-btn"
      @click="$router.push('/main')"
    ></IconButton>
    <Card class="nav" :class="{ detailMode: detailMode }">
      <DecoratedIcon labelstate></DecoratedIcon>
      <div class="slider-demo-block slider">
        <span class="demonstration">时间</span>
        <el-slider
          v-model="selectedHour"
          :step="1"
          show-stops
          :max="7"
          :marks="marks"
          :disabled="mode ? true : false"
        />
      </div>
      <Button
        label="Detail "
        size="large"
        icon
        labelstate
        @click="toggleDetailMode"
      />
    </Card>
    <Card class="map-container">
      <ToggleButton @selected="handleSelected" labelstate A="Stop" B="Move">
      </ToggleButton>
      <HeatMapComponent
        v-if="showMap && animationDone"
        :mode="mode"
        :detailMode="detailMode"
        :selectedHour="selectedHour"
        :dataParam="getDrawData"
      ></HeatMapComponent>
    </Card>
    <Card class="img-box" :class="{ detailMode: detailMode }"
      ><img
        src="/public/data/heatmap/heatmap.png"
        alt="heatmap of road"
        class="img"
        v-show="detailMode && animationDone"
    /></Card>
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
      mode: false,
      selectedHour: 0,
      marks: {
        0: "0H",
        1: "1H",
        2: "2H",
        3: "3H",
        4: "4H",
        5: "5H",
        6: "6H",
        7: "7H",
        label: "50%",
      },
      detailMode: false,
      animationDone: true,
    };
  },
  methods: {
    toggleDetailMode() {
      this.detailMode = !this.detailMode;
      this.animationDone = false;
    },
    async loadData() {
      for (let i = 0; i < this.hourNum; i++) {
        let filePath = "./data/heatmap/" + this.fileNamePrefix + i + ".json";
        let data = await d3.json(filePath);
        this.dataSet.push(data);
      }
    },
    // handleInput() {
    //   // 根据范围调整选择的数字
    //   if (this.selectedHour < 0) {
    //     this.selectedHour = 0;
    //   } else if (this.selectedHour > 8) {
    //     this.selectedHour = 8;
    //   }
    // },
    toggleMode() {
      this.mode = !this.mode;
    },
    handleSelected(payload) {
      this.mode = payload === "A" ? false : true;
    },
    handleTransitionEnd(event) {
      console.log("transitionDone", this.detailMode);
      if (event.target === this.$el) {
        // 动画结束后执行相关操作，比如创建图表
        this.animationDone = true;
        //console.log("animationDone");
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
.slider {
  flex: 1;
}
.slider-demo-block {
  display: flex;
  align-items: center;
  gap: 3vw;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
  flex: 1 1 auto;
}
.slider-demo-block .demonstration {
  font-size: 1.5vw;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  /* flex: 1; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 85%;
}
</style>
<style scoped>
.container {
  /* display: flex;
  flex-direction: column; */
  height: 100%;

  padding: 1.2vw;
  background: linear-gradient(91.58deg, #99e9f2 -8.01%, #96f2d7 105.39%);
  display: grid;
  grid-template-columns: 1fr 0fr;
  grid-template-rows: 0.1fr 1fr;
  row-gap: 1vw;
  transition: all 0.5s ease-in-out;
}

.container.detailMode {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.1fr 1fr;
  column-gap: 1vw;
}
.nav {
  display: flex;
  padding: 1vw;
  gap: 0.8vw;
  justify-content: center;
  grid-row: 1;
  grid-column: 1/-1;
}

.map-container {
  /* flex: 1 1 auto; */

  grid-row: 2;
  grid-column: 1;
  margin-top: 0;
  padding: 1vw;
}

.img-box {
  grid-row: 2;
  grid-column: 2;
}
.img-box.detailMode {
  padding: 5vw;
}
.img {
  width: 100%;
  height: 100%;
}
.btn {
  border-radius: 6px;
}
.icon {
  height: 35px;
  width: 35px;
}
.back-btn {
  position: fixed;
  bottom: 5%;
  right: 3%;
  z-index: 10;
}
</style>
