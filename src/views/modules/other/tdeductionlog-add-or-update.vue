<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="买家id" prop="buyerId">
      <el-input v-model="dataForm.buyerId" placeholder="买家id"></el-input>
    </el-form-item>
    <el-form-item label="订单号" prop="orderId">
      <el-input v-model="dataForm.orderId" placeholder="订单号"></el-input>
    </el-form-item>
    <el-form-item label="扣减金额" prop="deductionMoney">
      <el-input v-model="dataForm.deductionMoney" placeholder="扣减金额"></el-input>
    </el-form-item>
    <el-form-item label="扣减类型(1：订单押金 2、违约  3：其他)" prop="deductionType">
      <el-input v-model="dataForm.deductionType" placeholder="扣减类型(1：订单押金 2、违约  3：其他)"></el-input>
    </el-form-item>
    <el-form-item label="状态(1：生效(下订单和扣违约金)  0：取消或删除--订单完成后更改为此状态)" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态(1：生效(下订单和扣违约金)  0：取消或删除--订单完成后更改为此状态)"></el-input>
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
          orderId: '',
          deductionMoney: '',
          deductionType: '',
          status: '',
          createTime: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          buyerId: [
            { required: true, message: '买家id不能为空', trigger: 'blur' }
          ],
          orderId: [
            { required: true, message: '订单号不能为空', trigger: 'blur' }
          ],
          deductionMoney: [
            { required: true, message: '扣减金额不能为空', trigger: 'blur' }
          ],
          deductionType: [
            { required: true, message: '扣减类型(1：订单押金 2、违约  3：其他)不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态(1：生效(下订单和扣违约金)  0：取消或删除--订单完成后更改为此状态)不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/tdeductionlog/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.buyerId = data.tdeductionlog.buyerId
                this.dataForm.orderId = data.tdeductionlog.orderId
                this.dataForm.deductionMoney = data.tdeductionlog.deductionMoney
                this.dataForm.deductionType = data.tdeductionlog.deductionType
                this.dataForm.status = data.tdeductionlog.status
                this.dataForm.createTime = data.tdeductionlog.createTime
                this.dataForm.remarks = data.tdeductionlog.remarks
                this.dataForm.delFlag = data.tdeductionlog.delFlag
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
              url: this.$http.adornUrl(`/generator/tdeductionlog/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'buyerId': this.dataForm.buyerId,
                'orderId': this.dataForm.orderId,
                'deductionMoney': this.dataForm.deductionMoney,
                'deductionType': this.dataForm.deductionType,
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
