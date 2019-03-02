<template>
  <el-dialog
    :title="'商品审批'"
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
        {{dataForm.name}}
      </el-form-item>
      <el-form-item label="商品图片" prop="productImg">
        <img class="avatar" style="width:200px" :src="dataForm.productImg">
      </el-form-item>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="所属商家" prop="shopId">
            {{dataForm.shopName}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属分类" prop="classId">
            {{dataForm.className}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="通用名称" prop="commonName">
            {{dataForm.commonName}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="英文名字" prop="englishName">
            {{dataForm.englishName}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="规格" prop="specification">
            {{dataForm.specification}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生产厂商" prop="manufacturer">
            {{dataForm.manufacturer}}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="条形码" prop="barCode">
            {{dataForm.barCode}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="批准文号" prop="approvalNumber">
            {{dataForm.approvalNumber}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="原价格" prop="oldPrice">
            {{dataForm.oldPrice}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="优惠价" prop="discountPrice">
            {{dataForm.discountPrice}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="是否处方药" prop="prescription">
            <el-tag v-if="dataForm.prescription === 1" size="small" type="danger">是</el-tag>
            <el-tag v-else size="small">否</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="库存" prop="stock">
            {{dataForm.stock}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="是否置顶" prop="top">
            <el-tag v-if="dataForm.top === 1" size="small" type="danger">是</el-tag>
            <el-tag v-else size="small">否</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否下架" prop="lowerShelf">
            <el-tag v-if="dataForm.lowerShelf === 1" size="small" type="danger">是</el-tag>
            <el-tag v-else size="small">否</el-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="药品说明" prop="productExplain">
        {{dataForm.productExplain}}
      </el-form-item>
      <el-form-item label="温馨提示" prop="reminder">
        {{dataForm.reminder}}
      </el-form-item>
      <!-- <el-form-item label="备注" prop="remarks">
        {{dataForm.remarks}}
      </el-form-item> -->
      <hr />
    <el-form-item label="审批状态" prop="state">
      <el-select class="select" v-model="dataForm.state" placeholder="请选择" >
        <el-option :value="1" label="通过">通过</el-option>
        <el-option :value="2" label="不通过">不通过</el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注" prop="content">
      <el-input type="textarea" v-model="dataForm.content" placeholder="备注"></el-input>
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
  components: {
  },
  data() {
    return {
      visible: false,
      dataForm: {
        state:1
      },
      dataRule: {
        state: [
          { required: true, message: "请选择审批状态", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请填写备注", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/admin/product/info/${this.dataForm.id}`),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm = data.tProduct;
              this.dataForm.productId = this.dataForm.id;
              this.dataForm.state = null;
            }
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/admin/product/productAudit`),
            method: "post",
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
    }
  }
};
</script>
