<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employees">
          <el-table-column label="序号" type="index" sortable />
          <el-table-column label="姓名" prop="username" sortable />
          <el-table-column label="工号" prop="workNumber" sortable />
          <el-table-column label="聘用形式" prop="formOfEmployment" sortable />
          <el-table-column label="部门" prop="departmentName" sortable />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable />
          <el-table-column label="账户状态" prop="enableState" sortable />
          <el-table-column label="操作" sortable fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :page-size="pages.size"
            :total="total"
            @current-change="currentChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<!-- <el-button type="danger">普通excel导出</el-button>
<el-button type="info">复杂表头excel导出</el-button>
<el-button type="success">excel导入</el-button>
<el-button type="primary">新增员工</el-button> -->

<script>
import { getEmployeesInfoApi } from "@/api/employees";
export default {
  data() {
    return {
      pages: {
        page: 1,
        size: 5,
      },
      employees: [],
      total: 0,
    };
  },

  created() {
    this.getEmployeesList();
  },

  methods: {
    async getEmployeesList() {
      const { rows, total } = await getEmployeesInfoApi(this.pages);
      this.employees = rows;
      this.total = total;
    },
    currentChange(val) {
      this.pages.page = val;
      this.getEmployeesList();
    },
  },
};
</script>

<style scoped lang="less"></style>
