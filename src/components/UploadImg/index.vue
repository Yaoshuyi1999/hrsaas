<template>
  <div>
    <el-upload
      :file-list="fileList"
      action="#"
      list-type="picture-card"
      :http-request="onRequest"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      :limit="1"
      class="custom-upload"
      :class="fileList.length ? 'hide' : ''"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="previewImgDialog">
      <img :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from "cos-js-sdk-v5";
var cos = new COS({
  SecretId: "AKIDIdzLcqy6Um0LZbN48ETg8xow6rc5Sddn",
  SecretKey: "72jCRVVPAh3A5nJgrSr6ex63lM9j5FG8",
});
export default {
  name: "UploadImg",
  data() {
    return {
      fileList: [],
      previewImgDialog: false,
      imgUrl: "",
      loading: false,
    };
  },

  created() {},

  methods: {
    // 覆盖默认的上传行为，可以自定义上传的实现
    onRequest({ file }) {
      this.loading = true;
      cos.putObject(
        {
          Bucket: "ysy-1313341658" /* 必须 */,
          Region: "ap-nanjing" /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: "STANDARD",
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData));
          },
        },
        (err, data) => {
          this.loading = false;
          if (err || data.statusCode !== 200) {
            return this.$message.error("上传失败请重试");
          }
          this.$emit("onSuccess", {
            url: "https://" + data.Location,
          });
        }
      );
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange(file, fileList) {
      this.fileList = fileList;
    },
    // 文件列表移除文件时的钩子
    onRemove(file, fileList) {
      this.fileList = fileList;
    },
    // 点击文件列表中已上传的文件时的钩子
    onPreview(file) {
      this.previewImgDialog = true;
      this.imgUrl = file.url;
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeUpload(file) {
      // 限制上传的图片类型
      const types = ["image/jpeg", "image/gif"];
      if (!types.includes(file.type)) {
        this.$message.error(`请选择${types.join("、")}类型的图片`);
        return false;
      }
      //   限制上传的图片大小
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        this.$message.error("选择的图片不能超过100KB");
        return false;
      }
    },
  },
};
</script>

<style scoped>
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
