<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="店铺名称" prop="shopName">
      <el-input v-model="dataForm.shopName" placeholder="店铺名称"></el-input>
    </el-form-item>
    <el-form-item label="店铺logo" prop="shopLogo">
      <el-input v-model="dataForm.shopLogo" placeholder="店铺logo"></el-input>
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="dataForm.address" placeholder="地址"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="telephone">
      <el-input v-model="dataForm.telephone" placeholder="电话"></el-input>
    </el-form-item>
    <el-form-item label="店长姓名" prop="realName">
      <el-input v-model="dataForm.realName" placeholder="店长姓名"></el-input>
    </el-form-item>
    <el-form-item label="身份证正面" prop="cardId1">
      <el-input v-model="dataForm.cardId1" placeholder="身份证正面"></el-input>
    </el-form-item>
    <el-form-item label="身份证反面" prop="cardId2">
      <el-input v-model="dataForm.cardId2" placeholder="身份证反面"></el-input>
    </el-form-item>
    <el-form-item label="药品经营许可证" prop="drugBusinessCert">
      <el-input v-model="dataForm.drugBusinessCert" placeholder="药品经营许可证"></el-input>
    </el-form-item>
    <el-form-item label="食品经营许可证" prop="foodBusinessCert">
      <el-input v-model="dataForm.foodBusinessCert" placeholder="食品经营许可证"></el-input>
    </el-form-item>
    <el-form-item label="营业执照" prop="businessLicense">
      <el-input v-model="dataForm.businessLicense" placeholder="营业执照"></el-input>
    </el-form-item>
    <el-form-item label="药品经营质量管理规范" prop="drugQualityCert">
      <el-input v-model="dataForm.drugQualityCert" placeholder="药品经营质量管理规范"></el-input>
    </el-form-item>
    <el-form-item label="执业药师注册证" prop="drugRegisterCert">
      <el-input v-model="dataForm.drugRegisterCert" placeholder="执业药师注册证"></el-input>
    </el-form-item>
    <el-form-item label="状态，0未处理 1通过 2不通过" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态，0未处理 1通过 2不通过"></el-input>
    </el-form-item>
    <el-form-item label="审批时间" prop="auditTime">
      <el-input v-model="dataForm.auditTime" placeholder="审批时间"></el-input>
    </el-form-item>
    <el-form-item label="审批人" prop="auditBy">
      <el-input v-model="dataForm.auditBy" placeholder="审批人"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remarks">
      <el-input v-model="dataForm.remarks" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createDate">
      <el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>
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
          shopName: '',
          shopLogo: '',
          address: '',
          telephone: '',
          realName: '',
          cardId1: '',
          cardId2: '',
          drugBusinessCert: '',
          foodBusinessCert: '',
          businessLicense: '',
          drugQualityCert: '',
          drugRegisterCert: '',
          status: '',
          auditTime: '',
          auditBy: '',
          remarks: '',
          createDate: ''
        },
        dataRule: {
          shopName: [
            { required: true, message: '店铺名称不能为空', trigger: 'blur' }
          ],
          shopLogo: [
            { required: true, message: '店铺logo不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '电话不能为空', trigger: 'blur' }
          ],
          realName: [
            { required: true, message: '店长姓名不能为空', trigger: 'blur' }
          ],
          cardId1: [
            { required: true, message: '身份证正面不能为空', trigger: 'blur' }
          ],
          cardId2: [
            { required: true, message: '身份证反面不能为空', trigger: 'blur' }
          ],
          drugBusinessCert: [
            { required: true, message: '药品经营许可证不能为空', trigger: 'blur' }
          ],
          foodBusinessCert: [
            { required: true, message: '食品经营许可证不能为空', trigger: 'blur' }
          ],
          businessLicense: [
            { required: true, message: '营业执照不能为空', trigger: 'blur' }
          ],
          drugQualityCert: [
            { required: true, message: '药品经营质量管理规范不能为空', trigger: 'blur' }
          ],
          drugRegisterCert: [
            { required: true, message: '执业药师注册证不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态，0未处理 1通过 2不通过不能为空', trigger: 'blur' }
          ],
          auditTime: [
            { required: true, message: '审批时间不能为空', trigger: 'blur' }
          ],
          auditBy: [
            { required: true, message: '审批人不能为空', trigger: 'blur' }
          ],
          remarks: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          createDate: [
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
              url: this.$http.adornUrl(`/generator/tshopapply/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.shopName = data.tshopapply.shopName
                this.dataForm.shopLogo = data.tshopapply.shopLogo
                this.dataForm.address = data.tshopapply.address
                this.dataForm.telephone = data.tshopapply.telephone
                this.dataForm.realName = data.tshopapply.realName
                this.dataForm.cardId1 = data.tshopapply.cardId1
                this.dataForm.cardId2 = data.tshopapply.cardId2
                this.dataForm.drugBusinessCert = data.tshopapply.drugBusinessCert
                this.dataForm.foodBusinessCert = data.tshopapply.foodBusinessCert
                this.dataForm.businessLicense = data.tshopapply.businessLicense
                this.dataForm.drugQualityCert = data.tshopapply.drugQualityCert
                this.dataForm.drugRegisterCert = data.tshopapply.drugRegisterCert
                this.dataForm.status = data.tshopapply.status
                this.dataForm.auditTime = data.tshopapply.auditTime
                this.dataForm.auditBy = data.tshopapply.auditBy
                this.dataForm.remarks = data.tshopapply.remarks
                this.dataForm.createDate = data.tshopapply.createDate
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
              url: this.$http.adornUrl(`/generator/tshopapply/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'shopName': this.dataForm.shopName,
                'shopLogo': this.dataForm.shopLogo,
                'address': this.dataForm.address,
                'telephone': this.dataForm.telephone,
                'realName': this.dataForm.realName,
                'cardId1': this.dataForm.cardId1,
                'cardId2': this.dataForm.cardId2,
                'drugBusinessCert': this.dataForm.drugBusinessCert,
                'foodBusinessCert': this.dataForm.foodBusinessCert,
                'businessLicense': this.dataForm.businessLicense,
                'drugQualityCert': this.dataForm.drugQualityCert,
                'drugRegisterCert': this.dataForm.drugRegisterCert,
                'status': this.dataForm.status,
                'auditTime': this.dataForm.auditTime,
                'auditBy': this.dataForm.auditBy,
                'remarks': this.dataForm.remarks,
                'createDate': this.dataForm.createDate
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
