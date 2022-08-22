<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <!-- 按钮 -->
          <el-button
            type="primary"
            @click="addDialog"
            v-if="isHas(point.roles.add)"
            >新增角色</el-button
          >
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{ row }">
                <el-button
                  size="small"
                  type="success"
                  @click="showRightDialog(row.id)"
                  >分配权限</el-button
                >
                <el-button
                  size="small"
                  type="primary"
                  v-isHas="point.roles.edit"
                  >编辑</el-button
                >
                <el-button size="small" type="danger" @click="onRemove(row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            layout="sizes,prev, pager, next"
            :page-sizes="[3, 5, 10, 20]"
            :total="total"
            :page-size="params.pagesize"
            @current-change="currentChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input disabled v-model="companyInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                disabled
                v-model="companyInfo.companyAddress"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="companyInfo.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="companyInfo.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 添加角色弹层 -->
    <el-dialog
      @close="dialogClose"
      title="新增角色"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <el-form
        ref="form"
        :model="addRoleForm"
        :rules="addRoleFormRules"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onAddRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 给角色分配权限 -->
    <el-dialog
      title="给角色分配权限"
      :visible.sync="setRightDialog"
      width="50%"
      @close="setRightsClose"
      destroy-on-close
    >
      <el-tree
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="defaultCheckKeys"
        :data="permissions"
        :props="{ label: 'name' }"
        ref="perTree"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialog = false">取 消</el-button>
        <el-button type="primary" @click="onSaveRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRolesApi,
  addRolesApi,
  removeRolesApi,
  getRolesInfo,
  assignPerm,
} from "@/api/role";
import { getCompanyInfoApi } from "@/api/setting";
import { getPermissionList } from "@/api/permission";
import { transListToTree } from "@/utils";
import MixinPermission from "@/mixins/permission";
export default {
  data() {
    return {
      activeName: "first",
      tableData: [],
      total: 0,
      params: {
        page: 1,
        pagesize: 3,
      },
      addDialogVisible: false,
      addRoleForm: {
        name: "",
        description: "",
      },
      addRoleFormRules: {
        name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
      },
      companyInfo: {},
      setRightDialog: false, //分配权限的弹层
      permissions: [], //权限树形数据
      defaultCheckKeys: [], //分配权限
      roleId: "",
    };
  },

  mixins: [MixinPermission],

  created() {
    this.getRoles();
    this.getCompanyInfo();
    this.getPermissions();
  },

  methods: {
    // 请求得到数据
    async getRoles() {
      const { rows, total } = await getRolesApi(this.params);
      this.tableData = rows;
      this.total = total;
    },
    // 切换页码
    currentChange(val) {
      this.params.page = val;
      this.getRoles();
    },
    // 切换一页几条
    handleSizeChange(val) {
      this.params.pagesize = val;
      this.getRoles();
    },
    // 点击新增事件
    addDialog() {
      this.addDialogVisible = true;
    },
    // 取消弹层
    onClose() {
      this.addDialogVisible = false;
    },
    // 保存
    async onAddRole() {
      await this.$refs.form.validate();
      await addRolesApi(this.addRoleForm);
      this.$message.success("添加成功");
      this.addDialogVisible = false;
      this.getRoles();
    },
    // 监听对话框关闭
    dialogClose() {
      // 重置有校验的表单
      this.$refs.form.resetFields();
      this.addRoleForm.description = "";
    },
    // 删除
    async onRemove(id) {
      // console.log(id);
      await removeRolesApi(id);
      this.$message.success("添加成功");
      this.getRoles();
    },
    // 获取公司信息
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId
      );
      this.companyInfo = res;
    },
    // 点击分配权限按钮
    async showRightDialog(id) {
      this.roleId = id;
      this.setRightDialog = true;
      const res = await getRolesInfo(id);
      this.defaultCheckKeys = res.permIds;
    },
    // 获取权限列表
    async getPermissions() {
      const res = await getPermissionList();
      const treePermission = transListToTree(res, "0");
      this.permissions = treePermission;
    },
    // 监听设置权限对话框
    setRightsClose() {
      this.defaultCheckKeys = [];
    },
    // 保存
    async onSaveRights() {
      await assignPerm({
        id: this.roleId,
        permIds: this.$refs.perTree.getCheckedKeys(),
      });
      this.$message.success("分配成功");
      this.setRightDialog = false;
    },
  },
};
</script>

<style scoped lang="less"></style>
