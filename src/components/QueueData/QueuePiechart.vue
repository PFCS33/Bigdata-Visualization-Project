<template>
  <div id="pie-chart" ref="piechartContainer">PieChart</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: ["piechartData"],
  data() {
    return {
      piechart: null,
    };
  },
  watch: {
    piechartData(newValue) {
      const data = newValue.data;
      const selected = newValue.selected;

      if (data) {
        this.updatePieChart(data);
      }
      if (selected) {
        this.piechart.setOption({
          legend: { selected: selected },
        });
      }
    },
  },
  methods: {
    updatePieChart(data) {
      var pieData = [];
      data.forEach(function (item) {
        pieData.push({
          name: item.name,
          value: item.percent,
        });
      });
      this.piechart.setOption({
        series: [
          {
            data: pieData,
          },
        ],
      });
    },
    createPiechart() {
      // 创建饼图
      var pieChart = echarts.init(this.$refs.piechartContainer);

      var pieOption = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: ({d}%)",
        },
        legend: {
          orient: "horizontal",
          left: 0,
          data: [
            "type1_num",
            "type10_num",
            "type3_num",
            "type4_num",
            "type6_num",
          ],
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
      this.piechart = pieChart;
    },
  },
  mounted() {
    this.createPiechart();
  },
};
</script>

<style scoped>
#pie-chart {
  border: 1px solid #000;
  grid-column: 2;
  grid-row: 1;
  height: 100%;
  width: 100%;
}
</style>
