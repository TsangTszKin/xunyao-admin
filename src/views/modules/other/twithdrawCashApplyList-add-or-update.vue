<template>
  <el-dialog :title="'提现审核'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <!-- <el-form-item label="消息类型" prop="type">
      <el-select class="select" v-model="dataForm.type" placeholder="请选择" >
        <el-option :value="1" label="商家消息">商家消息</el-option>
        <el-option :value="2" label="系统消息">系统消息</el-option>
      </el-select>
      </el-form-item>-->
      <el-form-item label="申请用户" prop="buyerName">
        <el-input
          type="text"
          :readonly="true"
          :disabled="true"
          v-model="dataForm.buyerName"
          placeholder="申请用户"
        ></el-input>
      </el-form-item>
      <el-form-item label="银行卡号" prop="bankCard">
        <el-input
          type="text"
          :readonly="true"
          :disabled="true"
          v-model="dataForm.bankCard"
          placeholder="银行卡号"
        ></el-input>
      </el-form-item>
      <el-form-item label="银行名称" prop="bankName">
        <el-input
          type="text"
          :readonly="true"
          :disabled="true"
          v-model="dataForm.bankName"
          placeholder="银行名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="审核结果" prop="type">
        <el-select class="select" v-model="dataForm.status" placeholder="请选择">
          <el-option :value="0" label="拒绝">拒绝</el-option>
          <el-option :value="1" label="通过">通过</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" :rows="7" v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
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
      dataForm: {},

      dataRule: {
        // message: [
        //   { required: true, message: '消息内容不能为空', trigger: 'blur' }
        // ]
      }
    };
  },
  methods: {
    init(data) {
      this.dataForm = data;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/admin/moneyTrade/auditWithdrawCashApply`
            ),
            method: "post",
            params: this.$http.adornParams({
              id: this.dataForm.id,
              status: this.dataForm.status,
              remark: this.dataForm.remark,
              transactionId: this.dataForm.transactionId
            })
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
