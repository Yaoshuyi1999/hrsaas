<template>
  <div ref="main" class="radarCharts">11</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },

  created() {},

  mounted() {
    this.initRadar();
  },

  methods: {
    initRadar() {
      //基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.main);
      // 绘制图表
      const radarOptions = {
        //   myChart.setOption({
        title: {
          text: "Basic Radar Chart",
        },
        legend: {
          data: ["张三", "李四"],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "加班", max: 100 },
            { name: "迟到", max: 100 },
            { name: "bug", max: 100 },
            { name: "早退", max: 100 },
            { name: "摸鱼", max: 100 },
            { name: "加薪", max: 100 },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [42, 30, 20, 35, 50, 100],
                name: "张三",
              },
              {
                value: [50, 14, 28, 26, 42, 21],
                name: "李四",
              },
            ],
          },
        ],
      };
      radarOptions && myChart.setOption(radarOptions);
    },
  },
};
</script>

<style scoped lang="scss">
.radarCharts {
  width: 800px;
  height: 500px;
}
</style>
