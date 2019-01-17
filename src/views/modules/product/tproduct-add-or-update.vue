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
    <el-form-item label="" prop="shopId">
      <el-input v-model="dataForm.shopId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="所属分类" prop="classId">
      <el-input v-model="dataForm.classId" placeholder="所属分类"></el-input>
    </el-form-item>
    <el-form-item label="" prop="name">
      <el-input v-model="dataForm.name" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="通用名称" prop="commonName">
      <el-input v-model="dataForm.commonName" placeholder="通用名称"></el-input>
    </el-form-item>
    <el-form-item label="英文名字" prop="englishName">
      <el-input v-model="dataForm.englishName" placeholder="英文名字"></el-input>
    </el-form-item>
    <el-form-item label="商品图片（多张，隔开）" prop="productImg">
      <el-input v-model="dataForm.productImg" placeholder="商品图片（多张，隔开）"></el-input>
    </el-form-item>
    <el-form-item label="规格" prop="specification">
      <el-input v-model="dataForm.specification" placeholder="规格"></el-input>
    </el-form-item>
    <el-form-item label="生产厂商" prop="manufacturer">
      <el-input v-model="dataForm.manufacturer" placeholder="生产厂商"></el-input>
    </el-form-item>
    <el-form-item label="条形码" prop="barCode">
      <el-input v-model="dataForm.barCode" placeholder="条形码"></el-input>
    </el-form-item>
    <el-form-item label="批准文号" prop="approvalNumber">
      <el-input v-model="dataForm.approvalNumber" placeholder="批准文号"></el-input>
    </el-form-item>
    <el-form-item label="药品说明(可通过摄像头扫描识别药盒上文字说明)" prop="productExplain">
      <el-input v-model="dataForm.productExplain" placeholder="药品说明(可通过摄像头扫描识别药盒上文字说明)"></el-input>
    </el-form-item>
    <el-form-item label="温馨提示" prop="reminder">
      <el-input v-model="dataForm.reminder" placeholder="温馨提示"></el-input>
    </el-form-item>
    <el-form-item label="原价格" prop="oldPrice">
      <el-input v-model="dataForm.oldPrice" placeholder="原价格"></el-input>
    </el-form-item>
    <el-form-item label="优惠价(备用)" prop="discountPrice">
      <el-input v-model="dataForm.discountPrice" placeholder="优惠价(备用)"></el-input>
    </el-form-item>
    <el-form-item label="是否处方药" prop="prescription">
      <el-input v-model="dataForm.prescription" placeholder="是否处方药"></el-input>
    </el-form-item>
    <el-form-item label="库存(默认0)" prop="stock">
      <el-input v-model="dataForm.stock" placeholder="库存(默认0)"></el-input>
    </el-form-item>
    <el-form-item label="状态(0：待审核  1：审核通过 2：审核不通过)" prop="state">
      <el-input v-model="dataForm.state" placeholder="状态(0：待审核  1：审核通过 2：审核不通过)"></el-input>
    </el-form-item>
    <el-form-item label="是否置顶" prop="top">
      <el-input v-model="dataForm.top" placeholder="是否置顶"></el-input>
    </el-form-item>
    <el-form-item label="是否下架" prop="lowerShelf">
      <el-input v-model="dataForm.lowerShelf" placeholder="是否下架"></el-input>
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
          shopId: '',
          classId: '',
          name: '',
          commonName: '',
          englishName: '',
          productImg: '',
          specification: '',
          manufacturer: '',
          barCode: '',
          approvalNumber: '',
          productExplain: '',
          reminder: '',
          oldPrice: '',
          discountPrice: '',
          prescription: '',
          stock: '',
          state: '',
          top: '',
          lowerShelf: ''
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
          shopId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          classId: [
            { required: true, message: '所属分类不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          commonName: [
            { required: true, message: '通用名称不能为空', trigger: 'blur' }
          ],
          englishName: [
            { required: true, message: '英文名字不能为空', trigger: 'blur' }
          ],
          productImg: [
            { required: true, message: '商品图片（多张，隔开）不能为空', trigger: 'blur' }
          ],
          specification: [
            { required: true, message: '规格不能为空', trigger: 'blur' }
          ],
          manufacturer: [
            { required: true, message: '生产厂商不能为空', trigger: 'blur' }
          ],
          barCode: [
            { required: true, message: '条形码不能为空', trigger: 'blur' }
          ],
          approvalNumber: [
            { required: true, message: '批准文号不能为空', trigger: 'blur' }
          ],
          productExplain: [
            { required: true, message: '药品说明(可通过摄像头扫描识别药盒上文字说明)不能为空', trigger: 'blur' }
          ],
          reminder: [
            { required: true, message: '温馨提示不能为空', trigger: 'blur' }
          ],
          oldPrice: [
            { required: true, message: '原价格不能为空', trigger: 'blur' }
          ],
          discountPrice: [
            { required: true, message: '优惠价(备用)不能为空', trigger: 'blur' }
          ],
          prescription: [
            { required: true, message: '是否处方药不能为空', trigger: 'blur' }
          ],
          stock: [
            { required: true, message: '库存(默认0)不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '状态(0：待审核  1：审核通过 2：审核不通过)不能为空', trigger: 'blur' }
          ],
          top: [
            { required: true, message: '是否置顶不能为空', trigger: 'blur' }
          ],
          lowerShelf: [
            { required: true, message: '是否下架不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/tproduct/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.createBy = data.tproduct.createBy
                this.dataForm.createDate = data.tproduct.createDate
                this.dataForm.updateBy = data.tproduct.updateBy
                this.dataForm.updateDate = data.tproduct.updateDate
                this.dataForm.delFlag = data.tproduct.delFlag
                this.dataForm.remarks = data.tproduct.remarks
                this.dataForm.shopId = data.tproduct.shopId
                this.dataForm.classId = data.tproduct.classId
                this.dataForm.name = data.tproduct.name
                this.dataForm.commonName = data.tproduct.commonName
                this.dataForm.englishName = data.tproduct.englishName
                this.dataForm.productImg = data.tproduct.productImg
                this.dataForm.specification = data.tproduct.specification
                this.dataForm.manufacturer = data.tproduct.manufacturer
                this.dataForm.barCode = data.tproduct.barCode
                this.dataForm.approvalNumber = data.tproduct.approvalNumber
                this.dataForm.productExplain = data.tproduct.productExplain
                this.dataForm.reminder = data.tproduct.reminder
                this.dataForm.oldPrice = data.tproduct.oldPrice
                this.dataForm.discountPrice = data.tproduct.discountPrice
                this.dataForm.prescription = data.tproduct.prescription
                this.dataForm.stock = data.tproduct.stock
                this.dataForm.state = data.tproduct.state
                this.dataForm.top = data.tproduct.top
                this.dataForm.lowerShelf = data.tproduct.lowerShelf
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
              url: this.$http.adornUrl(`/generator/tproduct/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'createBy': this.dataForm.createBy,
                'createDate': this.dataForm.createDate,
                'updateBy': this.dataForm.updateBy,
                'updateDate': this.dataForm.updateDate,
                'delFlag': this.dataForm.delFlag,
                'remarks': this.dataForm.remarks,
                'shopId': this.dataForm.shopId,
                'classId': this.dataForm.classId,
                'name': this.dataForm.name,
                'commonName': this.dataForm.commonName,
                'englishName': this.dataForm.englishName,
                'productImg': this.dataForm.productImg,
                'specification': this.dataForm.specification,
                'manufacturer': this.dataForm.manufacturer,
                'barCode': this.dataForm.barCode,
                'approvalNumber': this.dataForm.approvalNumber,
                'productExplain': this.dataForm.productExplain,
                'reminder': this.dataForm.reminder,
                'oldPrice': this.dataForm.oldPrice,
                'discountPrice': this.dataForm.discountPrice,
                'prescription': this.dataForm.prescription,
                'stock': this.dataForm.stock,
                'state': this.dataForm.state,
                'top': this.dataForm.top,
                'lowerShelf': this.dataForm.lowerShelf
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
