<template>
  <div class="container" :class="{ 'queue-mode': queueMode }">
    <transition name="nav">
      <div class="nav" v-if="!editMode && !queueMode">
        <button class="menu-btn" @click="toggleEditMode" color="#333333">
          <div class="menu-btn-content">
            <svg
              t="1687523456001"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1491"
              width="20"
              height="20"
            >
              <path
                d="M344.792 518.575L303.4 477.184a26.947 26.947 0 0 1 38.13-38.13l60.174 60.173a26.947 26.947 0 0 1 0.27 37.834L114.392 833.16a26.947 26.947 0 0 0 0.27 37.834l68.984 68.958a26.947 26.947 0 0 0 38.077 0l291.301-291.3a26.947 26.947 0 0 1 38.104 0l146.324 146.323a26.947 26.947 0 1 1-38.104 38.13L532.076 705.833 259.853 978.055a80.842 80.842 0 0 1-114.337 0L76.53 909.096a80.842 80.842 0 0 1-0.809-113.475l269.043-277.046z m473.546 155.54a26.947 26.947 0 1 1-38.104 38.104L597.288 529.273a26.947 26.947 0 0 1 0-38.103l148.13-148.103a26.947 26.947 0 0 1 15.36-7.653l88.603-12.18 89.627-170.927-56.697-60.39-167.37 97.254-16.546 85.53a26.947 26.947 0 0 1-7.384 13.96l-148.13 148.102a26.947 26.947 0 0 1-38.103 0l-77.474-77.474a26.947 26.947 0 1 1 38.104-38.103l58.422 58.422 123.23-123.23 17.273-89.466a26.947 26.947 0 0 1 12.935-18.19l196.5-114.175a26.947 26.947 0 0 1 33.173 4.85l84.48 90.004a26.947 26.947 0 0 1 4.203 30.963l-104.96 200.165a26.947 26.947 0 0 1-20.21 14.201l-93.346 12.854-122.637 122.637 163.867 163.894z"
                fill="#333333"
                p-id="1492"
              ></path>
              <path
                d="M610.816 784.573a26.947 26.947 0 0 1 38.104-38.104l52.089 52.09a26.947 26.947 0 0 1-38.104 38.103l-52.089-52.09zM368.371 543.42a26.947 26.947 0 1 1 37.995-38.185L705.671 803.22a26.947 26.947 0 0 1 7.814 21.45 111.373 111.373 0 0 0 31.475 87.471 107.79 107.79 0 1 0 68.662-183.727c-2.129 0.135-3.934 0.081-5.578-0.054a26.947 26.947 0 0 1-19.537-7.868L485.24 417.954a26.947 26.947 0 1 1 38.05-38.158l295.181 294.481A161.684 161.684 0 1 1 706.83 950.272a165.16 165.16 0 0 1-47.642-117.275L368.37 543.421z"
                fill="#333333"
                p-id="1493"
              ></path>
              <path
                d="M783.076 874.036a53.895 53.895 0 1 0 76.22-76.219 53.895 53.895 0 1 0-76.22 76.219zM421.807 588.989a26.947 26.947 0 0 1 38.104 38.13L221.723 865.28a26.947 26.947 0 1 1-38.104-38.104L421.807 588.99z m81.597-229.808a26.947 26.947 0 1 1-38.104 38.104l-37.996-37.996a26.947 26.947 0 0 1-5.847-29.345c0.808-1.914 1.05-2.426 3.368-7.06l0.189-0.432c0.754-1.509 1.24-2.506 1.159-2.263a188.632 188.632 0 0 0-43.601-198.818 187.877 187.877 0 0 0-129.698-55.215 189.736 189.736 0 0 0-73.135 13.15l-2.506 0.97-1.752 0.728a26.947 26.947 0 0 1-21.073-49.61c1.887-0.809 1.887-0.809 3.423-1.402l2.102-0.808a242.068 242.068 0 0 1 93.992-16.896 241.772 241.772 0 0 1 166.723 70.98 242.526 242.526 0 0 1 57.722 250.88l25.007 25.033zM25.869 160.013a26.947 26.947 0 0 1 49.61 21.02 187.284 187.284 0 0 0-14.74 65.374 188.039 188.039 0 0 0 55.054 141.743 188.632 188.632 0 0 0 44.463 33.037 26.947 26.947 0 1 1-25.411 47.536 242.526 242.526 0 0 1-57.129-42.47A241.907 241.907 0 0 1 6.9 244.035a243.443 243.443 0 0 1 18.97-84.022z m224.337 337.274a26.947 26.947 0 0 1-0.215-53.895 189.17 189.17 0 0 0 61.79-10.644c4.366-1.51 7.168-2.21 10.94-1.563a26.947 26.947 0 0 1 18.81 7.895l33.145 33.146a26.947 26.947 0 0 1-38.103 38.13l-21.99-22.016a243.308 243.308 0 0 1-64.377 8.947z"
                fill="#333333"
                p-id="1494"
              ></path>
              <path
                d="M148.48 77.824a26.947 26.947 0 1 1 38.104-38.104l161.792 161.82a26.947 26.947 0 0 1 7.087 25.6l-22.986 91.35a26.947 26.947 0 0 1-19.564 19.565L221.56 361.04a26.947 26.947 0 0 1-25.6-7.06L30.343 188.362a26.947 26.947 0 1 1 38.13-38.103L223.26 305.044l60.901-15.306 15.306-60.9L148.48 77.823z"
                fill="#333333"
                p-id="1495"
              ></path>
            </svg>
            <span> Menu </span>
          </div>
        </button>
        <FancyButton :color="'#96f2d7'" @click="toggleQueueMode"
          >排队车辆</FancyButton
        >
        <div class="title">
          <Title></Title>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <BaseCard class="menu" v-if="editMode">
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
      </BaseCard>
    </transition>
    <BaseCard class="map-container">
      <button class="quit-edit-btn" @click="toggleEditMode" v-if="editMode">
        <svg
          t="1687527159523"
          class="icon quit-icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2930"
          width="50"
          height="50"
        >
          <path
            d="M448.544 496H256a32 32 0 0 0 0 64l146.976-0.192-233.6 233.568a32 32 0 0 0 45.248 45.248l233.664-233.632v147.264a32 32 0 1 0 64 0v-192.512a63.84 63.84 0 0 0-63.744-63.744M838.624 201.376a31.968 31.968 0 0 0-45.248 0L576 418.752V272a32 32 0 0 0-64 0v192.544c0 35.136 28.608 63.712 63.744 63.712h192.512a32 32 0 1 0 0-64l-147.488 0.224 217.856-217.856a31.968 31.968 0 0 0 0-45.248"
            p-id="2931"
          ></path>
        </svg>
      </button>
      <transition name="map">
        <MapComponent
          v-if="loadDone"
          :editMode="editMode"
          :dataParam="drawData"
          :roadSec="roadSec"
        ></MapComponent>
      </transition>
    </BaseCard>
    <div class="view-box1" v-show="queueMode">
      <QueueChart></QueueChart>
    </div>
    <div class="view-box2" v-show="queueMode">
      <QueuePiechart></QueuePiechart>
    </div>
    <!-- <div class="queueBox1" :class="{ 'queue-mode': queueMode }">View1</div>
    <div class="queueBox2" :class="{ 'queue-mode': queueMode }">View2</div> -->
    <button class="quit-edit-btn" @click="toggleQueueMode" v-if="queueMode">
      <svg
        t="1687527159523"
        class="icon quit-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2930"
        width="50"
        height="50"
      >
        <path
          d="M448.544 496H256a32 32 0 0 0 0 64l146.976-0.192-233.6 233.568a32 32 0 0 0 45.248 45.248l233.664-233.632v147.264a32 32 0 1 0 64 0v-192.512a63.84 63.84 0 0 0-63.744-63.744M838.624 201.376a31.968 31.968 0 0 0-45.248 0L576 418.752V272a32 32 0 0 0-64 0v192.544c0 35.136 28.608 63.712 63.744 63.712h192.512a32 32 0 1 0 0-64l-147.488 0.224 217.856-217.856a31.968 31.968 0 0 0 0-45.248"
          p-id="2931"
        ></path>
      </svg>
    </button>
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
    };
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
      // this.showMap = false;
      //console.log("map close!!!");
      this.editMode = !this.editMode;
      if (this.editMode === false) {
        this.setAllData();
      }
      //this.showMap = false;
      //console.log(this.editMode);
      this.drawData = this.getDrawData();
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
  /* display: flex;
  flex-direction: column; */
  height: 100%;

  background-color: #fff;

  display: grid;
  grid-template-columns: 0fr 1fr;
  grid-template-rows: 0fr 1fr;

  transition: all 0.5s ease-in-out;
}

