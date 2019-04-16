<template>
  <div>
    <el-dialog
      :title="!dataForm.shopId ? '新增店铺' : '修改店铺'"
      :close-on-click-modal="false"
      :visible.sync="visible"
    >
      <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        @keyup.enter.native="dataFormSubmit()"
        label-width="120px"
      >
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="商铺logo" prop="shopLogo">
              <img
                v-if="dataForm.shopLogo"
                :src="dataForm.shopLogo"
                style="width: 48px;height: 48px;"
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="店长姓名" prop="userName">
              <el-input v-model="dataForm.userName" placeholder="店长姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="店铺名称" prop="shopName">
              <el-input v-model="dataForm.shopName" placeholder="店铺名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联店主" prop="ownerId">
              <SysUserSelect
                @changeSelect="changeSelect"
                :value="dataForm.ownerId"
                :isMulti="false"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="24">
            <el-form-item label="关联店员" prop="ownerId">
              <SysUserSelect
                @changeSelect2="changeSelect2"
                :value="dataForm.salesIds | salesIds"
                :isMulti="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="dataForm.phone" placeholder="手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="座机号" prop="telephone">
              <el-input v-model="dataForm.telephone" placeholder="座机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="24">
            <el-form-item label="地址" prop="address">
              <el-input :disabled="true" v-model="dataForm.address" placeholder="地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="经度" prop="latitude">
              <el-input v-model="dataForm.latitude" placeholder="经度"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纬度" prop="longitude">
              <el-input v-model="dataForm.longitude" placeholder="纬度"></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row type="flex" class="row-bg">
          <el-col :span="24">
            <el-form-item label="营业时间" prop="businessTime">
              <!-- <el-input v-model="dataForm.businessTime" placeholder="营业时间"></el-input> -->
              <el-time-picker
                is-range
                arrow-control
                v-model="time"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="库存更新间隔" prop="stockUpdateDate">
              <el-input v-model="dataForm.stockUpdateDate" placeholder="库存更新间隔"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务" prop="shopService">
              <el-select class="select" multiple v-model="shopService" placeholder="请选择">
                <el-option :value="'0'" label="无">无</el-option>
                <el-option :value="'1'" label="支持开发票">支持开发票</el-option>
                <el-option :value="'2'" label="支持医保支付">支持医保支付</el-option>
                <el-option :value="'3'" label="支持送货上门">支持送货上门</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="医保服务所在地" prop="serviceArea">
              <!-- <el-cascader :options="cityOption" @change="shebaoAreaChange"></el-cascader> -->
              <el-select class="select" multiple v-model="serviceArea" placeholder="请选择">
                <el-option
                  v-for="(item, i) in areaPickerData"
                  :value="item"
                  :key="i"
                  :label="item"
                >{{item}}</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="药品经营许可" prop="drugLicensing">
              <img
                style="width: 100%;"
                :src="dataForm.drugLicensing"
                @click="openPic(dataForm.drugLicensing)"
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业执照" prop="businessLicense">
              <img
                style="width: 100%;"
                :src="dataForm.businessLicense"
                @click="openPic(dataForm.businessLicense)"
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="药品经营质量管理规范" prop="drugQuality">
              <img
                style="width: 100%;"
                :src="dataForm.drugQuality"
                @click="openPic(dataForm.drugQuality)"
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其它从业资质" prop="otherQualifications">
              <img
                style="width: 100%;"
                :src="dataForm.otherQualifications"
                @click="openPic(dataForm.otherQualifications)"
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="是否关闭" prop="isClosed">
          <el-select class="select" v-model="dataForm.isClosed" placeholder="请选择">
            <el-option :value="0" label="否">否</el-option>
            <el-option :value="1" label="是">是</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否Vip" prop="isVip">
          <el-select class="select" v-model="dataForm.isVip" placeholder="请选择">
            <el-option :value="0" label="否">否</el-option>
            <el-option :value="1" label="是">是</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="dataForm.remarks" placeholder="备注"></el-input>
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
import Upload from "@/views/modules/oss/oss-upload";
import SysUserSelect from "@/components/SysUserSelect";
import moment from "moment";
import common from "@/utils/common";
import myaddress from "@/assets/city.json";

