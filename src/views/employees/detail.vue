<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="account" label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input style="width: 300px" v-model="formDate.username" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="formDate.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="userInfo" label="个人详情">
            <user-info></user-info>
          </el-tab-pane>
          <el-tab-pane name="jobsInfo" label="岗位信息">
            <jobInfo></jobInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetail, saveUserDetailById } from "@/api/user";
import userInfo from "./components/user-info";
import jobInfo from "./components/job-info";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      formDate: {},
      activeName: Cookies.get("employeeDetailTab") || "account",
    };
  },
  components: {
    userInfo,
    jobInfo,
  },

  created() {
    this.loadUserDetail();
  },

  methods: {
    async loadUserDetail() {
      const res = await getUserDetail(this.$route.params.id);
      this.formDate = res;
    },
    async onSave() {
      await saveUserDetailById(this.formDate);
      this.$message.success("修改成功");
    },
    handleClick() {
      Cookies.set("employeeDetailTab", this.activeName);
    },
  },
};
</script>

<style scoped></style>
