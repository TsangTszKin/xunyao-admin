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
    <el-form-item label="店铺ID" prop="shopId">
      <el-input v-model="dataForm.shopId" placeholder="店铺ID"></el-input>
    </el-form-item>
    <el-form-item label="产品ID" prop="productId">
      <el-input v-model="dataForm.productId" placeholder="产品ID"></el-input>
    </el-form-item>
    <el-form-item label="类型，1收藏店铺 2关注药品" prop="type">
      <el-input v-model="dataForm.type" placeholder="类型，1收藏店铺 2关注药品"></el-input>
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
          type: '',
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
            { required: true, message: '店铺ID不能为空', trigger: 'blur' }
          ],
          productId: [
            { required: true, message: '产品ID不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '类型，1收藏店铺 2关注药品不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/tfavorite/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.tfavorite.userId
                this.dataForm.buyerId = data.tfavorite.buyerId
                this.dataForm.shopId = data.tfavorite.shopId
                this.dataForm.productId = data.tfavorite.productId
                this.dataForm.type = data.tfavorite.type
                this.dataForm.createTime = data.tfavorite.createTime
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
              url: this.$http.adornUrl(`/generator/tfavorite/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'userId': this.dataForm.userId,
                'buyerId': this.dataForm.buyerId,
                'shopId': this.dataForm.shopId,
                'productId': this.dataForm.productId,
                'type': this.dataForm.type,
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
