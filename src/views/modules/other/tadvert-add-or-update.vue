<template>
  <el-dialog
    :title="!dataForm.id ? '新增首页广告' : '修改首页广告'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-form-item label="广告标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="广告标题"></el-input>
      </el-form-item>
      <el-form-item label="广告图片" prop="pic">
        <el-upload :action="url" :before-upload="beforeUploadHandle" :on-success="successHandle">
          <el-button type="primary">上传图片</el-button>
        </el-upload>
        <el-alert title="请上传415px*165px的图片" type="info" close-text="知道了" style="margin: 10px 0;"></el-alert>
        <img v-if="dataForm.pic" :src="dataForm.pic" style="width: 300px;">
      </el-form-item>

      <el-form-item label="广告状态" prop="status">
        <el-select class="select" v-model="dataForm.status" placeholder="请选择">
          <el-option :value="1" label="上架"></el-option>
          <el-option :value="2" label="下架"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div class="edit_container">
      <quill-editor
        v-model="dataForm.content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ShopPicker from "@/components/ShopPicker";
import Upload from "../oss/oss-upload";

import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  components: {
    ShopPicker,
    Upload,
    quillEditor
  },
  data() {
    return {
      visible: false,
      url: this.$http.adornUrl(
        `/admin/other/uploadFile?token=${this.$cookie.get("token")}`
      ),
      dataForm: {
        id: 0,
        title: "",
        shopId: "",
        type: 1,
        pic: "",
        status: "",
        content: ""
      },
      dataRule: {
        title: [
          { required: true, message: "广告标题不能为空", trigger: "blur" }
        ],
        pic: [{ required: true, message: "广告图片不能为空", trigger: "blur" }],
        title: [
          { required: true, message: "广告标题不能为空", trigger: "blur" }
        ],
        status: [
          {
            required: true,
            message: "请选择广告状态",
            trigger: "blur"
          }
        ]
      },
      editorOption: {}
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/other/tadvert/info/${this.dataForm.id}`),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm = data.tAdvert;
              this.dataForm.type = 1;
            }
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/other/tadvert/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "put",
            data: this.$http.adornData(this.dataForm)
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    shopChangeSelectCallBack(obj) {
      this.dataForm.shopId = obj.shopId;
      this.dataForm.shopName = obj.shopName;
    },
    beforeUploadHandle(file) {
      if (
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/gif"
      ) {
        this.$message.error("只支持jpg、png、gif格式的图片！");
        return false;
      }
    },
    successHandle(response) {
      this.dataForm.pic = response.url;
      //alert(this.dataForm.productImg);
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {} // 内容改变事件
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  }
};
</script>
