<template>
  <div class="mod-config">
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="120px"
      v-if="type === 'admin'"
    >
      <!-- <el-form-item label="店铺ID" prop="shopId">
      <el-input v-model="dataForm.shopId" placeholder="店铺ID"></el-input>
      </el-form-item>-->
      <el-form-item label="最低保证金" prop="min">
        <el-input v-model="dataForm.min" placeholder="最低保证金">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="保证金百分比" prop="per">
        <el-input v-model="dataForm.per" placeholder="保证金百分比">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <!-- 
      <el-form-item label="邮费" prop="postage">
        <el-input v-model="dataForm.postage" placeholder="邮费">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>-->
      <!-- <el-form-item label="配送时间" prop="deliveryTime">
        <el-input v-model="dataForm.deliveryTime" placeholder="配送时间"></el-input>
      </el-form-item>-->
      <el-form-item label prop="postMinDistance" style="float: left;">
        <el-input v-model="dataForm.postMinDistance" placeholder="多少" style="width: 150px;">
          <template slot="append">公里内</template>
        </el-input>
      </el-form-item>
      <el-form-item label="收取邮费" prop="postage" style="float: left;margin-left: -34px;">
        <el-input v-model="dataForm.postage" placeholder="多少" style="width: 120px;">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="超出每公里收费"
        prop="postageAdd"
        style="width: 250px;float: left;margin-left: 10px;"
      >
        <el-input v-model="dataForm.postageAdd" placeholder="多少">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <div style="clear:both;"></div>

      <el-form-item label="违约扣除比例" prop="breakOfCut">
        <el-input v-model="dataForm.breakOfCut" placeholder="违约扣除比例">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="平台抽成比例" prop="platformCut">
        <el-input v-model="dataForm.platformCut" placeholder="平台抽成比例">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="特价商品分界线" prop="lineDiscount">
        <el-input v-model="dataForm.lineDiscount" placeholder="打折">
          <template slot="append">折</template>
        </el-input>
      </el-form-item>
      <!--
         <el-form-item label="状态   0：无效   1：有效" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态   0：无效   1：有效"></el-input>
      </el-form-item>-->
      <!-- <el-form-item label="类型 1保证金设置" prop="type">
      <el-input v-model="dataForm.type" placeholder="类型 1保证金设置"></el-input>
      </el-form-item>-->
      <!-- <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>-->
    </el-form>

    <el-form
      :model="dataForm"
      :rules="dataRule2"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="120px"
      v-if="type === 'shop'"
    >
      <el-form-item label="配送时间" prop="deliveryTime">
        <el-input v-model="dataForm.deliveryTime" placeholder="配送时间"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </div>
</template>

<script>
import common from "@/utils/common";

export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        min: "", //最低保证金（admin）
        per: "", //保证金百分比（admin）
        postage: "", //邮费默认5（admin）
        status: "",
        type: "",
        remark: "",
        deliveryTime: "", //配送时间（shop）
        postMinDistance: "", //多少距离内5块邮费，默认3（admin）
        postageAdd: "", //每公里加多少，默认0.5（admin）
        platformCut: "", //平台抽成比例（admin）
        breakOfCut: "", //违约扣除比例（admin）
        lineDiscount: "" //特价商品分界线（打折）（admin）
      },
      type: "",
      dataRule: {
        // shopId: [
        //   { required: true, message: "店铺ID不能为空", trigger: "blur" }
        // ],
        min: [{ required: true, message: "最低不能为空", trigger: "blur" }],
        per: [
          { required: true, message: "保证金百分比不能为空", trigger: "blur" }
        ],
        postage: [{ required: true, message: "邮费不能为空", trigger: "blur" }],
        // status: [
        //   {
        //     required: true,
        //     message: "状态   0：无效   1：有效不能为空",
        //     trigger: "blur"
        //   }
        // ],
        // type: [
        //   {
        //     required: true,
        //     message: "类型 1保证金设置不能为空",
        //     trigger: "blur"
        //   }
        // ],
        // deliveryTime: [
        //   { required: true, message: "配送时间不能为空", trigger: "blur" }
        // ]
        postMinDistance: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        postageAdd: [{ required: true, message: "不能为空", trigger: "blur" }],
        platformCut: [{ required: true, message: "不能为空", trigger: "blur" }],
        breakOfCut: [{ required: true, message: "不能为空", trigger: "blur" }],
        lineDiscount: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      dataRule2: {
        deliveryTime: [
          { required: true, message: "配送时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created: function() {
    this.init();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        // this.$refs["dataForm"].resetFields();
        this.$http({
          url: this.$http.adornUrl(`/other/tconfig/getConfig`),
          method: "get",
          params: this.$http.adornParams()
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataForm = data.tConfig;
            if (common.isEmpty(this.dataForm.postage))
              this.dataForm.postage = 5;
            if (common.isEmpty(this.dataForm.postageAdd))
              this.dataForm.postageAdd = 0.5;
            if (common.isEmpty(this.dataForm.postMinDistance))
              this.dataForm.postMinDistance = 3;
            if (common.isEmpty(this.dataForm.platformCut))
              this.dataForm.platformCut = 30;
            this.type = data.type;
          }
        });
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/other/tconfig/saveOrUpdate`),
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
    }
  }
};
</script>
