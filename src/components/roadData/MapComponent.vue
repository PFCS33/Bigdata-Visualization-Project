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
  props: ["dataParam"],
  data() {
    return {};
  },
  methods: {
    drawMap(dataList) {
      // 获取 SVG 元素的宽度和高度
      const svg = d3.select(".map");
      const width = parseInt(svg.style("width"), 10);
      const height = parseInt(svg.style("height"), 10);
      svg.selectAll("g").remove();
      d3.select(".input-box input").remove();
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
            .style("stroke", color)
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
            .on("mouseout", function () {
              //恢复颜色
              d3.select(this).style("stroke", color);
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
    dataParam(d) {
      this.drawMap(d);
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
