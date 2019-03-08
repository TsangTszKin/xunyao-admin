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
        <ProductBasePicker v-if="!dataForm.id"
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
        /> -->
      </el-form-item>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="所属商家" prop="shopId">
            <ShopPicker @changeSelectCallBack="shopChangeSelectCallBack" :value="dataForm.shopId"/>
          </el-form-item>
        </el-col>
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
          <el-form-item label="英文名字" prop="englishName">
            <el-input v-model="dataForm.englishName" placeholder="英文名字"></el-input>
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
        <el-col :span="12">
          <el-form-item label="原价格" prop="oldPrice">
            <el-input v-model="dataForm.oldPrice" placeholder="原价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="优惠价" prop="discountPrice">
            <el-input v-model="dataForm.discountPrice" placeholder="优惠价"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="是否处方药" prop="prescription">
            <el-select class="select" v-model="dataForm.prescription" placeholder="请选择" >
              <el-option :value="0" label="否">否</el-option>
              <el-option :value="1" label="是">是</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否有库存" prop="stock">
            <el-select class="select" v-model="dataForm.stock" placeholder="请选择" >
              <el-option :value="0" label="否">无</el-option>
              <el-option :value="1" label="是">有</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="是否置顶" prop="top">
            <el-select class="select" v-model="dataForm.top" placeholder="请选择" >
              <el-option :value="0" label="否">否</el-option>
              <el-option :value="1" label="是">是</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否下架" prop="lowerShelf">
            <el-select class="select" v-model="dataForm.lowerShelf" placeholder="请选择" >
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
      <el-form-item label="商品详情" prop="remarks">
        <!-- <el-input type="textarea" v-model="dataForm.remarks" placeholder="备注"></el-input> -->
        <el-upload :action="url" :before-upload="beforeUploadHandle" :on-success="successHandle2">
          <el-button type="primary">添加图片</el-button>
        </el-upload>
        <el-alert title="请上传不大于500px*500px的图片" type="info" close-text="知道了" style="margin-top: 10px;"></el-alert>
        <div v-for="img in dataForm.detailImgs" :key="img">
          <img style="width: 100%;" class="avatar" :src="img">
        </div>
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
import Upload from '../oss/oss-upload'

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
      uploadVisible:false,
      url:this.$http.adornUrl(`/admin/other/uploadFile?token=${this.$cookie.get('token')}`),
      dataForm: {
        shopId:'',
        classId:null,
        state:-1,
        oldPrice:0.0,
        top:0,
        prescription:0,
        stock:0,
        lowerShelf:0,
        productImg:'',
        detailImgs:[]
      },
      dataRule: {
        shopId: [
          { required: true, message: "请选择所属商家", trigger: "blur" }
        ],
        classId: [
          { required: true, message: "请选择所属分类", trigger: "blur" }
        ],
        name: [{ required: true, message: "商品名称不能为空", trigger: "blur" }],
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
        oldPrice: [
          { required: true, message: "原价格不能为空", trigger: "blur" }
        ],
        prescription: [
          { required: true, message: "请选择是否处方药", trigger: "blur" }
        ],
        stock: [{ required: true, message: "库存不能为空", trigger: "blur" }],
        top: [{ required: true, message: "请选择是否置顶", trigger: "blur" }],
        lowerShelf: [
          { required: true, message: "请选择是否下架", trigger: "blur" }
        ]
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
            url: this.$http.adornUrl(`/admin/product/info/${this.dataForm.id}`),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm = data.tProduct;
              if(this.dataForm.detailImgs==null){
                this.dataForm.detailImgs = [];
              }
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
            url: this.$http.adornUrl(`/admin/product/insertOrUpdate`),
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
    productChangeSelectCallBack(obj) {
      this.dataForm.classId = obj.id;
      this.dataForm.className = obj.className;
    },
    productBaseChangeSelectCallBack(obj) {
      for(var key in obj){
        this.dataForm[key] = obj[key];
      }
      this.dataForm.baseid = obj.id;
      this.dataForm.id = null;
      this.dataForm.productExplain = obj.basesbasis
    },
    shopChangeSelectCallBack(obj) {
      this.dataForm.shopId = obj.shopId;
      this.dataForm.shopName = obj.shopName;
    },
    changeImgSelect(url) {
      //this.dataForm.productImg = url;
    },
    beforeUploadHandle (file) {
      if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
        this.$message.error('只支持jpg、png、gif格式的图片！')
        return false
      }
    },
    successHandle (response) {
      this.dataForm.productImg = response.url;
      //alert(this.dataForm.productImg);
    },
    successHandle2 (response) {
      //alert(this.dataForm.detailImgs);
      this.dataForm.detailImgs.push(response.url);
      //alert(this.dataForm.productImg);
    }
  }
};
</script>
<style>
.el-upload-list{display: none}
</style>
