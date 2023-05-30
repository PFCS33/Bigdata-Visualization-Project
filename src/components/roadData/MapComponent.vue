<template>
  <div class="box">
    <div class="input-box"></div>
    <div class="container">
      <svg class="map"></svg>
    </div>
    <div class="tooltip"></div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  props: ["dataParam", "roadSec"],
  data() {
    return {
      mapping: new Map([
        [1, 0],
        [2, 1],
        [3, 2],
        [4, 3],
        [5, 4],
        [6, 5],
        [7, 6],
        [8, 7],
        [9, 8],
        [10, 9],
        [11, 10],
        [12, 11],
        [13, 12],
        [14, 13],
        [15, 14],
        [16, 15],
        [17, 16],
        [18, 17],
        [19, 18],
        [20, 19],
        [21, 20],
        [22, 21],
        [23, 22],
        [24, 23],
        [25, 24],
        [26, 25],
        [27, 26],
        [28, 77],
        [29, 78],
        [30, 80],
        [31, 81],
        [32, 82],
        [33, 98],
        [34, 99],
        [35, 101],
        [36, 102],
        [37, 103],
        [38, 104],
        [39, 105],
        [40, 106],
        [41, 107],
        [42, 108],
        [43, 109],
        [44, 110],
        [45, 111],
        [46, 112],
        [47, 113],
        [48, 114],
        [49, 115],
        [50, 116],
        [51, 117],
        [52, 124],
        [53, 127],
        [54, 128],
        [55, 369],
        [56, 370],
        [57, 371],
        [58, 372],
        [59, 373],
        [60, 374],
        [61, 375],
        [62, 376],
        [63, 377],
        [64, 378],
        [65, 379],
        [66, 380],
        [67, 381],
        [68, 395],
        [69, 396],
        [70, 397],
        [71, 398],
        [72, 441],
        [73, 442],
        [74, 509],
        [75, 510],
        [76, 516],
        [77, 518],
        [78, 519],
        [79, 520],
        [80, 521],
        [81, 522],
        [82, 523],
        [83, 524],
        [84, 525],
        [85, 526],
        [86, 527],
        [87, 528],
        [88, 529],
        [89, 530],
        [90, 531],
        [91, 532],
        [92, 533],
        [93, 534],
        [94, 535],
        [95, 536],
        [96, 537],
        [97, 538],
        [98, 539],
        [99, 555],
        [100, 556],
        [101, 557],
        [102, 558],
        [103, 639],
        [104, 640],
        [105, 641],
        [106, 642],
        [107, 681],
        [108, 687],
        [109, 688],
        [110, 689],
        [111, 690],
        [112, 691],
        [113, 692],
        [114, 693],
        [115, 694],
        [116, 811],
        [117, 812],
        [118, 1001],
        [119, 1002],
        [120, 1003],
        [121, 1004],
        [122, 1005],
        [123, 1006],
        [124, 1007],
        [125, 1008],
        [126, 1009],
        [127, 1010],
        [128, 1011],
        [129, 1020],
        [130, 1021],
        [131, 1796],
        [132, 1797],
        [133, 1845],
        [134, 2048],
      ]),
    };
  },
  methods: {
    drawMap(dataList, roadSecId) {
      // 获取 SVG 元素的宽度和高度
      const svg = d3.select(".map");
      const width = parseInt(svg.style("width"), 10);
      const height = parseInt(svg.style("height"), 10);
      svg.selectAll("g").remove();
      d3.select(".input-box input").remove();

      let roadSec = parseInt(roadSecId);
      if (roadSec === 0) {
        roadSec = -1;
      } else {
        roadSec = this.mapping.get(roadSec);
      }
      console.log(roadSec);
      //console.log(width, height);

      // const xExtent = [Infinity, -Infinity];
      // const yExtent = [Infinity, -Infinity];

      // // 计算数据的边界范围
      // dataList[0].features.forEach((feature) => {
      //   //线，多边形要加[0]
      //   // const coordinates = feature.geometry.coordinates;
      //   // coordinates.forEach((coord) => {
      //   //   const x = coord[0];
      //   //   const y = coord[1];
      //   //   xExtent[0] = Math.min(xExtent[0], x);
      //   //   xExtent[1] = Math.max(xExtent[1], x);
      //   //   yExtent[0] = Math.min(yExtent[0], y);
      //   //   yExtent[1] = Math.max(yExtent[1], y);
      //   // });
      //   //点
      //   const coordinates = feature.geometry.coordinates;

      //   const x = coordinates[0];
      //   const y = coordinates[1];
      //   xExtent[0] = Math.min(xExtent[0], x);
      //   xExtent[1] = Math.max(xExtent[1], x);
      //   yExtent[0] = Math.min(yExtent[0], y);
      //   yExtent[1] = Math.max(yExtent[1], y);
      // });

      // 为了多个map能在一个地图里显示，采用统一的映射比例
      const xExtent = [-580, 450];
      const yExtent = [-650, 250];
      console.log(`x: [${xExtent}]`);
      console.log(`y:[${yExtent}]`);
      // 创建一个线性比例尺来将局部坐标映射到屏幕像素坐标
      const xScale = d3.scaleLinear().domain(xExtent).range([0, width]);
      const yScale = d3.scaleLinear().domain(yExtent).range([0, height]);
      console.log(width, height);
      const colorList = {
        boundary: "#fd7e14",
        crosswalk: "#40c057",
        lane: "#4c6ef5",
        signal: "#FF00FF",
        stopline: "#be4bdb",
      };
      const selectedColor = "#c92a2a";
      // 创建一个 div 元素作为提示框容器
      const tooltip = d3.select(".tooltip").style("opacity", 0);

      // 绘制地理路径
      dataList.forEach((data) => {
        const type = data.features[0].geometry.type;
        const color = colorList[data.name];
        const name = data.name;
        //console.log(type);
        if (type == "LineString") {
          svg
            .append("g")
            .selectAll("path")
            .data(data.features)
            .join("path")
            .attr("d", function (feature) {
              const coordinates = feature.geometry.coordinates;
              const pathData = coordinates.map(function (coord) {
                const x = xScale(coord[0]);
                const y = yScale(coord[1]);
                return [x, y];
              });
              return "M" + pathData.join("L");
            })
            .style("fill", "none")
            // .style("stroke", color)
            // .style("stroke", function (feature) {
            //   if (name === "lane") {
            //     const lane_no = feature.properties.lane_no;
            //     if (lane_no === 0) {
            //       return "#000";
            //     } else {
            //       return color;
            //     }
            //   } else {
            //     return color;
            //   }
            // })
            .style("stroke", function (feature) {
              if (roadSec !== -1 && name === "lane") {
                const road_sec_id = feature.properties.road_sec_id;
                if (road_sec_id === roadSec) {
                  return "#000";
                } else {
                  return color;
                }
              } else {
                return color;
              }
            })
            .style("stroke-width", 0.4)
            .attr("pointer-events", "all")
            .style("cursor", "pointer")
            .on("mouseover", function (event, d) {
              //颜色变黑，表示被选中
              d3.select(this).style("stroke", selectedColor);
              // 获取属性值
              const properties = d.properties;
              // 创建包含属性值的 HTML 字符串
              let html = "";
              for (const key in properties) {
                if (Object.prototype.hasOwnProperty.call(properties, key)) {
                  const value = properties[key];
                  html += `<p>${key}: ${value}</p>`;
                }
              }
              // 在提示框中显示属性值
              tooltip.transition().duration(200).style("opacity", 0.9);
              tooltip
                .html(html)
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 10 + "px");
            })
            .on("mouseout", function (_e, feature) {
              // //恢复颜色
              // if (name === "lane") {
              //   const lane_no = feature.properties.lane_no;
              //   if (lane_no === 0) {
              //     d3.select(this).style("stroke", "#000");
              //   } else {
              //     d3.select(this).style("stroke", color);
              //   }
              // } else {
              //   d3.select(this).style("stroke", color);
              // }
              //恢复颜色
              if (roadSec !== -1 && name === "lane") {
                const road_sec_id = feature.properties.road_sec_id;
                if (road_sec_id === roadSec) {
                  d3.select(this).style("stroke", "#000");
                } else {
                  d3.select(this).style("stroke", color);
                }
              } else {
                d3.select(this).style("stroke", color);
              }
              // //恢复颜色
              // d3.select(this).style("stroke", color);
              // 隐藏提示框
              tooltip.transition().duration(500).style("opacity", 0);
            });
        } else if (type == "Polygon") {
          // 绘制地理多边形
          svg
            .append("g")
            .selectAll("polygon")
            .data(data.features)
            .join("polygon")
            .attr("points", function (feature) {
              const coordinates = feature.geometry.coordinates[0];
              const points = coordinates.map(function (coord) {
                const x = xScale(coord[0]);
                const y = yScale(coord[1]);
                return [x, y];
              });
              return points.join(" ");
            })
            .style("fill", "none")
            .style("stroke", color)
            .attr("pointer-events", "all")
            .style("cursor", "pointer")
            .on("mouseover", function (event, d) {
              //颜色变，表示被选中
              d3.select(this).style("stroke", selectedColor);
              // 获取属性值
              const properties = d.properties;
              // 创建包含属性值的 HTML 字符串
              let html = "";
              for (const key in properties) {
                if (Object.prototype.hasOwnProperty.call(properties, key)) {
                  const value = properties[key];
                  html += `<p>${key}: ${value}</p>`;
                }
              }
              // 在提示框中显示属性值
              tooltip.transition().duration(200).style("opacity", 0.9);
              tooltip
                .html(html)
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 10 + "px");
            })
            .on("mouseout", function () {
              //恢复颜色
              d3.select(this).style("stroke", color);
              // 隐藏提示框
              tooltip.transition().duration(500).style("opacity", 0);
            });
        } else if (type == "Point") {
          // 绘制地理点
          svg
            .append("g")
            .selectAll("circle")
            .data(data.features)
            .join("circle")
            .attr("cx", function (feature) {
              const coordinates = feature.geometry.coordinates;
              const x = xScale(coordinates[0]);
              return x;
            })
            .attr("cy", function (feature) {
              const coordinates = feature.geometry.coordinates;
              const y = yScale(coordinates[1]);
              return y;
            })
            .attr("r", 1)
            .style("fill", "none")
            .style("stroke", color)
            .style("stroke-width", 0.5)
            .attr("pointer-events", "all")
            .style("cursor", "pointer")
            .on("mouseover", function (event, d) {
              //颜色变黑，表示被选中
              d3.select(this).style("stroke", selectedColor);
              // 获取属性值
              const properties = d.properties;
              // 创建包含属性值的 HTML 字符串
              let html = "";
              for (const key in properties) {
                if (Object.prototype.hasOwnProperty.call(properties, key)) {
                  const value = properties[key];
                  html += `<p>${key}: ${value}</p>`;
                }
              }
              // 在提示框中显示属性值
              tooltip.transition().duration(200).style("opacity", 0.9);
              tooltip
                .html(html)
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 10 + "px");
            })
            .on("mouseout", function () {
              //恢复颜色
              d3.select(this).style("stroke", color);
              // 隐藏提示框
              tooltip.transition().duration(500).style("opacity", 0);
            });
        }
      });
      const group = svg.selectAll("g");
      // 创建缩放函数
      const zoom = d3
        .zoom()
        .scaleExtent([0.5, 20]) // 设置缩放的范围
        .translateExtent([
          [0, 0],
          [width, height],
        ])
        .on("zoom", zoomed);

      svg.call(zoom);

      // 创建滑动条
      const slider = d3
        .select(".input-box")
        .append("input")
        .attr("type", "range")
        .attr("min", 0.5)
        .attr("max", 20)
        .attr("step", 0.05)
        .attr("value", 1)
        .on("input", function () {
          let value = +this.value; // 获取滑动条的值
          // 在这里执行滑动条值变化后的操作
          const transform = d3.zoomIdentity.scale(value);
          svg.call(zoom.transform, transform);
        });

      // 定义缩放事件的回调函数
      function zoomed(event) {
        const transform = event.transform;
        // 更新地理路径组的变换属性
        group.attr("transform", transform);
        // 更新滑动条的值
        slider.property("value", transform.k);
      }
    },
  },
  watch: {
    dataParam(newDataParam) {
      this.drawMap(newDataParam, this.roadSec);
    },
    roadSec(newRoadSec) {
      this.drawMap(this.dataParam, newRoadSec);
    },
  },

  mounted() {
    this.drawMap(this.dataParam);
  },
};
</script>

<style scoped>
.tooltip {
  position: fixed;
  width: fit-content;
  height: fit-content; /* 设置高度 */
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  font-size: 1vw;
  background-color: #fff;
  padding: 1vw;
  pointer-events: none;
}
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
.input-box {
  width: 15%;
}

.map {
  height: 100%;
  width: 100%;
}
</style>
