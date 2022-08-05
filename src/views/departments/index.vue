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
      treeData: [
        { name: "总裁办", children: [{ name: "董事会" }] },
        { name: "行政部" },
        { name: "人事部" },
      ],
    };
  },

  created() {},

  methods: {},
};
</script>

<style scoped lang="less"></style>
