<template>
  <el-dialog
    :title="!dataForm.id ? '新增买家信息' : '修改买家信息'"
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
      <el-form-item label="OPENID" prop="openId">
        <el-input v-model="dataForm.openId" readonly="readonly" placeholder="微信openid"></el-input>
      </el-form-item>
      <el-form-item label="微信头像" prop="headimgurl">
        <img class="avatar" style="height:36px" :src="dataForm.headimgurl">
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="dataForm.nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="dataForm.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="保证金" prop="money">
        <el-input v-model="dataForm.money" placeholder="保证金"></el-input>
      </el-form-item>
      <!-- <el-form-item v-if="!dataForm.id" label="登陆密码" prop="password">
      <el-input v-model="dataForm.password" placeholder="登陆密码"></el-input>
      </el-form-item>-->
      <el-form-item label="性别" prop="sex">
        <el-select class="select" v-model="dataForm.sex" placeholder="请选择">
          <el-option :value="1" label="男"></el-option>
          <el-option :value="0" label="女"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="dataForm.realname" placeholder></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="dataForm.idCard" placeholder></el-input>
      </el-form-item>
      <el-form-item label="用户类型" prop="type">
        <el-select class="select" v-model="dataForm.type" placeholder="请选择">
          <el-option :value="1" label="会员"></el-option>
          <el-option :value="0" label="游客"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="dataForm.remarks" placeholder="备注"></el-input>
      </el-form-item>
      <!-- <el-form-item label="删除标识" prop="delFlag">
      <el-input v-model="dataForm.delFlag" placeholder="删除标识"></el-input>
      </el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        nickname: "",
        phone: "",
        password: "",
        openId: "",
        headimgurl: "",
        // createTime: '',
        remarks: "",
        user: {},
        delFlag: ""
      },
      dataRule: {
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" }
        ],
        phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
        money: [{ required: true, message: "保证金不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "登陆密码不能为空", trigger: "blur" }
        ],
        openId: [
          { required: true, message: "微信openid不能为空", trigger: "blur" }
        ],
        headimgurl: [
          { required: true, message: "微信头像不能为空", trigger: "blur" }
        ],
        sex: [{ required: true, message: "性别不能为空", trigger: "blur" }],
        realname: [
          { required: true, message: "真实姓名不能为空", trigger: "blur" }
        ],
        idCard: [
          { required: true, message: "身份证号不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "用户类型不能为空", trigger: "blur" }
        ],
        remarks: [{ required: false, message: "备注不能为空", trigger: "blur" }],
        delFlag: [
          { required: true, message: "删除标识不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        //this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/admin/buyer/tbuyer/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm = data.tBuyer;
            }
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      //this.dataForm.money = this.dataForm.user.money;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/admin/buyer/tbuyer/${!this.dataForm.id ? "save" : "update"}`
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
    }
  }
};
</script>
