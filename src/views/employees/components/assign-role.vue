<template>
  <el-dialog
    @open="onOpen"
    title="分配角色"
    :visible="visible"
    @close="onClose"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="(item, index) in roles" :key="index" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="assignRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRolesApi } from "@/api/role";
import { getUserDetail } from "@/api/user";
import { assignRoles } from "@/api/employees";
export default {
  data() {
    return {
      checkList: [], //记录选中的
      roles: [],
    };
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    employeesId: {
      type: String,
      required: true,
    },
  },

  created() {},

  methods: {
    onClose() {
      this.$emit("update:visible", false);
    },
    // 获取角色列表
    async getRolesList() {
      const roles = await getRolesApi();
      this.roles = roles.rows;
    },
    // 在弹框打开的时候触发
    onOpen() {
      this.getRolesList();
      this.getEmployeesRoles();
    },
    // 获取员工角色列表
    async getEmployeesRoles() {
      const { roleIds } = await getUserDetail(this.employeesId);
      this.checkList = roleIds;
    },
    // 分配角色
    async assignRole() {
      if (!this.checkList.length) return this.$message.error("请分配角色");
      await assignRoles({
        id: this.employeesId,
        roleIds: this.checkList,
      });
      this.$message.success("分配成功");
      this.onClose();
    },
  },
};
</script>

<style scoped></style>