export default {
  components: {
    Upload,
    SysUserSelect
  },
  mounted() {
    // console.log("SITE_CONFIG", SITE_CONFIG)
    this.getDataList();
    // this.initCityPickerData();
  },
  filters: {
    salesIds: function(value) {
      let tempArray = common.stringToArray(value);
      let tempArray2 = [];
      tempArray.forEach(element => {
        tempArray2.push(Number(element));
      });
      console.log("tempArray2", tempArray2);
      return tempArray2;
    }
  },
  data() {
    return {
      visible: false,
      // dialogVisible: this.$store.state.shop.showImgSelect,
      actionUrl: SITE_CONFIG.baseUrl + "/admin/other/uploadFile",
      dataForm: {},
      time: [],
      dataRule: {
        delFlag: [
          { required: true, message: "删除标识不能为空", trigger: "blur" }
        ],
        remarks: [{ required: true, message: "备注不能为空", trigger: "blur" }],
        ownerId: [
          { required: true, message: "店长id不能为空", trigger: "blur" }
        ],
        shopName: [
          { required: true, message: "店铺名称不能为空", trigger: "blur" }
        ],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        longitude: [
          { required: true, message: "经度不能为空", trigger: "blur" }
        ],
        latitude: [
          { required: true, message: "纬度不能为空", trigger: "blur" }
        ],
        phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
        telephone: [
          { required: true, message: "座机号不能为空", trigger: "blur" }
        ],
        businessTime: [
          { required: true, message: "营业时间不能为空", trigger: "blur" }
        ],
        shopService: [
          {
            required: true,
            message:
              "1：支持开发票、2：支持医保支付 3、支持送货上门 0：无不能为空",
            trigger: "blur"
          }
        ],
        stockUpdateDate: [
          { required: true, message: "库存更新间隔不能为空", trigger: "blur" }
        ],

        /* businessLicense: [
          { required: true, message: '营业执照不能为空', trigger: 'blur' }
        ],
        drugQuality: [
          { required: true, message: '药品经营质量管理规范不能为空', trigger: 'blur' }
        ],
        otherQualifications: [
          { required: true, message: '其它从业资质不能为空', trigger: 'blur' }
        ],*/
        isClosed: [{ required: true, message: "是否关闭", trigger: "blur" }],
        isVip: [{ required: true, message: "是否Vip", trigger: "blur" }]
      },
      dataList: [],
      shopService: [],
      cityOption: [],
      areaPickerData: [],
      serviceArea: []
    };
  },
  methods: {
    init(id) {
      this.dataForm.shopId = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.shopId) {
          this.$http({
            url: this.$http.adornUrl(
              `/shop/tshop/info/${this.dataForm.shopId}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm = data.tShop;
              this.initAreaPickerData();
              this.shopService = common.stringToArray(
                this.dataForm.shopService
              );
              this.serviceArea = common.stringToArray(
                this.dataForm.serviceArea
              );
              this.time = [
                this.dataForm.businessTime
                  ? new Date(
                      2016,
                      9,
                      10,
                      this.dataForm.businessTime.split(":")[0],
                      this.dataForm.businessTime.split(":")[1]
                    )
                  : new Date(2016, 9, 10, 0, 0, 0),
                this.dataForm.businessTime2
                  ? new Date(
                      2016,
                      9,
                      10,
                      this.dataForm.businessTime2.split(":")[0],
                      this.dataForm.businessTime2.split(":")[1]
                    )
                  : new Date(2016, 9, 10, 0, 0, 0)
              ];
              console.log(
                "moment(this.dataForm.businessTime)",
                this.dataForm.businessTime2
              );
            }
          });
        }
      });
    },
    openPic(url) {
      window.open(url);
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/shop/tshop/${!this.dataForm.shopId ? "save" : "update"}`
            ),
            method: "put",
            data: this.$http.adornData(this.dataForm)
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.dataForm.shopLogo = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      // const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      // if (!isLt1M) {
      //   this.$message.error("上传头像图片大小不能超过 1MB!");
      // }
      return isJPG || isPNG;
    },
    changeSelect(ownerId) {
      this.dataForm.ownerId = ownerId;
    },
    changeSelect2(salesIds) {
      console.log("salesIds", salesIds);
      this.dataForm.salesIds = common.arrayToString(salesIds);
    },
    // 获取数据列表
    getDataList() {
      this.$http({
        url: this.$http.adornUrl("/sys/oss/list"),
        method: "get",
        params: this.$http.adornParams({
          page: 1,
          limit: 100
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
        } else {
          this.dataList = [];
        }
      });
    },
    shebaoAreaChange(vlaue) {
      console.log(vlaue);
    },
    initCityPickerData() {
      let data = common.deepClone(myaddress);
      let allData = [];
      for (const key in data) {
        //遍历省份
        if (data.hasOwnProperty(key)) {
          const province = data[key];
          let provinceObj = {
            value: key,
            label: key,
            children: []
          };

          for (const key2 in province) {
            //遍历市
            if (province.hasOwnProperty(key2)) {
              const city = province[key2];
              let cityObj = {
                value: key2,
                label: key2,
                children: []
              };

              city.forEach(element => {
                //遍历地区
                let districtObj = {
                  value: element,
                  label: element
                };
                cityObj.children.push(districtObj);
              });
              provinceObj.children.push(cityObj);
            }
          }

          allData.push(provinceObj);
        }
      }

      this.cityOption = allData;
    },
    initAreaPickerData() {
      let data = common.deepClone(myaddress);
      let allData = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          if (key == this.dataForm.province) {
            for (const key2 in element) {
              if (element.hasOwnProperty(key2)) {
                const element2 = element[key2];
                if (key2 === this.dataForm.city) {
                  allData = element2;
                }
              }
            }
          }
        }
      }
      this.areaPickerData = allData;
    }
  },
  watch: {
    time: {
      handler(newName, oldName) {
        // console.log(newName);
        // console.log(moment(newName[0]).format('hh:mm:ss'))
        this.dataForm.businessTime = moment(newName[0]).format("hh:mm");
        this.dataForm.businessTime2 = moment(newName[1]).format("hh:mm");
      },
      // immediate: true,
      deep: true
    },
    shopService: {
      handler(value) {
        this.dataForm.shopService = common.arrayToString(this.shopService);
      },
      deep: true
    },
    serviceArea: {
      handler(value) {
        this.dataForm.serviceArea = common.arrayToString(this.serviceArea);
      },
      deep: true
    }
  }
};
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

