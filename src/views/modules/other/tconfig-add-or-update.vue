<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="店铺ID" prop="shopId">
      <el-input v-model="dataForm.shopId" placeholder="店铺ID"></el-input>
    </el-form-item>
    <el-form-item label="最低" prop="min">
      <el-input v-model="dataForm.min" placeholder="最低"></el-input>
    </el-form-item>
    <el-form-item label="保证金百分比" prop="per">
      <el-input v-model="dataForm.per" placeholder="保证金百分比"></el-input>
    </el-form-item>
    <el-form-item label="邮费" prop="postage">
      <el-input v-model="dataForm.postage" placeholder="邮费"></el-input>
    </el-form-item>
    <el-form-item label="状态   0：无效   1：有效" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态   0：无效   1：有效"></el-input>
    </el-form-item>
    <el-form-item label="类型 1保证金设置" prop="type">
      <el-input v-model="dataForm.type" placeholder="类型 1保证金设置"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
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
          min: '',
          per: '',
          postage: '',
          status: '',
          type: '',
          remark: ''
        },
        dataRule: {
          shopId: [
            { required: true, message: '店铺ID不能为空', trigger: 'blur' }
          ],
          min: [
            { required: true, message: '最低不能为空', trigger: 'blur' }
          ],
          per: [
            { required: true, message: '保证金百分比不能为空', trigger: 'blur' }
          ],
          postage: [
            { required: true, message: '邮费不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态   0：无效   1：有效不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '类型 1保证金设置不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/tconfig/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.shopId = data.tconfig.shopId
                this.dataForm.min = data.tconfig.min
                this.dataForm.per = data.tconfig.per
                this.dataForm.postage = data.tconfig.postage
                this.dataForm.status = data.tconfig.status
                this.dataForm.type = data.tconfig.type
                this.dataForm.remark = data.tconfig.remark
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
              url: this.$http.adornUrl(`/generator/tconfig/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'shopId': this.dataForm.shopId,
                'min': this.dataForm.min,
                'per': this.dataForm.per,
                'postage': this.dataForm.postage,
                'status': this.dataForm.status,
                'type': this.dataForm.type,
                'remark': this.dataForm.remark
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
