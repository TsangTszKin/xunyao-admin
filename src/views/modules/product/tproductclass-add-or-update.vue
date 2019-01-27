<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="父id" prop="parentId">
      <el-input v-model="dataForm.parentId" placeholder="父id"></el-input>
    </el-form-item>
    <el-form-item label="分类名称" prop="className">
      <el-input v-model="dataForm.className" placeholder="分类名称"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="bySort">
      <el-input v-model="dataForm.bySort" placeholder="排序"></el-input>
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
          parentId: '',
          className: '',
          bySort: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          parentId: [
            { required: true, message: '父id不能为空', trigger: 'blur' }
          ],
          className: [
            { required: true, message: '分类名称不能为空', trigger: 'blur' }
          ],
          bySort: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/product/tproductclass/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.parentId = data.tProductClass.parentId
                this.dataForm.className = data.tProductClass.className
                this.dataForm.bySort = data.tProductClass.bySort
                this.dataForm.remarks = data.tProductClass.remarks
                this.dataForm.delFlag = data.tProductClass.delFlag
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
              url: this.$http.adornUrl(`/product/tproductclass/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'put',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'parentId': this.dataForm.parentId,
                'className': this.dataForm.className,
                'bySort': this.dataForm.bySort,
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
