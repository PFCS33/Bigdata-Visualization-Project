<template>
  <div
    class="container"
    :class="{ 'queue-mode': queueMode }"
    @transitionend="handleTransitionEnd"
  >
    <transition name="nav">
      <div class="nav" v-if="!editMode && !queueMode">
        <Card class="title" labelstate>
          <Title></Title>
        </Card>
        <FancyButton :color="'#96f2d7'" @click="toggleQueueMode"
          >排队车辆</FancyButton
        >

        <FancyButton :color="'#96f2d7'" @click="GotoHeatmap"
          >热力图</FancyButton
        >
      </div>
    </transition>
    <transition name="slide">
      <Card class="menu" v-if="editMode">
        <div class="form-box">
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
              type="number"
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
        </div>
        <div class="btn-box">
          <BaseButton @click="resetData" class="btn"> 重置</BaseButton>
          <BaseButton @click="setAllData" class="btn"> 全选</BaseButton>
        </div>
      </Card>
    </transition>
    <Card
      class="map-container"
      :class="{ 'edit-mode': editMode, 'queue-mode': queueMode }"
    >
      <IconButton
        @click="toggleEditMode"
        labelstate
        class="edit-btn"
        size="large"
        v-if="!queueMode"
      >
      </IconButton>
      <button class="quit-edit-btn" @click="toggleQueueMode" v-if="queueMode">
        <svg
          t="1687710814049"
          class="icon quit-icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2268"
        >
          <path
            d="M149.333333 394.666667c17.066667 0 32-14.933333 32-32v-136.533334l187.733334 187.733334c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c12.8-12.8 12.8-32 0-44.8l-187.733333-187.733334H362.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H149.333333c-4.266667 0-8.533333 0-10.666666 2.133334-8.533333 4.266667-14.933333 10.666667-19.2 17.066666-2.133333 4.266667-2.133333 8.533333-2.133334 12.8v213.333334c0 17.066667 14.933333 32 32 32zM874.666667 629.333333c-17.066667 0-32 14.933333-32 32v136.533334L642.133333 597.333333c-12.8-12.8-32-12.8-44.8 0s-12.8 32 0 44.8l200.533334 200.533334H661.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h213.333334c4.266667 0 8.533333 0 10.666666-2.133334 8.533333-4.266667 14.933333-8.533333 17.066667-17.066666 2.133333-4.266667 2.133333-8.533333 2.133333-10.666667V661.333333c2.133333-17.066667-12.8-32-29.866666-32zM381.866667 595.2l-200.533334 200.533333V661.333333c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v213.333334c0 4.266667 0 8.533333 2.133334 10.666666 4.266667 8.533333 8.533333 14.933333 17.066666 17.066667 4.266667 2.133333 8.533333 2.133333 10.666667 2.133333h213.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32h-136.533333l200.533333-200.533333c12.8-12.8 12.8-32 0-44.8s-29.866667-10.666667-42.666666 0zM904.533333 138.666667c0-2.133333 0-2.133333 0 0-4.266667-8.533333-10.666667-14.933333-17.066666-17.066667-4.266667-2.133333-8.533333-2.133333-10.666667-2.133333H661.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h136.533334l-187.733334 187.733333c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466667-8.533333l187.733333-187.733333V362.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V149.333333c-2.133333-4.266667-2.133333-8.533333-4.266667-10.666666z"
            p-id="2269"
          ></path>
        </svg>
      </button>
      <Button
        label="check main trail"
        v-if="queueMode"
        class="jump-to-road-btn"
        size="small "
        @click="$router.push('/roadchart')"
      >
      </Button>
      <MapComponent
        v-if="loadDone"
        :editMode="editMode"
        :dataParam="drawData"
        :roadSec="roadSec"
        @center-click="handleCenterClick"
      ></MapComponent>
    </Card>
    <Card
      class="view-box1"
      :class="{ 'padding-card': queueMode, 'no-border': !queueMode }"
    >
      <Card v-if="queueMode && animationDone" class="roadId-label">
        当前路段号: {{ roadId }}
      </Card>

      <QueueChart v-if="queueMode && animationDone"></QueueChart>
    </Card>
    <Card
      class="view-box2"
      :class="{ 'padding-card': queueMode, 'no-border': !queueMode }"
    >
      <QueuePiechart v-if="queueMode && animationDone"></QueuePiechart>
    </Card>
    <!-- <BaseCard class="view-box3" :class="{ 'roadId-label': queueMode }">
      <span v-if="queueMode && animationDone"> RoadId: {{ roadId }} </span>
    </BaseCard> -->
  </div>
