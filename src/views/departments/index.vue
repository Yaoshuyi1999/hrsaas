<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!--头部-->
        <tree-tools
          :treeNode="company"
          :isRoot="true"
          @add="dialogVisible = true"
        ></tree-tools>
        <!-- 树形结构 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <tree-tools
              :treeNode="data"
              @remove="loadDepts"
              @add="showAddDept"
            ></tree-tools>
          </template>
        </el-tree>
      </el-card>
    </div>

    <!-- 添加部门弹层 -->
    <add-dept
      @add-success="loadDepts"
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
    />
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools.vue";
import { getDeptsApi } from "@/api/department";
import { transListToTree } from "@/utils";
import AddDept from "./components/add-dept";
export default {
  components: {
    TreeTools,
    AddDept,
  },
  data() {
    return {
      defaultProps: {
        label: "name",
      },
      company: { name: "传智教育", manager: "负责人" },
      treeData: [],
      dialogVisible: false,
      currentNode: {},
    };
  },

  created() {
    this.loadDepts();
  },

  methods: {
    async loadDepts() {
      const res = await getDeptsApi();
      // console.log(res);
      this.treeData = transListToTree(res.depts, "");
    },
    showAddDept(val) {
      (this.dialogVisible = true), (this.currentNode = val);
    },
  },
};
</script>

<style scoped lang="less"></style>
