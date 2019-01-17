<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="买家id" prop="buyerId">
      <el-input v-model="dataForm.buyerId" placeholder="买家id"></el-input>
    </el-form-item>
    <el-form-item label="充值/提现金额" prop="money">
      <el-input v-model="dataForm.money" placeholder="充值/提现金额"></el-input>
    </el-form-item>
    <el-form-item label="对外交易号" prop="outTradeId">
      <el-input v-model="dataForm.outTradeId" placeholder="对外交易号"></el-input>
    </el-form-item>
    <el-form-item label="流水号" prop="transactionId">
      <el-input v-model="dataForm.transactionId" placeholder="流水号"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createDate">
      <el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remarks">
      <el-input v-model="dataForm.remarks" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="删除标识" prop="delFlag">
      <el-input v-model="dataForm.delFlag" placeholder="删除标识"></el-input>
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
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          buyerId: '',
          money: '',
          outTradeId: '',
          transactionId: '',
          status: '',
          createDate: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          buyerId: [
            { required: true, message: '买家id不能为空', trigger: 'blur' }
          ],
          money: [
            { required: true, message: '充值/提现金额不能为空', trigger: 'blur' }
          ],
          outTradeId: [
            { required: true, message: '对外交易号不能为空', trigger: 'blur' }
          ],
          transactionId: [
            { required: true, message: '流水号不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
          ],
          createDate: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          remarks: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          delFlag: [
            { required: true, message: '删除标识不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/generator/tbuyerrechargelog/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.buyerId = data.tbuyerrechargelog.buyerId
                this.dataForm.money = data.tbuyerrechargelog.money
                this.dataForm.outTradeId = data.tbuyerrechargelog.outTradeId
                this.dataForm.transactionId = data.tbuyerrechargelog.transactionId
                this.dataForm.status = data.tbuyerrechargelog.status
                this.dataForm.createDate = data.tbuyerrechargelog.createDate
                this.dataForm.remarks = data.tbuyerrechargelog.remarks
                this.dataForm.delFlag = data.tbuyerrechargelog.delFlag
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/tbuyerrechargelog/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'buyerId': this.dataForm.buyerId,
                'money': this.dataForm.money,
                'outTradeId': this.dataForm.outTradeId,
                'transactionId': this.dataForm.transactionId,
                'status': this.dataForm.status,
                'createDate': this.dataForm.createDate,
                'remarks': this.dataForm.remarks,
                'delFlag': this.dataForm.delFlag
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
