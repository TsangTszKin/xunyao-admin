<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="买家id" prop="buyerId">
      <el-input v-model="dataForm.buyerId" placeholder="买家id"></el-input>
    </el-form-item>
    <el-form-item label="充值金额" prop="rechargeMoney">
      <el-input v-model="dataForm.rechargeMoney" placeholder="充值金额"></el-input>
    </el-form-item>
    <el-form-item label="对外交易号" prop="outRadeId">
      <el-input v-model="dataForm.outRadeId" placeholder="对外交易号"></el-input>
    </el-form-item>
    <el-form-item label="流水号" prop="transactionId">
      <el-input v-model="dataForm.transactionId" placeholder="流水号"></el-input>
    </el-form-item>
    <el-form-item label="充值状态(1: 成功 0：未成功)" prop="status">
      <el-input v-model="dataForm.status" placeholder="充值状态(1: 成功 0：未成功)"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
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
          rechargeMoney: '',
          outRadeId: '',
          transactionId: '',
          status: '',
          createTime: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          buyerId: [
            { required: true, message: '买家id不能为空', trigger: 'blur' }
          ],
          rechargeMoney: [
            { required: true, message: '充值金额不能为空', trigger: 'blur' }
          ],
          outRadeId: [
            { required: true, message: '对外交易号不能为空', trigger: 'blur' }
          ],
          transactionId: [
            { required: true, message: '流水号不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '充值状态(1: 成功 0：未成功)不能为空', trigger: 'blur' }
          ],
          createTime: [
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
              url: this.$http.adornUrl(`/generator/tbuyerrecharge/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.buyerId = data.tbuyerrecharge.buyerId
                this.dataForm.rechargeMoney = data.tbuyerrecharge.rechargeMoney
                this.dataForm.outRadeId = data.tbuyerrecharge.outRadeId
                this.dataForm.transactionId = data.tbuyerrecharge.transactionId
                this.dataForm.status = data.tbuyerrecharge.status
                this.dataForm.createTime = data.tbuyerrecharge.createTime
                this.dataForm.remarks = data.tbuyerrecharge.remarks
                this.dataForm.delFlag = data.tbuyerrecharge.delFlag
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
              url: this.$http.adornUrl(`/generator/tbuyerrecharge/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'buyerId': this.dataForm.buyerId,
                'rechargeMoney': this.dataForm.rechargeMoney,
                'outRadeId': this.dataForm.outRadeId,
                'transactionId': this.dataForm.transactionId,
                'status': this.dataForm.status,
                'createTime': this.dataForm.createTime,
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
