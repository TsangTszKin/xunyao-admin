<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-form-item label="商家id" prop="shopId">
        <el-input v-model="dataForm.shopId" placeholder="商家id"></el-input>
      </el-form-item>
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动开始时间" prop="startTime">
        <!-- <el-input v-model="dataForm.startTime" placeholder="活动开始时间"></el-input> -->
        <el-date-picker v-model="dataForm.startTime" type="datetime" placeholder="活动开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </el-form-item>
      <el-form-item label="活动结束时间" prop="endTime">
        <!-- <el-input v-model="dataForm.endTime" placeholder="活动结束时间"></el-input> -->
        <el-date-picker v-model="dataForm.endTime" type="datetime" placeholder="活动结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </el-form-item>
      <el-form-item label="活动类型 1满多少免邮 2满多少减 3满多少减抵压金" prop="type">
        <el-input v-model="dataForm.type" placeholder="活动类型 1满多少免邮 2满多少减 3满多少减抵压金"></el-input>
      </el-form-item>
      <el-form-item label="(1：进行中，0：未开始)" prop="status">
        <el-input v-model="dataForm.status" placeholder="(1：进行中，0：未开始)"></el-input>
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
      <el-form-item label="修改人" prop="updateBy">
        <el-input v-model="dataForm.updateBy" placeholder="修改人"></el-input>
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
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        shopId: '',
        name: '',
        startTime: '',
        endTime: '',
        type: '',
        status: '',
        meet: '',
        cashRequired: '',
        cash: '',
        postage: '',
        createBy: '',
        updateBy: '',
        remarks: '',
        delFlag: ''
      },
      dataRule: {
        shopId: [
          { required: true, message: '商家id不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '活动名称不能为空', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '活动开始时间不能为空', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '活动结束时间不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '活动类型 1满多少免邮 2满多少减 3满多少减抵压金不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '(1：进行中，0：未开始)不能为空', trigger: 'blur' }
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
        updateBy: [
          { required: true, message: '修改人不能为空', trigger: 'blur' }
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
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/sales/tactivity/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.shopId = data.tactivity.shopId
              this.dataForm.name = data.tactivity.name
              this.dataForm.startTime = data.tactivity.startTime
              this.dataForm.endTime = data.tactivity.endTime
              this.dataForm.type = data.tactivity.type
              this.dataForm.status = data.tactivity.status
              this.dataForm.meet = data.tactivity.meet
              this.dataForm.cashRequired = data.tactivity.cashRequired
              this.dataForm.cash = data.tactivity.cash
              this.dataForm.postage = data.tactivity.postage
              this.dataForm.createBy = data.tactivity.createBy
              this.dataForm.updateBy = data.tactivity.updateBy
              this.dataForm.remarks = data.tactivity.remarks
              this.dataForm.delFlag = data.tactivity.delFlag
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/sales/tactivity/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'put',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'shopId': this.dataForm.shopId,
              'name': this.dataForm.name,
              'startTime': this.dataForm.startTime,
              'endTime': this.dataForm.endTime,
              'type': this.dataForm.type,
              'status': this.dataForm.status,
              'meet': this.dataForm.meet,
              'cashRequired': this.dataForm.cashRequired,
              'cash': this.dataForm.cash,
              'postage': this.dataForm.postage,
              'createBy': this.dataForm.createBy,
              'updateBy': this.dataForm.updateBy,
              'remarks': this.dataForm.remarks,
              'delFlag': this.dataForm.delFlag
            })
          }).then(({ data }) => {
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
