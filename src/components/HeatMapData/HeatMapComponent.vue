<template>
  <div class="box">
    <div class="container demo-wrapper">
      <div class="heatmap"></div>
      <div class="tooltip"></div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import h337 from "@mars3d/heatmap.js";
export default {
  props: ["dataParam", "mode", "selectedHour"],
  data() {
    return {
      index: 0,
      timer: null,
      hourNum: 9,
      heatmapInstance: null,
    };
  },
  methods: {
    startAnimation() {
      const heatmapContainer = d3.select(".heatmap");
      // 清除所有子元素
      heatmapContainer.selectAll("*").remove();
      // 重置索引值为 0
      this.index = 0;
      // 清除之前的定时器
      if (this.timer) {
        clearInterval(this.timer);
      }
      // 创建新的定时器，每隔一段时间更新索引值并更新数据
      this.timer = setInterval(() => {
        // 更新索引值
        this.index = (this.index + 1) % this.hourNum;
        // 更新热图数据
        this.updateHeatmap();
      }, 1000); // 每隔 1 秒更新一次
      this.heatmapInstance = h337.create({
        container: document.querySelector(".heatmap"),
        maxOpacity: 0.9,
        minOpacity: 0.3,
        blur: 0.95,
      });
      this.updateHeatmap();
    },

    updateHeatmap() {
      const heatmapContainer = d3.select(".heatmap");

      console.log(this.index);
      // 获取当前要显示的数据元素
      const currentData = this.dataParam[this.index];
      console.log(currentData);

      //console.log(dataParam);
      // console.log(this.selectedHour);
      const width = 1228;
      //   const height = 472;
      const height = 500;
      // 为了多个map能在一个地图里显示，采用统一的映射比例
      const xExtent = [-580, 450];
      const yExtent = [-650, 250];
      const xScale = d3.scaleLinear().domain(xExtent).range([0, width]);
      const yScale = d3.scaleLinear().domain(yExtent).range([0, height]);

      let points = [];
      let maxValue = -1;

      currentData.forEach((data) => {
        const value = data.value * 1e6;
        let point = {
          x: Math.round(xScale(data.x)),
          y: Math.round(yScale(data.y)),
          value: value,
          radius: 2,
        };
        maxValue = Math.max(maxValue, value);
        points.push(point);
      });

      let dataForHeatmap = {
        max: maxValue,
        data: points,
      };

      //   // 使用 D3.js 过渡功能，实现热图的平滑更新
      //   const canvas = heatmapContainer.select("canvas");
      //   // 设置初始的热图数据
      //   heatmapInstance.setData(dataForHeatmap);
      //   // 过渡到新的热图数据
      //   canvas.style("opacity", 0).transition().duration(500).style("opacity", 1);

      const canvasOld = heatmapContainer.select("canvas");
      canvasOld
        .style("opacity", 1)
        .transition()
        .duration(800)
        .style("opacity", 0)
        .remove();

      const canvasNew = heatmapContainer.select("canvas");
      canvasNew
        .style("opacity", 0)
        .transition()
        .duration(800)
        .style("opacity", 1)
        .on("end", () => {
          this.heatmapInstance.setData(dataForHeatmap);
        });
    },

    drawSingleMap(dataParam) {
      const heatmapContainer = d3.select(".heatmap");
      // 清除所有子元素
      heatmapContainer.selectAll("*").remove();
      //console.log(dataParam);
      // console.log(this.selectedHour);
      const width = 1228;
      //   const height = 472;
      const height = 500;
      // 为了多个map能在一个地图里显示，采用统一的映射比例
      const xExtent = [-580, 450];
      const yExtent = [-650, 250];
      const xScale = d3.scaleLinear().domain(xExtent).range([0, width]);
      const yScale = d3.scaleLinear().domain(yExtent).range([0, height]);

      let heatmapInstance = h337.create({
        // only container is required, the rest will be defaults
        container: document.querySelector(".heatmap"),

        // the maximum opacity (the value with the highest intensity will have it)
        maxOpacity: 0.9,
        // minimum opacity. any value > 0 will produce
        // no transparent gradient transition
        minOpacity: 0.3,
        blur: 0.95,
      });

      /* tooltip code start */
      const demoWrapper = document.querySelector(".demo-wrapper");
      const tooltip = document.querySelector(".tooltip");
      function updateTooltip(x, y, value) {
        // + 15 for distance to cursor
        var transl = "translate(" + (x + 15) + "px, " + (y + 15) + "px)";
        tooltip.style.webkitTransform = transl;
        tooltip.innerHTML = value;
        if (value == 0) {
          tooltip.style.display = "none";
        }
      }
      demoWrapper.onmousemove = function (ev) {
        var x = ev.layerX;
        var y = ev.layerY;
        // getValueAt gives us the value for a point p(x/y)
        var value = heatmapInstance.getValueAt({
          x: x,
          y: y,
        });
        tooltip.style.display = "block";
        updateTooltip(x, y, value);
      };
      // hide tooltip on mouseout
      demoWrapper.onmouseout = function () {
        tooltip.style.display = "none";
      };

      // now generate some random data
      let points = [];
      let maxValue = -1;
      //let len = dataParam.length;

      dataParam.forEach((data) => {
        const value = data.value * 1e6;
        let point = {
          x: Math.round(xScale(data.x)),
          y: Math.round(yScale(data.y)),
          value: value,
          radius: 2,
        };
        maxValue = Math.max(maxValue, value);
        points.push(point);
      });

      // heatmap data format
      let dataForHeatmap = {
        max: maxValue,
        data: points,
      };

      heatmapInstance.setData(dataForHeatmap);
    },
  },
  watch: {
    selectedHour(newValue) {
      if (this.mode === 0);
      {
        this.drawSingleMap(this.dataParam[newValue]);
      }
    },
  },
  mounted() {
    //console.log("param", this.dataParam);
    if (this.mode === 0) {
      this.drawSingleMap(this.dataParam[this.selectedHour]);
    } else if (this.mode === 1) {
      this.startAnimation();
    }
  },
};
</script>

<style scoped>
.box {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1 1 auto;
  /* height: 600px;
  width: 600px; */
  overflow: hidden;
}

.heatmap {
  height: 100%;
  width: 100%;
}
.demo-wrapper {
  position: relative;
}

.tooltip {
  position: absolute;
  left: 0;
  top: 0;

  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 1vw;
  padding: 5px;
  text-align: center;
}
</style>
