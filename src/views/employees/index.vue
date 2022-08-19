<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('./import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportExcel"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="showAdd"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employees">
          <el-table-column label="序号" type="index" sortable />
          <el-table-column label="姓名" prop="username" sortable />
          <el-table-column label="员工" prop="username" sortable>
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 80px;
                  height: 80px;
                  padding: 10px;
                "
                @click="showErCodeDialog(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" prop="workNumber" sortable />
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            sortable
            :formatter="formatFormOfEmployment"
          />
          <el-table-column label="部门" prop="departmentName" sortable />
          <el-table-column label="入职时间" sortable>
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable>
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="onRemove(row.id)"
                >删除</el-button
              >
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

    <!-- 添加员工组件 -->
    <AddEmployees
      :visible.sync="showAddEmployees"
      @add-success="getEmployeesList"
    ></AddEmployees>

    <!-- 添加二维码弹层 -->
    <el-dialog title="头像二维码" :visible.sync="erCodeDialog">
      <canvas id="canvas"></canvas>
    </el-dialog>
  </div>
</template>

<script>
import { getEmployeesInfoApi, delEmployee } from "@/api/employees";
import employees from "@/constant/employees";
const { exportExcelMapPath, hireType } = employees;
import AddEmployees from "./components/add-employees.vue";
import QRcode from "qrcode";
export default {
  data() {
    return {
      pages: {
        page: 1,
        size: 5,
      },
      employees: [],
      total: 0,
      showAddEmployees: false,
      erCodeDialog: false,
    };
  },

  created() {
    this.getEmployeesList();
  },
  components: {
    AddEmployees,
  },

  methods: {
    // 获取页面数据
    async getEmployeesList() {
      const { rows, total } = await getEmployeesInfoApi(this.pages);
      this.employees = rows;
      this.total = total;
    },
    // 页码变化的时候
    currentChange(val) {
      this.pages.page = val;
      this.getEmployeesList();
    },
    // 格式化聘用形式的数据
    formatFormOfEmployment(row, column, cellValue, index) {
      const findItem = hireType.find((item) => item.id === cellValue);
      return findItem ? findItem.value : "未知";
    },
    // 删除功能
    async onRemove(id) {
      try {
        await this.$confirm("您确定删除该员工吗");
        await delEmployee(id);
        this.getEmployeesList();
        this.$message.success("删除员工成功");
      } catch (error) {
        console.log(error);
      }
    },
    // 添加员工
    showAdd() {
      this.showAddEmployees = true;
    },
    async exportExcel() {
      const { export_json_to_excel } = await import("@/vendor/Export2Excel");
      const { rows } = await getEmployeesInfoApi({
        page: 1,
        size: this.total,
      });
      const header = Object.keys(exportExcelMapPath);
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === "聘用形式") {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]];
            });
            return findItem ? findItem.value : "未知";
          } else {
            return item[exportExcelMapPath[h]];
          }
        });
      });
      export_json_to_excel({
        header, //表头 必填
        data,
        filename: "excel-list", //非必填
        autoWidth: true, //非必填
        bookType: "xlsx", //非必填
      });
    },
    // 点击显示二维码弹层
    showErCodeDialog(staffPhoto) {
      if (!staffPhoto) return this.$message.error("该用户还未设置头像");
      this.erCodeDialog = true;

      this.$nextTick(() => {
        const canvas = document.getElementById("canvas");
        QRcode.toCanvas(canvas, staffPhoto);
      });
    },
  },
};
</script>

<style scoped lang="less"></style>