.container.queue-mode {
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.view-box1 {
  grid-row: 1/-1;
  border: 1px solid #000;
}

.view-box2 {
  border: 1px solid #000;
  grid-row: 1;
  grid-column: 2;
}

.title {
  position: fixed;
  top: 0;
  left: 45%;
  border: 2px solid #fff;
}
.nav {
  /* grid-column: 1/-1; */
  position: fixed;
  top: 0;
  height: 10%;
  width: 100%;
  display: flex;
  padding: 1.2vw;

  gap: 2vw;
  color: #fff;
  background-color: #3d354bd6;
  border: 8px solid #a7e2d0;
  border-top: none;
  /* background-color: rgb(204, 93, 232, 0.6); */
  /* background-color: rgb(174, 62, 201, 0.6); */
}
.map-container {
  flex: 1 1 auto;
  /* margin: 1vw; */
  /* padding: 1vw; */
  height: 100%;
  width: 100%;
  /* background: radial-gradient(circle, #e6fcf5, #e9ecef); */
  /* background: linear-gradient(to bottom, #e6fcf5, #e9ecef); */
  /* background-color: #f4fce3; */

  grid-row: 2;
  grid-column: 2;
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
  color: #71008d;
}

.quit-icon:hover,
.quit-icon:active {
  fill: #6a9185;
}
.quit-edit-btn {
  position: fixed;
  top: 0;
  left: 0;
  background: none;
  border: none;
  cursor: pointer;
}

.quit-edit-btn:hover,
.quit-edit-btn:active {
  color: #96f2d7;
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
</style>
