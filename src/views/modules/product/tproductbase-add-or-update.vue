<template>
  <el-dialog
    :title="!dataForm.id ? '新增商品' : '修改商品'"
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
      <el-form-item label="商品名称" prop="name">
        <el-input v-if="dataForm.id" v-model="dataForm.name" placeholder></el-input>
        <ProductBasePicker
          v-if="!dataForm.id"
          @changeSelectCallBack="productBaseChangeSelectCallBack"
          :value="dataForm.baseid"
        />
      </el-form-item>
      <el-form-item label="商品图片" prop="productImg">
        <el-upload :action="url" :before-upload="beforeUploadHandle" :on-success="successHandle">
          <el-button type="primary">上传图片</el-button>
        </el-upload>
        <el-alert title="请上传200px*200px的图片" type="info" close-text="知道了" style="margin-top: 10px;"></el-alert>
        <img class="avatar" style="width:200px" :src="dataForm.productImg">
        <!-- <ImgSelect
          :isMulti="false"
          @changeImgSelect="changeImgSelect"
          :value="dataForm.productImg"
        />-->
      </el-form-item>
      <el-row type="flex" class="row-bg">
        <!-- <el-col :span="12">
          <el-form-item label="所属商家" prop="shopId">
            <ShopPicker @changeSelectCallBack="shopChangeSelectCallBack" :value="dataForm.shopId"/>
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item label="所属分类" prop="classId">
            <ProductClassPicker
              @changeSelectCallBack="productChangeSelectCallBack"
              :value="dataForm.classId"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="通用名称" prop="commonName">
            <el-input v-model="dataForm.commonName" placeholder="通用名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="成分" prop="basesbasis">
            <el-input v-model="dataForm.basesbasis" placeholder="成分"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="性状" prop="characters">
            <el-input v-model="dataForm.characters" placeholder="性状"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="不良反应" prop="untowardeffect">
            <el-input v-model="dataForm.untowardeffect" placeholder="不良反应"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="24">
          <el-form-item label="用法用量" prop="usages">
            <el-input v-model="dataForm.usages" placeholder="用法用量"></el-input>
          </el-form-item>
        </el-col>
        
      </el-row>
      <el-row type="flex" class="row-bg">
       <el-col :span="12">
          <el-form-item label="贮藏" prop="storage">
            <el-input v-model="dataForm.storage" placeholder="贮藏"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="禁忌" prop="taboo">
            <el-input v-model="dataForm.taboo" placeholder="禁忌"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="注意事项" prop="announcements">
            <el-input v-model="dataForm.announcements" placeholder="注意事项"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="药物相互作用" prop="druginteraction">
            <el-input v-model="dataForm.druginteraction" placeholder="药物相互作用"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="规格" prop="specification">
            <el-input v-model="dataForm.specification" placeholder="规格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生产厂商" prop="manufacturer">
            <el-input v-model="dataForm.manufacturer" placeholder="生产厂商"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="条形码" prop="barCode">
            <el-input v-model="dataForm.barCode" placeholder="条形码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="批准文号" prop="approvalNumber">
            <el-input v-model="dataForm.approvalNumber" placeholder="批准文号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <!-- <el-col :span="12">
          <el-form-item label="原价格" prop="oldPrice">
            <el-input v-model="dataForm.oldPrice" placeholder="原价格"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item label="参考价" prop="discountPrice">
            <el-input v-model="dataForm.discountPrice" placeholder="参考价"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="是否处方药" prop="prescription">
            <el-select class="select" v-model="dataForm.prescription" placeholder="请选择">
              <el-option :value="0" label="否">否</el-option>
              <el-option :value="1" label="是">是</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="药品说明" prop="productExplain">
        <el-input v-model="dataForm.productExplain" placeholder="药品说明"></el-input>
      </el-form-item>
      <el-form-item label="温馨提示" prop="reminder">
        <el-input v-model="dataForm.reminder" placeholder="温馨提示"></el-input>
      </el-form-item>
      
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    <!-- 弹窗, 上传文件 -->
    <upload v-if="uploadVisible" ref="upload" @refreshDataList="uploadComplete"></upload>
  </el-dialog>
</template>

<script>
import ProductClassPicker from "@/components/ProductClassPicker";
import ProductBasePicker from "@/components/ProductBasePicker";
import ShopPicker from "@/components/ShopPicker";
import ImgSelect from "@/components/ImgSelect";
import Upload from "../oss/oss-upload";

