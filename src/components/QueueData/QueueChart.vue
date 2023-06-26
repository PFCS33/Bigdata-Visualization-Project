<template>
  <div id="chart" ref="chartContainer"></div>
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
    roadId() {
      return this.$store.getters["queue/roadId"];
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
    roadId() {
      //console.log("watch", this.roadId);
      this.chart.clear();

      this.isSet = false;
      this.$store.dispatch("queue/loadData");
    },
  },
  methods: {
    createChart() {
      const that = this;
      // 导入数据
      const data = this.drawData;
      // 创建Echarts堆叠面积图
      if (this.chart) {
        $("#chart").off("click");
        echarts.dispose(this.chart);
      }
      var chart = echarts.init(this.$refs.chartContainer);

      // var chart = echarts.init(document.getElementById("chart"));
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
        },
        legend: {
          data: [
            "type1_num",
            "type10_num",
            "type3_num",
            "type4_num",
            "type6_num",
          ],
          type: "scroll",
          selected: {
            type1_num: true,
            type10_num: true,
            type3_num: true,
            type4_num: true,
            type6_num: true,
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
        series: [
          {
            name: "type1_num",
            type: "line",
            stack: "1",
            areaStyle: {},
            data: data.map(function (d) {
              return d["type1_num"];
            }),
            smooth: true,
          },
          {
            name: "type10_num",
            type: "line",
            stack: "10",
            areaStyle: {},
            data: data.map(function (d) {
              return d["type10_num"];
            }),
            smooth: true,
          },
          {
            name: "type3_num",
            type: "line",
            stack: "3",
            areaStyle: {},
            data: data.map(function (d) {
              return d["type3_num"];
            }),
            smooth: true,
          },
          {
            name: "type4_num",
            type: "line",
            stack: "4",
            areaStyle: {},
            data: data.map(function (d) {
              return d["type4_num"];
            }),
            smooth: true,
          },
          {
            name: "type6_num",
            type: "line",
            stack: "6",
            areaStyle: {},
            data: data.map(function (d) {
              return d["type6_num"];
            }),
            smooth: true,
          },
        ],
      };
      chart.setOption(option);

      // 鼠标悬浮
      $("#chart").click(function (event) {
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
          that.$store.commit("queue/setPiechartData", data);
          //updatePiechart(data);
        }
      });

      //选择不同类别
      chart.on("legendselectchanged", function (params) {
        var selected = params.selected;
        that.$store.commit("queue/setSelected", selected);
      });

      //鼠标离开时清空
      $("#chart").mouseleave(function (event) {
        // 隐藏tooltip
        // $("#tooltip").css("display", "none");
        // 更新饼图
        //that.$store.commit("queue/setPiechartData", []);
        //updatePiechart([]);
      });
      this.chart = chart;
    },
  },
  created() {
    console.log(this.roadId);
    this.$store.dispatch("queue/loadData");
    //console.log("in created:", this.drawData);
  },
};
</script>
<style scoped>
#chart {
  /* border: 1px solid #000; */
  grid-row: 1/-1;
  height: 100%;
  width: 100%;
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
