<template>
  <div id="my_dataviz"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {};
  },
  computed: {
    drawData() {
      //   console.log("computed get");
      //   console.log(this.$store.getters["queue/drawData"]);

      return this.$store.getters["queue/drawData"];
    },
  },
  watch: {
    drawData(newValue) {
      console.log("enter watch");
      if (newValue) {
        this.drawChart();
      }
    },
  },
  created() {
    this.$store.dispatch("queue/loadData");
  },
  methods: {
    drawChart() {
      console.log("start");
      var margin = { top: 10, right: 20, bottom: 30, left: 50 },
        width = 500 - margin.left - margin.right,
        height = 420 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3
        .select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //Read the data

      // Add X axis
      var x = d3.scaleLinear().domain([0, 120]).range([0, width]);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear().domain([35, 90]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Add a scale for bubble size
      var z = d3.scaleLinear().domain([0, 120]).range([4, 40]);

      // Add a scale for bubble color
      var myColor = d3
        .scaleOrdinal()
        .domain([
          "type1_num",
          "type10_num",
          "type3_num",
          "type4_num",
          "type6_num",
        ])
        .range(d3.schemeSet2);

      // -1- Create a tooltip div that is hidden by default:
      var tooltip = d3
        .select("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "black")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("color", "white");

      // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
      var showTooltip = function (d) {
        tooltip.transition().duration(200);
        tooltip
          .style("opacity", 1)
          .html("Country: " + d.country)
          .style("left", d3.mouse(this)[0] + 30 + "px")
          .style("top", d3.mouse(this)[1] + 30 + "px");
      };
      var moveTooltip = function (d) {
        tooltip
          .style("left", d3.mouse(this)[0] + 30 + "px")
          .style("top", d3.mouse(this)[1] + 30 + "px");
      };
      var hideTooltip = function (d) {
        tooltip.transition().duration(200).style("opacity", 0);
      };

      // Add dots
      svg
        .append("g")
        .selectAll("dot")
        .data(this.drawData)
        .enter()
        .append("circle")
        .attr("class", "bubbles")
        .attr("cx", function (d) {
          return x(1);
        })
        .attr("cy", function (d) {
          return y(d["type1_num"]);
        })
        .attr("r", function (d) {
          return d["type1_num"];
        })
        .style("fill", function (d) {
          return myColor("type1_num");
        })
        // -3- Trigger the functions
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip);
    },
  },
};
</script>

<style scoped>
.bubbles {
  stroke-width: 2px;
  stroke: white;
}
.bubbles:hover {
  stroke: black;
}
</style>
