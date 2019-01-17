<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="创建时间" prop="createDate">
      <el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="修改时间" prop="updateDate">
      <el-input v-model="dataForm.updateDate" placeholder="修改时间"></el-input>
    </el-form-item>
    <el-form-item label="删除标识" prop="delFlag">
      <el-input v-model="dataForm.delFlag" placeholder="删除标识"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remarks">
      <el-input v-model="dataForm.remarks" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="类型，1建议、2意见、3投诉" prop="type">
      <el-input v-model="dataForm.type" placeholder="类型，1建议、2意见、3投诉"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="telephone">
      <el-input v-model="dataForm.telephone" placeholder="电话"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="dataForm.name" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item label="地址" prop="weixin">
      <el-input v-model="dataForm.weixin" placeholder="地址"></el-input>
    </el-form-item>
    <el-form-item label="经度" prop="qq">
      <el-input v-model="dataForm.qq" placeholder="经度"></el-input>
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
          suggestId: 0,
          createDate: '',
          updateDate: '',
          delFlag: '',
          remarks: '',
          type: '',
          telephone: '',
          name: '',
          weixin: '',
          qq: ''
        },
        dataRule: {
          createDate: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateDate: [
            { required: true, message: '修改时间不能为空', trigger: 'blur' }
          ],
          delFlag: [
            { required: true, message: '删除标识不能为空', trigger: 'blur' }
          ],
          remarks: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '类型，1建议、2意见、3投诉不能为空', trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '电话不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          weixin: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
          ],
          qq: [
            { required: true, message: '经度不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.suggestId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.suggestId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/tsuggest/info/${this.dataForm.suggestId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.createDate = data.tsuggest.createDate
                this.dataForm.updateDate = data.tsuggest.updateDate
                this.dataForm.delFlag = data.tsuggest.delFlag
                this.dataForm.remarks = data.tsuggest.remarks
                this.dataForm.type = data.tsuggest.type
                this.dataForm.telephone = data.tsuggest.telephone
                this.dataForm.name = data.tsuggest.name
                this.dataForm.weixin = data.tsuggest.weixin
                this.dataForm.qq = data.tsuggest.qq
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
              url: this.$http.adornUrl(`/generator/tsuggest/${!this.dataForm.suggestId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'suggestId': this.dataForm.suggestId || undefined,
                'createDate': this.dataForm.createDate,
                'updateDate': this.dataForm.updateDate,
                'delFlag': this.dataForm.delFlag,
                'remarks': this.dataForm.remarks,
                'type': this.dataForm.type,
                'telephone': this.dataForm.telephone,
                'name': this.dataForm.name,
                'weixin': this.dataForm.weixin,
                'qq': this.dataForm.qq
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
