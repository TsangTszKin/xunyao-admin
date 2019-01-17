<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="昵称" prop="nickname">
      <el-input v-model="dataForm.nickname" placeholder="昵称"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="dataForm.phone" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item label="登陆密码" prop="password">
      <el-input v-model="dataForm.password" placeholder="登陆密码"></el-input>
    </el-form-item>
    <el-form-item label="微信openid" prop="openId">
      <el-input v-model="dataForm.openId" placeholder="微信openid"></el-input>
    </el-form-item>
    <el-form-item label="微信头像" prop="headimgurl">
      <el-input v-model="dataForm.headimgurl" placeholder="微信头像"></el-input>
    </el-form-item>
    <el-form-item label="" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder=""></el-input>
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
          buyerId: 0,
          nickname: '',
          phone: '',
          password: '',
          openId: '',
          headimgurl: '',
          createTime: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          nickname: [
            { required: true, message: '昵称不能为空', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '登陆密码不能为空', trigger: 'blur' }
          ],
          openId: [
            { required: true, message: '微信openid不能为空', trigger: 'blur' }
          ],
          headimgurl: [
            { required: true, message: '微信头像不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
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
        this.dataForm.buyerId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.buyerId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/tbuyer/info/${this.dataForm.buyerId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.nickname = data.tbuyer.nickname
                this.dataForm.phone = data.tbuyer.phone
                this.dataForm.password = data.tbuyer.password
                this.dataForm.openId = data.tbuyer.openId
                this.dataForm.headimgurl = data.tbuyer.headimgurl
                this.dataForm.createTime = data.tbuyer.createTime
                this.dataForm.remarks = data.tbuyer.remarks
                this.dataForm.delFlag = data.tbuyer.delFlag
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
              url: this.$http.adornUrl(`/generator/tbuyer/${!this.dataForm.buyerId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'buyerId': this.dataForm.buyerId || undefined,
                'nickname': this.dataForm.nickname,
                'phone': this.dataForm.phone,
                'password': this.dataForm.password,
                'openId': this.dataForm.openId,
                'headimgurl': this.dataForm.headimgurl,
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
