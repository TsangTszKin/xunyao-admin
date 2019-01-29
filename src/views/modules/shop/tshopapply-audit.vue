<template>
  <el-dialog
    :title="'商家入驻申请审批'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
    <el-row type="flex" class="row-bg">
      <el-col :span="12">
          <el-form-item label="店铺名称" prop="shopName">
            {{dataForm2.shopName}}
          </el-form-item>
      </el-col>
      <el-col :span="12">
          <el-form-item label="店长姓名" prop="realName">
            {{dataForm2.realName}}
          </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="12">
          <el-form-item label="电话" prop="telephone">
            {{dataForm2.telephone}}
          </el-form-item>
      </el-col>
      <el-col :span="12">
          <el-form-item label="地址" prop="address">
            {{dataForm2.address}}
          </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="店铺logo" prop="shopLogo">
      <img :src="dataForm2.shopLogo" @click="openPic(dataForm2.shopLogo)"> 
    </el-form-item>
    <el-form-item label="身份证正面" prop="cardId1">
      <img :src="dataForm2.cardId1" @click="openPic(dataForm2.cardId1)"> 
    </el-form-item>
    <el-form-item label="身份证反面" prop="cardId2">
      <img :src="dataForm2.cardId2" @click="openPic(dataForm2.cardId2)"> 
    </el-form-item>
    <el-form-item label="药品经营许可证" prop="drugBusinessCert">
      <img :src="dataForm2.drugBusinessCert" @click="openPic(dataForm2.drugBusinessCert)"> 
    </el-form-item>
    <el-form-item label="食品经营许可证" prop="foodBusinessCert">
      <img :src="dataForm2.foodBusinessCert" @click="openPic(dataForm2.foodBusinessCert)"> 
    </el-form-item>
    <el-form-item label="营业执照" prop="businessLicense">
      <img :src="dataForm2.businessLicense" @click="openPic(dataForm2.businessLicense)"> 
    </el-form-item>
    <el-form-item label="药品经营质量管理规范" prop="drugQualityCert">
      <img :src="dataForm2.drugQualityCert" @click="openPic(dataForm2.drugQualityCert)"> 
    </el-form-item>
    <el-form-item label="执业药师注册证" prop="drugRegisterCert">
      <img :src="dataForm2.drugRegisterCert" @click="openPic(dataForm2.drugRegisterCert)"> 
    </el-form-item>
    <hr />
    <el-form-item label="审批状态" prop="status">
      <el-select class="select" v-model="dataForm.status" placeholder="请选择" >
        <el-option :value="1" label="通过">通过</el-option>
        <el-option :value="2" label="不通过">不通过</el-option>
      </el-select>
    </el-form-item>
    <el-row type="flex" class="row-bg">
      <el-col :span="12">
          <el-form-item v-if="dataForm.status===1" label="后台登录帐号" prop="username">
            <el-input v-model="dataForm.username" placeholder="后台登录帐号"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="12">
          <el-form-item v-if="dataForm.status===1" label="后台登录密码" prop="password">
            <el-input v-model="dataForm.password" type="password" placeholder="后台登录密码"></el-input>
          </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="备注" prop="remarks">
      <el-input v-model="dataForm.remarks" placeholder="备注"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">提交审批</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm2: {},
        dataForm: {},
        dataRule: {
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '后台登录帐号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '后台登录密码不能为空', trigger: 'blur' }
          ],
          remarks: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm2.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          if (this.dataForm2.id) {
            this.$http({
              url: this.$http.adornUrl(`/shop/tshopapply/info/${this.dataForm2.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                //console.log(data.tShopApply);
                this.dataForm2 = data.tShopApply
              }
            })
          }
        })
      },
      openPic(url){
        window.open(url);
      },
      // 表单提交
      dataFormSubmit () {
        this.dataForm.shopApplyId = this.dataForm2.id;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/shop/tshopapply/shopApplyAudit`),
              method: 'post',
              data: this.$http.adornData(this.dataForm)
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
