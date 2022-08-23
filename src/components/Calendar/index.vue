<template>
  <div class="calendar">
    <el-row type="flex" justify="end">
      <el-col :span="5">
        <el-select v-model="currentYear" @change="updateCalendar">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="currentMonth" @change="updateCalendar">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }">
        <div class="cell-box">
          {{ date.getDate() }}
          <span v-if="isWeek(date)">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      currentYear: 2022,
      currentMonth: 8,
      currentDate: "",
      years: [],
    };
  },

  created() {
    this.initCalendar();
  },

  methods: {
    initCalendar() {
      const date = new Date();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
      this.years = Array(11)
        .fill(this.currentYear - 5)
        .map((item, i) => item + i);

      this.currentDate = date;
    },
    isWeek(date) {
      if (date.getDay() === 0 || date.getDay() === 6) {
        return true;
      }
      return false;
    },
    // 更新日历
    updateCalendar() {
      this.currentDate = this.currentYear + "-" + this.currentMonth;
      console.log(this.currentDate);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar-table td {
    border: none !important;
  }
  .cell-box {
    color: rgb(36, 0, 128);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
