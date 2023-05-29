<template>
  <div class="container">
    <h1>可视化数据展示</h1>
    <BaseCard class="box">
      <BaseButton link to="/roadmap" class="btn">道路数据</BaseButton>
    </BaseCard>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 3vw;
}
.box {
  align-self: center;
  padding: 2vw;
  display: flex;
  flex-direction: column;
  width: 30vw;
  height: 30vw;
}

h1 {
  margin-top: 2vw;
  font-size: 2vw;
  text-align: center;
}

.btn {
  border-radius: 8px;
  text-align: center;
}
</style>
