<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="广告标题" prop="title">
      <el-input v-model="dataForm.title" placeholder="广告标题"></el-input>
    </el-form-item>
    <el-form-item label="店铺ID，可为空" prop="shopId">
      <el-input v-model="dataForm.shopId" placeholder="店铺ID，可为空"></el-input>
    </el-form-item>
    <el-form-item label="广告类型，1首页广告 2店铺广告" prop="type">
      <el-input v-model="dataForm.type" placeholder="广告类型，1首页广告 2店铺广告"></el-input>
    </el-form-item>
    <el-form-item label="广告图片" prop="pic">
      <el-input v-model="dataForm.pic" placeholder="广告图片"></el-input>
    </el-form-item>
    <el-form-item label="广告链接" prop="link">
      <el-input v-model="dataForm.link" placeholder="广告链接"></el-input>
    </el-form-item>
    <el-form-item label="广告状态 1上架 2下架" prop="status">
      <el-input v-model="dataForm.status" placeholder="广告状态 1上架 2下架"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
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
          title: '',
          shopId: '',
          type: '',
          pic: '',
          link: '',
          status: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          title: [
            { required: true, message: '广告标题不能为空', trigger: 'blur' }
          ],
          shopId: [
            { required: true, message: '店铺ID，可为空不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '广告类型，1首页广告 2店铺广告不能为空', trigger: 'blur' }
          ],
          pic: [
            { required: true, message: '广告图片不能为空', trigger: 'blur' }
          ],
          link: [
            { required: true, message: '广告链接不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '广告状态 1上架 2下架不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/tadvert/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.title = data.tadvert.title
                this.dataForm.shopId = data.tadvert.shopId
                this.dataForm.type = data.tadvert.type
                this.dataForm.pic = data.tadvert.pic
                this.dataForm.link = data.tadvert.link
                this.dataForm.status = data.tadvert.status
                this.dataForm.createTime = data.tadvert.createTime
                this.dataForm.updateTime = data.tadvert.updateTime
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
              url: this.$http.adornUrl(`/generator/tadvert/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'shopId': this.dataForm.shopId,
                'type': this.dataForm.type,
                'pic': this.dataForm.pic,
                'link': this.dataForm.link,
                'status': this.dataForm.status,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime
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
