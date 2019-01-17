<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="所属商家" prop="shopId">
      <el-input v-model="dataForm.shopId" placeholder="所属商家"></el-input>
    </el-form-item>
    <el-form-item label="归属用户" prop="buyerId">
      <el-input v-model="dataForm.buyerId" placeholder="归属用户"></el-input>
    </el-form-item>
    <el-form-item label="优惠券类型" prop="type">
      <el-input v-model="dataForm.type" placeholder="优惠券类型"></el-input>
    </el-form-item>
    <el-form-item label="优惠券名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="优惠券名称"></el-input>
    </el-form-item>
    <el-form-item label="开始有效时间" prop="beginTime">
      <el-input v-model="dataForm.beginTime" placeholder="开始有效时间"></el-input>
    </el-form-item>
    <el-form-item label="结束有效时间" prop="endTime">
      <el-input v-model="dataForm.endTime" placeholder="结束有效时间"></el-input>
    </el-form-item>
    <el-form-item label="状态，0未使用，1已使用，3已过期" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态，0未使用，1已使用，3已过期"></el-input>
    </el-form-item>
    <el-form-item label="使用订单" prop="useOrderId">
      <el-input v-model="dataForm.useOrderId" placeholder="使用订单"></el-input>
    </el-form-item>
    <el-form-item label="使用时间" prop="useTime">
      <el-input v-model="dataForm.useTime" placeholder="使用时间"></el-input>
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
          shopId: '',
          buyerId: '',
          type: '',
          name: '',
          beginTime: '',
          endTime: '',
          status: '',
          useOrderId: '',
          useTime: '',
          createTime: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          shopId: [
            { required: true, message: '所属商家不能为空', trigger: 'blur' }
          ],
          buyerId: [
            { required: true, message: '归属用户不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '优惠券类型不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '优惠券名称不能为空', trigger: 'blur' }
          ],
          beginTime: [
            { required: true, message: '开始有效时间不能为空', trigger: 'blur' }
          ],
          endTime: [
            { required: true, message: '结束有效时间不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态，0未使用，1已使用，3已过期不能为空', trigger: 'blur' }
          ],
          useOrderId: [
            { required: true, message: '使用订单不能为空', trigger: 'blur' }
          ],
          useTime: [
            { required: true, message: '使用时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/tcoupon/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.shopId = data.tcoupon.shopId
                this.dataForm.buyerId = data.tcoupon.buyerId
                this.dataForm.type = data.tcoupon.type
                this.dataForm.name = data.tcoupon.name
                this.dataForm.beginTime = data.tcoupon.beginTime
                this.dataForm.endTime = data.tcoupon.endTime
                this.dataForm.status = data.tcoupon.status
                this.dataForm.useOrderId = data.tcoupon.useOrderId
                this.dataForm.useTime = data.tcoupon.useTime
                this.dataForm.createTime = data.tcoupon.createTime
                this.dataForm.remarks = data.tcoupon.remarks
                this.dataForm.delFlag = data.tcoupon.delFlag
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
              url: this.$http.adornUrl(`/generator/tcoupon/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'shopId': this.dataForm.shopId,
                'buyerId': this.dataForm.buyerId,
                'type': this.dataForm.type,
                'name': this.dataForm.name,
                'beginTime': this.dataForm.beginTime,
                'endTime': this.dataForm.endTime,
                'status': this.dataForm.status,
                'useOrderId': this.dataForm.useOrderId,
                'useTime': this.dataForm.useTime,
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
