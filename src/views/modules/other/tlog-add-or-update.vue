<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户ID" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户ID"></el-input>
    </el-form-item>
    <el-form-item label="买家ID" prop="buyerId">
      <el-input v-model="dataForm.buyerId" placeholder="买家ID"></el-input>
    </el-form-item>
    <el-form-item label="记问店铺ID" prop="shopId">
      <el-input v-model="dataForm.shopId" placeholder="记问店铺ID"></el-input>
    </el-form-item>
    <el-form-item label="访问商品ID" prop="productId">
      <el-input v-model="dataForm.productId" placeholder="访问商品ID"></el-input>
    </el-form-item>
    <el-form-item label="用户名称" prop="userName">
      <el-input v-model="dataForm.userName" placeholder="用户名称"></el-input>
    </el-form-item>
    <el-form-item label="店铺名称" prop="shopName">
      <el-input v-model="dataForm.shopName" placeholder="店铺名称"></el-input>
    </el-form-item>
    <el-form-item label="商品名称" prop="productName">
      <el-input v-model="dataForm.productName" placeholder="商品名称"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
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
          userId: '',
          buyerId: '',
          shopId: '',
          productId: '',
          userName: '',
          shopName: '',
          productName: '',
          createTime: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '用户ID不能为空', trigger: 'blur' }
          ],
          buyerId: [
            { required: true, message: '买家ID不能为空', trigger: 'blur' }
          ],
          shopId: [
            { required: true, message: '记问店铺ID不能为空', trigger: 'blur' }
          ],
          productId: [
            { required: true, message: '访问商品ID不能为空', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '用户名称不能为空', trigger: 'blur' }
          ],
          shopName: [
            { required: true, message: '店铺名称不能为空', trigger: 'blur' }
          ],
          productName: [
            { required: true, message: '商品名称不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/tlog/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.tlog.userId
                this.dataForm.buyerId = data.tlog.buyerId
                this.dataForm.shopId = data.tlog.shopId
                this.dataForm.productId = data.tlog.productId
                this.dataForm.userName = data.tlog.userName
                this.dataForm.shopName = data.tlog.shopName
                this.dataForm.productName = data.tlog.productName
                this.dataForm.createTime = data.tlog.createTime
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
              url: this.$http.adornUrl(`/generator/tlog/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'userId': this.dataForm.userId,
                'buyerId': this.dataForm.buyerId,
                'shopId': this.dataForm.shopId,
                'productId': this.dataForm.productId,
                'userName': this.dataForm.userName,
                'shopName': this.dataForm.shopName,
                'productName': this.dataForm.productName,
                'createTime': this.dataForm.createTime
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