</template>

<script>
import * as d3 from "d3";
import MapComponent from "../components/roadData/MapComponent.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import Title from "@/components/TheTitle.vue";
import QueueChart from "@/components/queueData/QueueChart.vue";
import QueuePiechart from "@/components/queueData/QueuePiechart.vue";
export default {
  provide() {
    return {
      setShowMap: this.setShowMap,
    };
  },
  components: {
    MapComponent,
    BaseButton,
    Title,
    QueueChart,
    QueuePiechart,
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
      selectedMaps: ["boundary", "crosswalk", "lane", "signal", "stopline"],
      dataSet: [],
      roadSec: 0,
      editMode: false,
      queueMode: false,

      showMap: false,
      drawData: null,
      loadDone: false,
      animationDone: false,
      swichMode: false,
    };
  },
  computed: {
    roadId() {
      return this.$store.getters["queue/roadId"];
    },
  },
  methods: {
    // loadData() {
    //   this.fileNames.forEach((fileName) => {
    //     const filePath = "./data/processed/" + fileName;
    //     d3.json(filePath).then((data) => {
    //       this.dataSet.push(data);
    //     });
    //   });
    //   this.loadDone = true;
    //   console.log("data", this.dataSet);
    // },
    loadData() {
      const promises = this.fileNames.map((fileName) => {
        const filePath = "./data/processed/" + fileName;
        return d3.json(filePath); // 返回一个Promise对象
      });

      Promise.all(promises)
        .then((dataSet) => {
          this.dataSet = dataSet; // 将所有数据保存到dataSet数组中
          this.drawData = this.getDrawData();
          this.loadDone = true;
          this.showMap = true;
          //console.log("data", this.dataSet);
        })
        .catch((error) => {
          console.error(error);
        });
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
    toggleEditMode() {
      this.editMode = !this.editMode;

      if (this.editMode === false) {
        this.setAllData();
      }

      this.drawData = this.getDrawData();
    },
    GotoHeatmap() {
      this.$router.push("/heatmap");
    },
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

      return dataSum;
    },
    setShowMap() {
      // console.log("set");
      this.showMap = true;
    },
    toggleQueueMode() {
      this.queueMode = !this.queueMode;
      this.swichMode = !this.swichMode;
      this.animationDone = false;
    },

    handleTransitionEnd(event) {
      if (event.target === this.$el) {
        // 动画结束后执行相关操作，比如创建图表
        this.animationDone = true;
        //console.log("animationDone");
      }
    },
    handleCenterClick() {
      if (this.swichMode) {
      } else {
        this.toggleQueueMode();
      }
    },
  },
  watch: {
    selectedMaps() {
      this.drawData = this.getDrawData();
    },
  },

  created() {
    this.loadData();
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100vw;
  background-color: #fff;
  display: grid;
  grid-template-columns: 0fr 1fr;
  grid-template-rows: 0fr 1fr;
  transition: all 0.5s ease-in-out;

  /* background: linear-gradient(91.58deg, #6bcedc -8.01%, #71e2dc 105.39%); */
  background: linear-gradient(91.58deg, #99e9f2 -8.01%, #96f2d7 105.39%);
  padding: 1vw;
}

.container.queue-mode {
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1.5fr 1fr;
  gap: 1vw;
  padding: 1vw 1vw;
}

.view-box1 {
  /* grid-row: 2/-1; */
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 1vw;

  /* border: 1px solid #000; */
}

.view-box2 {
  /* border: 1px solid #000; */
  /* grid-row: 1/3; */
  grid-row: 1;
  /* grid-column: 2; */
  grid-column: 2;
}

.no-border {
  border: none !important;
}

.roadId-label {
  padding: 1vw;
  width: 100%;
  font-size: 2vw;
  text-align: center;
}
.title {
  position: fixed;
  top: 1%;
  left: 38%;
  padding: 1vw;
  color: #67b39c;
  /* border: 2px solid #fff; */
}
.nav {
  /* grid-column: 1/-1; */
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 10%;
  display: flex;
  justify-content: space-between;

  padding: 1.2vw 25vw;
  gap: 2vw;
  color: #fff;
  /* background-color: #3d354bd6; */
  background-color: #5b4965cd;
  background: linear-gradient(91.58deg, #53e1b6d2 -8.01%, #b075cfcd 105.39%);
  background: radial-gradient(circle, #53e1b6d2, #b075cfcd);

  /* background: linear-gradient(91.58deg, #99e9f2c1 -8.01%, #96f2d6d2 105.39%); */
  /* border: 8px solid #a7e2d0; */
  /* border-top: none; */
  border-radius: 0 0 12px 12px;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.26);
  z-index: 10;
  /* background-color: rgb(204, 93, 232, 0.6); */
  /* background-color: rgb(174, 62, 201, 0.6); */
}

.edit-btn {
  position: fixed;
  right: 3%;
  bottom: 10%;
}

.padding-card {
  padding: 1.6rem 2.4rem;
}

.map-container {
  flex: 1 1 auto;
  /* margin: 1vw; */
  /* padding: 1vw; */
  height: 100%;
  width: 100%;

  /* grid-row: 3; */
  grid-row: 2;
  grid-column: 2;
  background: linear-gradient(158.17deg, #f3f5fa -1.94%, #ebedf2 102.24%);
  position: relative;
}

.menu {
  /* margin: 1vw; */
  display: flex;
  flex-direction: column;
  padding: 1vw;
  gap: 0.8vw;

  position: fixed;
  top: 12%;
  left: 0;
  height: fit-content;
  width: 8%;
  transition: transform 1s ease; /* 添加过渡效果 */
  z-index: 10;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 1vw;
  margin-top: 1vw;
}
.btn-box {
  display: flex;
  flex-direction: column;
  gap: 0.7vw;
  margin-top: 1vw;
  margin-right: 1vw;
}
.btn {
  border-radius: 6px;
}

.menu-btn {
  /* margin-right: auto; */
}

.menu-btn-content {
  display: flex;
  align-items: center;
  gap: 0.5vw;
}

.form-control {
  display: flex;
  align-items: center;
  gap: 0.2vw;
  font-size: 1vw;
  color: #6a9185;
}
.quit-icon {
  width: 30px;
  height: 30px;
  fill: #76d7ba;
}
.quit-icon:hover,
.quit-icon:active {
  fill: #67caac;
}
.quit-edit-btn {
  left: 5%;
  top: 5%;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
}
.jump-to-road-btn {
  position: absolute;
  left: 15%;
  top: 5%;
}
.number-input-box {
  width: 3vw;
}

.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.3s ease-in;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-200px); /* 初始状态和最终状态 */
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0); /* 平移隐藏 */
}

.nav-enter-active {
  transition: all 0.3s ease-out;
}

.nav-leave-active {
  transition: all 0.3s ease-in;
}

.nav-enter-from,
.nav-leave-to {
  transform: translateY(-200px); /* 初始状态和最终状态 */
}

.nav-enter-to,
.nav-leave-from {
  transform: translateY(0); /* 平移隐藏 */
}

.map-enter-active {
  transition: all 0.1s ease-out;
}

.map-leave-active {
  transition: all 0.1s ease-in;
}

.map-enter-from,
.map-leave-to {
  opacity: 0; /* 初始状态和最终状态 */
  /* transform: translateX(-300px); */
}

.map-enter-to,
.map-leave-from {
  opacity: 1; /* 平移隐藏 */
  /* transform: translateX(300px); */
}

.debug {
  display: none;
}
</style>
