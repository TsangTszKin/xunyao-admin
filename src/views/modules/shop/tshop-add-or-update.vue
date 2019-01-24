<template>
  <div>
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
        <el-form-item label="商铺logo" prop="delFlag">
          <ImgSelect @changeImgSelect="changeImgSelect" :value="dataForm.shopLogo"/>
          <img v-if="dataForm.shopLogo" :src="dataForm.shopLogo" style="width: 48px;height: 48px;">
        </el-form-item>
        <el-form-item label="删除标识" prop="delFlag">
          <el-input v-model="dataForm.delFlag" placeholder="删除标识"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="dataForm.remarks" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item label="店长id" prop="ownerId">
          <el-input v-model="dataForm.ownerId" placeholder="店长id"></el-input>
        </el-form-item>
        <el-form-item label="店铺名称" prop="shopName">
          <el-input v-model="dataForm.shopName" placeholder="店铺名称"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="dataForm.address" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="dataForm.longitude" placeholder="经度"></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="dataForm.latitude" placeholder="纬度"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="dataForm.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="座机号" prop="telephone">
          <el-input v-model="dataForm.telephone" placeholder="座机号"></el-input>
        </el-form-item>
        <el-form-item label="营业时间" prop="businessTime">
          <el-input v-model="dataForm.businessTime" placeholder="营业时间"></el-input>
        </el-form-item>
        <el-form-item label="1：支持开发票、2：支持医保支付 3、支持送货上门 0：无" prop="shopService">
          <el-input v-model="dataForm.shopService" placeholder="1：支持开发票、2：支持医保支付 3、支持送货上门 0：无"></el-input>
        </el-form-item>
        <el-form-item label="药品经营许可" prop="drugLicensing">
          <el-input v-model="dataForm.drugLicensing" placeholder="药品经营许可"></el-input>
        </el-form-item>
        <el-form-item label="营业执照" prop="businessLicense">
          <el-input v-model="dataForm.businessLicense" placeholder="营业执照"></el-input>
        </el-form-item>
        <el-form-item label="药品经营质量管理规范" prop="drugQuality">
          <el-input v-model="dataForm.drugQuality" placeholder="药品经营质量管理规范"></el-input>
        </el-form-item>
        <el-form-item label="其它从业资质" prop="otherQualifications">
          <el-input v-model="dataForm.otherQualifications" placeholder="其它从业资质"></el-input>
        </el-form-item>
        <el-form-item label="0:否；1是" prop="isClosed">
          <el-input v-model="dataForm.isClosed" placeholder="0:否；1是"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Upload from '@/views/modules/oss/oss-upload';
import ImgSelect from '@/components/ImgSelect';

export default {
  components: {
    Upload,
    ImgSelect
  },
  mounted() {
    // console.log("SITE_CONFIG", SITE_CONFIG)
    this.getDataList();
  },
  data() {
    return {
      visible: false,
      // dialogVisible: this.$store.state.shop.showImgSelect,
      actionUrl: SITE_CONFIG.baseUrl + '/admin/other/uploadFile',
      dataForm: {
        shopLogo: '',
        shopId: 0,
        delFlag: '',
        remarks: '',
        ownerId: '',
        shopName: '',
        address: '',
        longitude: '',
        latitude: '',
        phone: '',
        telephone: '',
        businessTime: '',
        shopService: '',
        drugLicensing: '',
        businessLicense: '',
        drugQuality: '',
        otherQualifications: '',
        isClosed: '',
        shopLogo: ''
      },
      dataRule: {
        delFlag: [
          { required: true, message: '删除标识不能为空', trigger: 'blur' }
        ],
        remarks: [
          { required: true, message: '备注不能为空', trigger: 'blur' }
        ],
        ownerId: [
          { required: true, message: '店长id不能为空', trigger: 'blur' }
        ],
        shopName: [
          { required: true, message: '店铺名称不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '经度不能为空', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '纬度不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '座机号不能为空', trigger: 'blur' }
        ],
        businessTime: [
          { required: true, message: '营业时间不能为空', trigger: 'blur' }
        ],
        shopService: [
          { required: true, message: '1：支持开发票、2：支持医保支付 3、支持送货上门 0：无不能为空', trigger: 'blur' }
        ],
        drugLicensing: [
          { required: true, message: '药品经营许可不能为空', trigger: 'blur' }
        ],
        businessLicense: [
          { required: true, message: '营业执照不能为空', trigger: 'blur' }
        ],
        drugQuality: [
          { required: true, message: '药品经营质量管理规范不能为空', trigger: 'blur' }
        ],
        otherQualifications: [
          { required: true, message: '其它从业资质不能为空', trigger: 'blur' }
        ],
        isClosed: [
          { required: true, message: '0:否；1是不能为空', trigger: 'blur' }
        ]
      },
      dataList: [],
    }
  },
  methods: {
    init(id) {
      this.dataForm.shopId = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.shopId) {
          this.$http({
            url: this.$http.adornUrl(`/shop/tshop/info/${this.dataForm.shopId}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.delFlag = data.tShop.delFlag
              this.dataForm.remarks = data.tShop.remarks
              this.dataForm.ownerId = data.tShop.ownerId
              this.dataForm.shopName = data.tShop.shopName
              this.dataForm.shopLogo = data.tShop.shopLogo
              this.dataForm.address = data.tShop.address
              this.dataForm.longitude = data.tShop.longitude
              this.dataForm.latitude = data.tShop.latitude
              this.dataForm.phone = data.tShop.phone
              this.dataForm.telephone = data.tShop.telephone
              this.dataForm.businessTime = data.tShop.businessTime
              this.dataForm.shopService = data.tShop.shopService
              this.dataForm.drugLicensing = data.tShop.drugLicensing
              this.dataForm.businessLicense = data.tShop.businessLicense
              this.dataForm.drugQuality = data.tShop.drugQuality
              this.dataForm.otherQualifications = data.tShop.otherQualifications
              this.dataForm.isClosed = data.tShop.isClosed
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
            url: this.$http.adornUrl(`/shop/tshop/${!this.dataForm.shopId ? 'save' : 'update'}`),
            method: 'put',
            data: this.$http.adornData({
              'shopId': this.dataForm.shopId || undefined,
              'delFlag': this.dataForm.delFlag,
              'remarks': this.dataForm.remarks,
              'ownerId': this.dataForm.ownerId,
              'shopName': this.dataForm.shopName,
              'shopLogo': this.dataForm.shopLogo,
              'address': this.dataForm.address,
              'longitude': this.dataForm.longitude,
              'latitude': this.dataForm.latitude,
              'phone': this.dataForm.phone,
              'telephone': this.dataForm.telephone,
              'businessTime': this.dataForm.businessTime,
              'shopService': this.dataForm.shopService,
              'drugLicensing': this.dataForm.drugLicensing,
              'businessLicense': this.dataForm.businessLicense,
              'drugQuality': this.dataForm.drugQuality,
              'otherQualifications': this.dataForm.otherQualifications,
              'isClosed': this.dataForm.isClosed
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
    },
    handleAvatarSuccess(res, file) {
      this.dataForm.shopLogo = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return (isJPG || isPNG) && isLt2M;
    },
    changeImgSelect(url) {
      this.dataForm.shopLogo = url;
    },
    // 获取数据列表
    getDataList() {
      this.$http({
        url: this.$http.adornUrl('/sys/oss/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': 1,
          'limit': 100
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list
        } else {
          this.dataList = []
        }
      })
    },
  }
}
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

