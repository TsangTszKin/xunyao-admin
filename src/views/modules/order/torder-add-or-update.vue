<template>
  <el-dialog :title="'订单修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="店铺" prop="shopName">{{dataForm.shopName}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下单用户" prop="buyerName">{{dataForm.buyerName}}</el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="订单号" prop="orderSn">{{dataForm.orderSn}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单价格" prop="totalPrice">{{dataForm.totalPrice}}</el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="运费" prop="postFee">{{dataForm.postFee}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="优惠" prop="preferential">{{dataForm.preferential}}</el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="订单状态" prop="orderStatus">
            <!-- <el-tag v-if="dataForm.orderStatus === 0" size="small" type="danger">未确认</el-tag>
            <el-tag v-else-if="dataForm.orderStatus === 1" size="small" type="danger">已确认</el-tag>
            <el-tag v-else-if="dataForm.orderStatus === 1" size="small" type="danger">已完成</el-tag>
            <el-tag v-else size="small">已取消</el-tag> -->
            <el-select class="select" v-model="dataForm.orderStatus" placeholder="请选择" >
              <el-option :value="0" label="未确认">未确认</el-option>
              <el-option :value="1" label="已确认">已确认</el-option>
              <el-option :value="2" label="已完成">已完成</el-option>
              <el-option :value="3" label="已取消">已取消</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="物流状态" prop="shopOrderStatus">
            <!-- <el-tag v-if="dataForm.shopOrderStatus === 0" size="small" type="danger">未下单</el-tag>
            <el-tag v-else-if="dataForm.shopOrderStatus === 1" size="small" type="danger">已下单</el-tag>
            <el-tag v-else-if="dataForm.shopOrderStatus === 2" size="small" type="danger">已确认</el-tag>
            <el-tag v-else-if="dataForm.shopOrderStatus === 3" size="small" type="danger">已发货</el-tag>
            <el-tag v-else-if="dataForm.shopOrderStatus === 4" size="small" type="danger">已收货</el-tag>
            <el-tag v-else size="small">已违约</el-tag> -->
            <el-select class="select" v-model="dataForm.shopOrderStatus" placeholder="请选择" >
              <el-option :value="1" label="已下单">已下单</el-option>
              <el-option :value="2" label="已确认">已确认</el-option>
              <el-option :value="3" label="已发货">已发货</el-option>
              <el-option :value="4" label="已收货">已收货</el-option>
              <el-option :value="5" label="已违约">已违约</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="收货地址" prop="address">{{dataForm.address}}</el-form-item>

      <el-form-item label="买家附言" prop="memo">{{dataForm.memo}}</el-form-item>
      <el-form-item label="商家备注" prop="remarks">
        <el-input type="textarea" v-model="dataForm.remarks" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item label="商品详情" prop="remarks">
        <el-table :data="dataForm.orderItemlist" border style="width: 100%;" >
        <el-table-column prop="productName" header-align="center" align="center" label="商品名称"></el-table-column>
        <el-table-column prop="price" header-align="center" align="center" label="价格"></el-table-column>
        <el-table-column prop="quantity" header-align="center" align="center" label="数量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.quantity" style="width:80px" type="number" ></el-input>
          </template>
        </el-table-column>
      </el-table>
      </el-form-item>
      
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">提交修改</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
      },
      dataRule: {
        shopId: [
          { required: true, message: "请选择所属商家", trigger: "blur" }
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
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/order/torder/info/${this.dataForm.id}`),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm = data.tOrder;
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
            url: this.$http.adornUrl(`/order/torder/update`),
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
