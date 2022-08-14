<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UploadExcel
        :beforeUpload="excelSuccess"
        :onSuccess="onSuccess"
      ></UploadExcel>
    </div>
  </div>
</template>

<script>
import employees from "@/constant/employees";
const { importMapKeyPath } = employees;
import { importEmployees } from "@/api/employees";
import { formatTime } from "@/filters";
export default {
  data() {
    return {};
  },

  created() {},

  methods: {
    excelSuccess({ name }) {
      if (!name.endsWith(".xlsx")) {
        this.$message.error("请选择xlsx文件类型");
        return false;
      }
      return true;
    },
    async onSuccess({ header, results }) {
      // 把得到的results数据转换成后台需要的，也就是我们请求用的数据方式
      const newArr = results.map((item) => {
        const obj = {};
        for (let key in importMapKeyPath) {
          if (key === "入职日期" || key === "转正日期") {
            const timestamp = item[key];
            // 处理excel的时间，转为毫秒的时间戳
            const date = new Date((timestamp - 1) * 24 * 3600000);
            // excel和js的初始时间相差70年
            date.setFullYear(date.getFullYear() - 70);
            // formatTime将时间戳转化为年月日的格式
            obj[importMapKeyPath[key]] = formatTime(date);
          } else {
            obj[importMapKeyPath[key]] = item[key];
          }
        }
        return obj;
      });
      await importEmployees(newArr);
      this.$message.success("成功导入");
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="less"></style>
