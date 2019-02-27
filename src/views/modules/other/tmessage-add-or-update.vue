<template>
  <el-dialog
    :title="'发送消息'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    
    <!-- <el-form-item label="消息类型" prop="type">
      <el-select class="select" v-model="dataForm.type" placeholder="请选择" >
        <el-option :value="1" label="商家消息">商家消息</el-option>
        <el-option :value="2" label="系统消息">系统消息</el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="消息内容" prop="message">
      <el-input type="textarea" :rows="7" v-model="dataForm.message" placeholder="消息内容"></el-input>
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
          message: ''
        },
        dataRule: {
          message: [
            { required: true, message: '消息内容不能为空', trigger: 'blur' }
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
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/other/tmessage/sendMessage`),
              method: 'put',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'message': this.dataForm.message
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
