<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!--头部-->
        <tree-tools :treeNode="company" :isRoot="true"></tree-tools>
        <!-- 树形结构 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <tree-tools :treeNode="data"></tree-tools>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools.vue";
import { getDeptsApi } from "@/api/department";
import { transListToTree } from "@/utils";
export default {
  components: {
    TreeTools,
  },
  data() {
    return {
      defaultProps: {
        label: "name",
      },
      company: { name: "传智教育", manager: "负责人" },
      treeData: [],
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
  },
};
</script>

<style scoped lang="less"></style>
