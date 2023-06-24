<template>
  <div id="chart">Chart</div>
</template>

<style scoped>
#chart {
  border: 1px solid #000;
  grid-row: 1/-1;
  grid-column: 1;
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
