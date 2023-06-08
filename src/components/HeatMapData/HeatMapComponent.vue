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
  props: ["dataParam"],
  methods: {
    drawMap(dataParam) {
      //console.log(dataParam);

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
        blur: 1,
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
        const value = data.value * 10e6;
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
      // if you have a set of datapoints always use setData instead of addData
      // for data initialization
      heatmapInstance.setData(dataForHeatmap);
    },
  },
  mounted() {
    //console.log("param", this.dataParam);
    this.drawMap(this.dataParam);
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
