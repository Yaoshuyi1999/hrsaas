<template>
  <el-dialog
    @close="onclose"
    :title="dialogTitle"
    :visible="visible"
    width="50%"
  >
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
import {
  getDeptsApi,
  addDeptsApi,
  getDeptByIdApi,
  editDeptByIdApi,
} from "@/api/department";
import { getEmployeesApi } from "@/api/employees";
export default {
  data() {
    const checkDeptName = async (rule, value, callback) => {
      if (this.formData.id) {
        const { depts } = await getDeptsApi();
        const filtersDepts = depts.filter(
          (item) =>
            item.pid === this.formData.pid && item.id !== this.formData.id
        );
        const isRepeat = filtersDepts.some((item) => item.name === value);
        isRepeat ? callback(new Error("部门重复")) : callback();
      } else {
        if (!this.currentNode.children) return callback();
        const isRepeat = this.currentNode.children.some(
          (item) => item.name === value
        );
        isRepeat ? callback(new Error("部门编码重复")) : callback();
      }
    };
    const checkDeptCode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi();
      let isRepeat;
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value);
      } else {
        isRepeat = depts.some((item) => item.code === value);
      }
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
  computed: {
    dialogTitle() {
      return this.formData.id ? "编辑部门" : "添加部门";
    },
  },

  methods: {
    async getEmployeesList() {
      const res = await getEmployeesApi();
      // console.log(res);
      this.employees = res;
    },
    onclose() {
      this.$emit("update:visible", false);
      this.$refs.form.resetFields();
      this.formData = {
        name: "", //部门名称
        code: "", //部门编码
        manager: "", // 部门管理者
        introduce: "", // 部门介绍
      };
    },
    // 点击添加确定
    async onSave() {
      editDeptByIdApi;
      await this.$refs.form.validate();
      if (this.formData.id) {
        await editDeptByIdApi(this.formData);
        this.$message.success("编辑成功");
        this.onclose();
        this.$emit("add-success");
      } else {
        this.formData.pid = this.currentNode.id;
        await addDeptsApi(this.formData);
        this.$message.success("新增部门成功");
        this.onclose();
        this.$emit("add-success");
      }
    },
    async getDeptById(id) {
      this.formData = await getDeptByIdApi(id);
      // console.log(this.formData);
    },
  },
};
</script>

<style scoped></style>
