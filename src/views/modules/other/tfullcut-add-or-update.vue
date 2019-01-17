<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="商家id" prop="shopId">
      <el-input v-model="dataForm.shopId" placeholder="商家id"></el-input>
    </el-form-item>
    <el-form-item label="活动名称" prop="fullCutName">
      <el-input v-model="dataForm.fullCutName" placeholder="活动名称"></el-input>
    </el-form-item>
    <el-form-item label="活动开始时间" prop="startTime">
      <el-input v-model="dataForm.startTime" placeholder="活动开始时间"></el-input>
    </el-form-item>
    <el-form-item label="活动结束时间" prop="endTime">
      <el-input v-model="dataForm.endTime" placeholder="活动结束时间"></el-input>
    </el-form-item>
    <el-form-item label="(参与活动商品id，为空则所有商品)" prop="productIds">
      <el-input v-model="dataForm.productIds" placeholder="(参与活动商品id，为空则所有商品)"></el-input>
    </el-form-item>
    <el-form-item label="(1：进行中，0：未进行)" prop="status">
      <el-input v-model="dataForm.status" placeholder="(1：进行中，0：未进行)"></el-input>
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
          shopId: '',
          fullCutName: '',
          startTime: '',
          endTime: '',
          productIds: '',
          status: '',
          createBy: '',
          createDate: '',
          updateBy: '',
          updateDate: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          shopId: [
            { required: true, message: '商家id不能为空', trigger: 'blur' }
          ],
          fullCutName: [
            { required: true, message: '活动名称不能为空', trigger: 'blur' }
          ],
          startTime: [
            { required: true, message: '活动开始时间不能为空', trigger: 'blur' }
          ],
          endTime: [
            { required: true, message: '活动结束时间不能为空', trigger: 'blur' }
          ],
          productIds: [
            { required: true, message: '(参与活动商品id，为空则所有商品)不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '(1：进行中，0：未进行)不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/tfullcut/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.shopId = data.tfullcut.shopId
                this.dataForm.fullCutName = data.tfullcut.fullCutName
                this.dataForm.startTime = data.tfullcut.startTime
                this.dataForm.endTime = data.tfullcut.endTime
                this.dataForm.productIds = data.tfullcut.productIds
                this.dataForm.status = data.tfullcut.status
                this.dataForm.createBy = data.tfullcut.createBy
                this.dataForm.createDate = data.tfullcut.createDate
                this.dataForm.updateBy = data.tfullcut.updateBy
                this.dataForm.updateDate = data.tfullcut.updateDate
                this.dataForm.remarks = data.tfullcut.remarks
                this.dataForm.delFlag = data.tfullcut.delFlag
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
              url: this.$http.adornUrl(`/generator/tfullcut/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'shopId': this.dataForm.shopId,
                'fullCutName': this.dataForm.fullCutName,
                'startTime': this.dataForm.startTime,
                'endTime': this.dataForm.endTime,
                'productIds': this.dataForm.productIds,
                'status': this.dataForm.status,
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
