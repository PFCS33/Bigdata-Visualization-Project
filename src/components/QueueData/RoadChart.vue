<template>
  <div class="box">
    <Card class="card card1">
      <div id="chart" ref="chartContainer"></div>
    </Card>
    <Card class="card card2">
      <div id="pie-chart" ref="pitchartContainer"></div>
    </Card>
    <Card class="card3">
      <img src="/public/data/main_trail.png" alt="main trail" class="img" />
    </Card>
  </div>
</template>
<script>
import * as echarts from "echarts";
import $ from "jquery";

export default {
  data() {
    return {
      chart: null,
      isSet: false,
    };
  },
  computed: {
    drawData() {
      return this.$store.getters["queue/drawData"];
    },
  },
  watch: {
    drawData(newValue) {
      if (newValue) {
        if (!this.isSet) {
          this.createChart();
          this.isSet = true;
        }
      }
    },
  },
  methods: {
    createChart() {
      const that = this;
      // 导入数据
      const data = this.drawData;

      var chart = echarts.init(this.$refs.chartContainer);
      var option = {
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            //   var selectedData = [];
            var res = params[0].name;
            var total = 0;
            for (var i = 0, l = params.length; i < l; i++) {
              total = total + params[i].value;
            }
            // console.log(total)
            for (var j = 0, len = params.length; j < len; j++) {
              if (total != 0) {
                var percent = ((params[j].value / total) * 100).toFixed(2);
                res +=
                  "<br/>" +
                  params[j].seriesName +
                  " : " +
                  params[j].value +
                  " (" +
                  percent +
                  "%)";
              } else {
                res +=
                  "<br/>" +
                  params[j].seriesName +
                  " : " +
                  params[j].value +
                  " (0.00%)";
              }
            }
            return res;
          },
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        legend: {
          data: ["trail3", "trail4", "trail8", "trail9", "trail10", "trail13"],
          type: "scroll",
          textStyle: {
            color: "#333",
          },
        },
        xAxis: {
          type: "category",
          data: data.map(function (item) {
            // 获取除第一行外的数据，并将第一列作为 xAxis 的 data
            return item["time"];
          }),
        },
        yAxis: {
          type: "value",
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 30,
          },
          {
            start: 0,
            end: 10,
          },
        ],
        series: [
          {
            name: "trail3",
            type: "line",
            smooth: true,
            data: data.map(function (d) {
              return d["trail3"];
            }),
          },
          {
            name: "trail4",
            type: "line",
            smooth: true,
            data: data.map(function (d) {
              return d["trail4"];
            }),
          },
          {
            name: "trail8",
            type: "line",
            smooth: true,
            data: data.map(function (d) {
              return d["trail8"];
            }),
          },
          {
            name: "trail9",
            type: "line",
            smooth: true,
            data: data.map(function (d) {
              return d["trail9"];
            }),
          },
          {
            name: "trail13",
            type: "line",
            smooth: true,
            data: data.map(function (d) {
              return d["trail13"];
            }),
          },
        ],
      };
      chart.setOption(option);

      // 鼠标悬浮
      $("#chart").mousemove(function (event) {
        var option = chart.getOption();
        var selectedData = [];
        var pointInPixel = [event.offsetX, event.offsetY];
        var pointInGrid = chart.convertFromPixel("grid", pointInPixel);
        var xValue = pointInGrid[0];
        if (
          event.offsetX >= 65 &&
          event.offsetX <= 680 &&
          event.offsetY >= 60 &&
          event.offsetY <= 435
        ) {
          var totalValue = 0;
          for (var i = 0; i < option.series.length; i++) {
            var value = option.series[i].data[Math.round(xValue)];
            selectedData.push({
              name: option.series[i].name,
              value: value,
            });
            totalValue += value;
          }

          var data = selectedData.map(function (item) {
            var percent = item.value / totalValue;
            return {
              name: item.name,
              //   value: item.value,
              percent: percent,
            };
          });
          // 更新饼图
          updatePieChart(data);
        }

        //   // 显示tooltip
        //   var tooltip = $("#tooltip");
        //   var chartOffset = chart.getDom().getBoundingClientRect();
        // //   tooltip.html(getTooltipText(data));
        //   tooltip.css({
        //     display: "block",
        //     top: event.pageY - chartOffset.top + 10,
        //     left: event.pageX - chartOffset.left + 10
        //   });
      });

      //选择不同类别
      chart.on("legendselectchanged", function (params) {
        var selected = params.selected;
        pieChart.setOption({
          legend: { selected: selected },
        });
      });

      //鼠标离开时清空
      $("#chart").mouseleave(function (event) {
        // 隐藏tooltip
        // $("#tooltip").css("display", "none");

        // 更新饼图
        updatePieChart([]);
      });

      // 创建饼图
      var pieChart = echarts.init(this.$refs.pitchartContainer);

      var pieOption = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: ({d}%)",
        },
        legend: {
          orient: "horizontal",
          left: 0,
          data: ["trail3", "trail4", "trail8", "trail9", "trail10", "trail13"],
        },
        series: [
          {
            name: "percent",
            type: "pie",
            radius: [0, 110],
            avoidLabelOverlap: true,
            label: {
              show: true,
              position: "outside",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 15,
                color: "#333",
                backgroundColor: "#fff",
                padding: [4, 8],
                borderRadius: 4,
                borderColor: "#999",
                borderWidth: 1,
              },
            },
            labelLine: {
              show: true,
            },
            data: [],
          },
        ],
      };

      pieChart.setOption(pieOption);

      function updatePieChart(data) {
        var pieData = [];
        data.forEach(function (item) {
          pieData.push({
            name: item.name,
            value: item.percent,
          });
        });
        pieChart.setOption({
          series: [
            {
              data: pieData,
            },
          ],
        });
      }
      this.chart = chart;
    },
  },
  created() {
    this.$store.dispatch("queue/loadRoadData");
    //console.log("in created:", this.drawData);
  },
};
</script>
<style scoped>
.card {
  padding: 0.8rem 1.2rem;
}
.card1 {
  grid-row: 1/-1;
  grid-column: 1;
}
.card2 {
  grid-row: 1;
  grid-column: 2;
}
.card3 {
  grid-column: 2;
  grid-row: 2;
}
.img {
  width: 100%;
  height: 100%;
}
.box {
  height: 100%;
  width: 100%;
  /* display: flex; */
  gap: 2vw;
  padding: 1vw;
  /* align-items: center;
  justify-content: center; */
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 2fr 1fr;
}
#chart {
  width: 700px;
  height: 500px;
  float: left;
}

#pie-chart {
  width: 400px;
  height: 100%;
  float: right;
}

.tooltip {
  position: absolute;
  display: none;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 12px;
  z-index: 9999;
}
</style>