export default {
  components: {
    ProductClassPicker,
    ProductBasePicker,
    ShopPicker,
    ImgSelect,
    Upload
  },
  data() {
    return {
      visible: false,
      uploadVisible: false,
      url: this.$http.adornUrl(
        `/admin/other/uploadFile?token=${this.$cookie.get("token")}`
      ),
      dataForm: {
        // shopId: "",
        classId: null,
        state: -1,
        // oldPrice: 0.0,
        // top: 0,
        prescription: 0,
        // stock: 0,
        // lowerShelf: 0,
        productImg: "",
        // detailImgs: [],
        basesbasis: "",
        characters: "",
        usages: "",
        untowardeffect: "",
        taboo: "",
        announcements: "",
        druginteraction: "",
        storage: ""
      },
      dataRule: {
        // shopId: [
        //   { required: true, message: "请选择所属商家", trigger: "blur" }
        // ],
        classId: [
          { required: true, message: "请选择所属分类", trigger: "blur" }
        ],
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" }
        ],
        commonName: [
          { required: true, message: "通用名称不能为空", trigger: "blur" }
        ],
        productImg: [
          {
            required: true,
            message: "商品图片不能为空",
            trigger: "blur"
          }
        ],
        specification: [
          { required: true, message: "规格不能为空", trigger: "blur" }
        ],
        manufacturer: [
          { required: true, message: "生产厂商不能为空", trigger: "blur" }
        ],
        barCode: [
          { required: true, message: "条形码不能为空", trigger: "blur" }
        ],
        approvalNumber: [
          { required: true, message: "批准文号不能为空", trigger: "blur" }
        ],
        productExplain: [
          {
            required: true,
            message: "药品说明不能为空",
            trigger: "blur"
          }
        ],
        reminder: [
          { required: true, message: "温馨提示不能为空", trigger: "blur" }
        ],
        // oldPrice: [
        //   { required: true, message: "原价格不能为空", trigger: "blur" }
        // ],
        prescription: [
          { required: true, message: "请选择是否处方药", trigger: "blur" }
        ],
        // stock: [{ required: true, message: "库存不能为空", trigger: "blur" }],
        // top: [{ required: true, message: "请选择是否置顶", trigger: "blur" }],
        // lowerShelf: [
        //   { required: true, message: "请选择是否下架", trigger: "blur" }
        // ],

        basesbasis: [
          { required: true, message: "成分不能为空", trigger: "blur" }
        ],
        characters: [
          { required: true, message: "性状不能为空", trigger: "blur" }
        ],
        usages: [
          { required: true, message: "用法用量不能为空", trigger: "blur" }
        ],
        untowardeffect: [
          { required: true, message: "不良反应不能为空", trigger: "blur" }
        ],
        taboo: [
          { required: true, message: "禁忌不能为空", trigger: "blur" }
        ],
        announcements: [
          { required: true, message: "注意事项不能为空", trigger: "blur" }
        ],
        druginteraction: [
          { required: true, message: "药物相互作用不能为空", trigger: "blur" }
        ],
        storage: [
          { required: true, message: "贮藏不能为空", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        //if (this.dataForm.id) {
        this.$http({
          url: this.$http.adornUrl(`/product/tproductbase/info/${this.dataForm.id}`),
          method: "get",
          params: this.$http.adornParams()
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataForm = data.tProductBase;
          }
        });
        //}
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/product/tproductbase/${!this.dataForm.id ? 'save' : 'update'}`),
            method: "post",
            data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
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
                // 'oldPrice': this.dataForm.oldPrice,
                'discountPrice': this.dataForm.discountPrice,
                'prescription': this.dataForm.prescription,
                'remarks': this.dataForm.remarks,
                'delFlag': this.dataForm.delFlag
              })
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
    productChangeSelectCallBack(obj) {
      this.dataForm.classId = obj.id;
      this.dataForm.productBaseId = obj.id;
      this.dataForm.className = obj.className;
    },
    productBaseChangeSelectCallBack(obj) {
      console.log(obj);
      for (var key in obj) {
        this.dataForm[key] = obj[key];
      }
      this.dataForm.baseid = obj.id;
      this.dataForm.id = null;
      this.dataForm.productBaseId = obj.id;
      this.dataForm.productExplain = obj.basesbasis;
    },
    shopChangeSelectCallBack(obj) {
      // this.dataForm.shopId = obj.shopId;
      this.dataForm.shopName = obj.shopName;
    },
    changeImgSelect(url) {
      //this.dataForm.productImg = url;
    },
    beforeUploadHandle(file) {
      if (
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/gif"
      ) {
        this.$message.error("只支持jpg、png、gif格式的图片！");
        return false;
      }
    },
    successHandle(response) {
      this.dataForm.productImg = response.url;
      //alert(this.dataForm.productImg);
    },
  }
};
</script>
<style>
.el-upload-list {
  display: none;
}
</style>
