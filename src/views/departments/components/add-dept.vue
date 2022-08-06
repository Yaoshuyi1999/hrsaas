<template>
  <el-dialog @close="onclose" title="添加部门" :visible="visible" width="50%">
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="输入部门名称"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="输入部门编码"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 100%"
          placeholder="请选择部门负责人"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          type="textarea"
          placeholder="输入部门介绍"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDeptsApi, addDeptsApi } from "@/api/department";
import { getEmployeesApi } from "@/api/employees";
export default {
  data() {
    const checkDeptName = (rule, value, callback) => {
      if (!this.currentNode.children) return callback();
      // 1.判断value是否 和添加的同级部门是否重复(获取到同级部门)
      const isRepeat = this.currentNode.children.some(
        (item) => item.name === value
      );
      // 2.如果重复了 callback(new Error('部门重复'))
      isRepeat ? callback(new Error("部门重复")) : callback();
    };
    const checkDeptCode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi();
      // console.log(depts);
      const isRepeat = depts.some((item) => item.code === value);
      isRepeat ? callback(new Error("部门编码重复")) : callback();
    };
    return {
      formData: {
        name: "", //部门名称
        code: "", //部门编码
        manager: "", // 部门管理者
        introduce: "", // 部门介绍
      },
      formRules: {
        name: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          {
            validator: checkDeptName,
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入部门编码", trigger: "blur" },
          {
            validator: checkDeptCode,
            trigger: "blur",
          },
        ],
        manager: [
          { required: true, message: "请输入部门管理者", trigger: "change" },
        ],
        introduce: [
          { required: true, message: "请输入部门介绍", trigger: "blur" },
        ],
      },
      employees: [],
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },

  created() {
    this.getEmployeesList();
  },

  methods: {
    async getEmployeesList() {
      const res = await getEmployeesApi();
      // console.log(res);
      this.employees = res;
    },
    onclose() {
      this.$emit("update:visible", false);
    },
    async onSave() {
      await this.$refs.form.validate();
      this.formData.pid = this.currentNode.id;
      try {
        await addDeptsApi(this.formData);
        
        this.$message.success("新增部门成功");
        // console.log(1);
        this.onclose();
        this.$emit("add-success");
      } catch (err) {
        this.$message.error("新增部门失败");
      }
    },
  },
};
</script>

<style scoped></style>
