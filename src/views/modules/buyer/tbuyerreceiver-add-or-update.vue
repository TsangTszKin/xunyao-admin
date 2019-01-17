<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
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
    <el-form-item label="删除标识" prop="delFlag">
      <el-input v-model="dataForm.delFlag" placeholder="删除标识"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remarks">
      <el-input v-model="dataForm.remarks" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="买家id" prop="buyerId">
      <el-input v-model="dataForm.buyerId" placeholder="买家id"></el-input>
    </el-form-item>
    <el-form-item label="收货人" prop="receiverName">
      <el-input v-model="dataForm.receiverName" placeholder="收货人"></el-input>
    </el-form-item>
    <el-form-item label="省份id" prop="provinceId">
      <el-input v-model="dataForm.provinceId" placeholder="省份id"></el-input>
    </el-form-item>
    <el-form-item label="省" prop="province">
      <el-input v-model="dataForm.province" placeholder="省"></el-input>
    </el-form-item>
    <el-form-item label="市id" prop="cityId">
      <el-input v-model="dataForm.cityId" placeholder="市id"></el-input>
    </el-form-item>
    <el-form-item label="市" prop="city">
      <el-input v-model="dataForm.city" placeholder="市"></el-input>
    </el-form-item>
    <el-form-item label="区编码" prop="districtId">
      <el-input v-model="dataForm.districtId" placeholder="区编码"></el-input>
    </el-form-item>
    <el-form-item label="区" prop="district">
      <el-input v-model="dataForm.district" placeholder="区"></el-input>
    </el-form-item>
    <el-form-item label="收货人号码" prop="receiverPhone">
      <el-input v-model="dataForm.receiverPhone" placeholder="收货人号码"></el-input>
    </el-form-item>
    <el-form-item label="收货人地址" prop="receiverAddress">
      <el-input v-model="dataForm.receiverAddress" placeholder="收货人地址"></el-input>
    </el-form-item>
    <el-form-item label="邮政编码" prop="postcode">
      <el-input v-model="dataForm.postcode" placeholder="邮政编码"></el-input>
    </el-form-item>
    <el-form-item label="是否默认" prop="isDefault">
      <el-input v-model="dataForm.isDefault" placeholder="是否默认"></el-input>
    </el-form-item>
    <el-form-item label="家，公司，学校等，可自行添加" prop="isLabel">
      <el-input v-model="dataForm.isLabel" placeholder="家，公司，学校等，可自行添加"></el-input>
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
          createBy: '',
          createDate: '',
          updateBy: '',
          updateDate: '',
          delFlag: '',
          remarks: '',
          buyerId: '',
          receiverName: '',
          provinceId: '',
          province: '',
          cityId: '',
          city: '',
          districtId: '',
          district: '',
          receiverPhone: '',
          receiverAddress: '',
          postcode: '',
          isDefault: '',
          isLabel: ''
        },
        dataRule: {
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
          delFlag: [
            { required: true, message: '删除标识不能为空', trigger: 'blur' }
          ],
          remarks: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          buyerId: [
            { required: true, message: '买家id不能为空', trigger: 'blur' }
          ],
          receiverName: [
            { required: true, message: '收货人不能为空', trigger: 'blur' }
          ],
          provinceId: [
            { required: true, message: '省份id不能为空', trigger: 'blur' }
          ],
          province: [
            { required: true, message: '省不能为空', trigger: 'blur' }
          ],
          cityId: [
            { required: true, message: '市id不能为空', trigger: 'blur' }
          ],
          city: [
            { required: true, message: '市不能为空', trigger: 'blur' }
          ],
          districtId: [
            { required: true, message: '区编码不能为空', trigger: 'blur' }
          ],
          district: [
            { required: true, message: '区不能为空', trigger: 'blur' }
          ],
          receiverPhone: [
            { required: true, message: '收货人号码不能为空', trigger: 'blur' }
          ],
          receiverAddress: [
            { required: true, message: '收货人地址不能为空', trigger: 'blur' }
          ],
          postcode: [
            { required: true, message: '邮政编码不能为空', trigger: 'blur' }
          ],
          isDefault: [
            { required: true, message: '是否默认不能为空', trigger: 'blur' }
          ],
          isLabel: [
            { required: true, message: '家，公司，学校等，可自行添加不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/tbuyerreceiver/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.createBy = data.tbuyerreceiver.createBy
                this.dataForm.createDate = data.tbuyerreceiver.createDate
                this.dataForm.updateBy = data.tbuyerreceiver.updateBy
                this.dataForm.updateDate = data.tbuyerreceiver.updateDate
                this.dataForm.delFlag = data.tbuyerreceiver.delFlag
                this.dataForm.remarks = data.tbuyerreceiver.remarks
                this.dataForm.buyerId = data.tbuyerreceiver.buyerId
                this.dataForm.receiverName = data.tbuyerreceiver.receiverName
                this.dataForm.provinceId = data.tbuyerreceiver.provinceId
                this.dataForm.province = data.tbuyerreceiver.province
                this.dataForm.cityId = data.tbuyerreceiver.cityId
                this.dataForm.city = data.tbuyerreceiver.city
                this.dataForm.districtId = data.tbuyerreceiver.districtId
                this.dataForm.district = data.tbuyerreceiver.district
                this.dataForm.receiverPhone = data.tbuyerreceiver.receiverPhone
                this.dataForm.receiverAddress = data.tbuyerreceiver.receiverAddress
                this.dataForm.postcode = data.tbuyerreceiver.postcode
                this.dataForm.isDefault = data.tbuyerreceiver.isDefault
                this.dataForm.isLabel = data.tbuyerreceiver.isLabel
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
              url: this.$http.adornUrl(`/generator/tbuyerreceiver/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'createBy': this.dataForm.createBy,
                'createDate': this.dataForm.createDate,
                'updateBy': this.dataForm.updateBy,
                'updateDate': this.dataForm.updateDate,
                'delFlag': this.dataForm.delFlag,
                'remarks': this.dataForm.remarks,
                'buyerId': this.dataForm.buyerId,
                'receiverName': this.dataForm.receiverName,
                'provinceId': this.dataForm.provinceId,
                'province': this.dataForm.province,
                'cityId': this.dataForm.cityId,
                'city': this.dataForm.city,
                'districtId': this.dataForm.districtId,
                'district': this.dataForm.district,
                'receiverPhone': this.dataForm.receiverPhone,
                'receiverAddress': this.dataForm.receiverAddress,
                'postcode': this.dataForm.postcode,
                'isDefault': this.dataForm.isDefault,
                'isLabel': this.dataForm.isLabel
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
