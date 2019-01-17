<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="发送人" prop="sendId">
      <el-input v-model="dataForm.sendId" placeholder="发送人"></el-input>
    </el-form-item>
    <el-form-item label="接收人" prop="receiverId">
      <el-input v-model="dataForm.receiverId" placeholder="接收人"></el-input>
    </el-form-item>
    <el-form-item label="消息类型，1系统通知，2店家推送" prop="type">
      <el-input v-model="dataForm.type" placeholder="消息类型，1系统通知，2店家推送"></el-input>
    </el-form-item>
    <el-form-item label="消息内容" prop="message">
      <el-input v-model="dataForm.message" placeholder="消息内容"></el-input>
    </el-form-item>
    <el-form-item label="阅读状态" prop="readStatus">
      <el-input v-model="dataForm.readStatus" placeholder="阅读状态"></el-input>
    </el-form-item>
    <el-form-item label="阅读时间" prop="readTime">
      <el-input v-model="dataForm.readTime" placeholder="阅读时间"></el-input>
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
          sendId: '',
          receiverId: '',
          type: '',
          message: '',
          readStatus: '',
          readTime: '',
          createTime: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          sendId: [
            { required: true, message: '发送人不能为空', trigger: 'blur' }
          ],
          receiverId: [
            { required: true, message: '接收人不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '消息类型，1系统通知，2店家推送不能为空', trigger: 'blur' }
          ],
          message: [
            { required: true, message: '消息内容不能为空', trigger: 'blur' }
          ],
          readStatus: [
            { required: true, message: '阅读状态不能为空', trigger: 'blur' }
          ],
          readTime: [
            { required: true, message: '阅读时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/tmessage/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.sendId = data.tmessage.sendId
                this.dataForm.receiverId = data.tmessage.receiverId
                this.dataForm.type = data.tmessage.type
                this.dataForm.message = data.tmessage.message
                this.dataForm.readStatus = data.tmessage.readStatus
                this.dataForm.readTime = data.tmessage.readTime
                this.dataForm.createTime = data.tmessage.createTime
                this.dataForm.remarks = data.tmessage.remarks
                this.dataForm.delFlag = data.tmessage.delFlag
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
              url: this.$http.adornUrl(`/generator/tmessage/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'sendId': this.dataForm.sendId,
                'receiverId': this.dataForm.receiverId,
                'type': this.dataForm.type,
                'message': this.dataForm.message,
                'readStatus': this.dataForm.readStatus,
                'readTime': this.dataForm.readTime,
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
