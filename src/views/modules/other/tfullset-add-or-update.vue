<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="活动id" prop="fullCutId">
      <el-input v-model="dataForm.fullCutId" placeholder="活动id"></el-input>
    </el-form-item>
    <el-form-item label="满多少元" prop="meet">
      <el-input v-model="dataForm.meet" placeholder="满多少元"></el-input>
    </el-form-item>
    <el-form-item label="cash_required(减现金 0 不减 1 减)" prop="cashRequired">
      <el-input v-model="dataForm.cashRequired" placeholder="cash_required(减现金 0 不减 1 减)"></el-input>
    </el-form-item>
    <el-form-item label="(减多少现金)" prop="cash">
      <el-input v-model="dataForm.cash" placeholder="(减多少现金)"></el-input>
    </el-form-item>
    <el-form-item label="(是否包邮 0 不包邮 1 包邮)" prop="postage">
      <el-input v-model="dataForm.postage" placeholder="(是否包邮 0 不包邮 1 包邮)"></el-input>
    </el-form-item>
    <el-form-item label="创建人" prop="createBy">
      <el-input v-model="dataForm.createBy" placeholder="创建人"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createDate">
      <el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="修改人" prop="updateBy">
      <el-input v-model="dataForm.updateBy" placeholder="修改人"></el-input>
    </el-form-item>
    <el-form-item label="修改时间" prop="updateDate">
      <el-input v-model="dataForm.updateDate" placeholder="修改时间"></el-input>
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
          fullCutId: '',
          meet: '',
          cashRequired: '',
          cash: '',
          postage: '',
          createBy: '',
          createDate: '',
          updateBy: '',
          updateDate: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          fullCutId: [
            { required: true, message: '活动id不能为空', trigger: 'blur' }
          ],
          meet: [
            { required: true, message: '满多少元不能为空', trigger: 'blur' }
          ],
          cashRequired: [
            { required: true, message: 'cash_required(减现金 0 不减 1 减)不能为空', trigger: 'blur' }
          ],
          cash: [
            { required: true, message: '(减多少现金)不能为空', trigger: 'blur' }
          ],
          postage: [
            { required: true, message: '(是否包邮 0 不包邮 1 包邮)不能为空', trigger: 'blur' }
          ],
          createBy: [
            { required: true, message: '创建人不能为空', trigger: 'blur' }
          ],
          createDate: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateBy: [
            { required: true, message: '修改人不能为空', trigger: 'blur' }
          ],
          updateDate: [
            { required: true, message: '修改时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/tfullset/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.fullCutId = data.tfullset.fullCutId
                this.dataForm.meet = data.tfullset.meet
                this.dataForm.cashRequired = data.tfullset.cashRequired
                this.dataForm.cash = data.tfullset.cash
                this.dataForm.postage = data.tfullset.postage
                this.dataForm.createBy = data.tfullset.createBy
                this.dataForm.createDate = data.tfullset.createDate
                this.dataForm.updateBy = data.tfullset.updateBy
                this.dataForm.updateDate = data.tfullset.updateDate
                this.dataForm.remarks = data.tfullset.remarks
                this.dataForm.delFlag = data.tfullset.delFlag
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
              url: this.$http.adornUrl(`/generator/tfullset/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'fullCutId': this.dataForm.fullCutId,
                'meet': this.dataForm.meet,
                'cashRequired': this.dataForm.cashRequired,
                'cash': this.dataForm.cash,
                'postage': this.dataForm.postage,
                'createBy': this.dataForm.createBy,
                'createDate': this.dataForm.createDate,
                'updateBy': this.dataForm.updateBy,
                'updateDate': this.dataForm.updateDate,
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
