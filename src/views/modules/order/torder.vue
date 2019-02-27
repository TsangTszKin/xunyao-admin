<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.orderSn" placeholder="订单号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <!-- <el-button v-if="isAuth('generator:torder:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button> -->
        <!-- <el-button
          v-if="isAuth('generator:torder:delete')"
          type="danger"
          @click="deleteHandle()"
          :disabled="dataListSelections.length <= 0"
        >批量删除</el-button> -->
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;"
    >
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="orderSn" header-align="center" align="center" label="订单号"></el-table-column>
      <el-table-column prop="buyerName" header-align="center" align="center" label="下单用户"></el-table-column>
      <el-table-column prop="shopName" header-align="center" align="center" label="店铺"></el-table-column>
      <!-- <el-table-column prop="address" header-align="center" align="center" label="收货地址"></el-table-column> -->
      <el-table-column prop="totalPrice" header-align="center" align="center" label="订单总价"></el-table-column>
      <el-table-column prop="postFee" header-align="center" align="center" label="运费"></el-table-column>
      <el-table-column prop="preferential" header-align="center" align="center" label="优惠"></el-table-column>
      
      <el-table-column prop="orderStatus" header-align="center" align="center" label="订单状态" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.orderStatus === 0" size="small" type="danger">待确认</el-tag>
          <el-tag v-else-if="scope.row.orderStatus === 1" size="small" type="danger">待发货</el-tag>
          <el-tag v-else-if="scope.row.orderStatus === 2" size="small" type="danger">已完成</el-tag>
          <el-tag v-else size="small">已取消</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="shopOrderStatus" header-align="center" align="center" label="物流状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.shopOrderStatus === 0" size="small" type="danger">未下单</el-tag>
          <el-tag v-else-if="scope.row.shopOrderStatus === 1" size="small" type="danger">已下单</el-tag>
          <el-tag v-else-if="scope.row.shopOrderStatus === 2" size="small" type="danger">已确认</el-tag>
          <el-tag v-else-if="scope.row.shopOrderStatus === 3" size="small" type="danger">已发货</el-tag>
          <el-tag v-else-if="scope.row.shopOrderStatus === 4" size="small" type="danger">已收货</el-tag>
          <el-tag v-else size="small">已违约</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="memo" header-align="center" align="center" label="附言"></el-table-column> -->
      <!-- <el-table-column prop="invoiceTitle" header-align="center" align="center" label="发票名称"></el-table-column>
      <el-table-column prop="remarks" header-align="center" align="center" label="备注"></el-table-column> -->
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改订单</el-button>
          <el-button v-if="scope.row.orderStatus === 1" type="text" size="small" @click="confirmSendHandle(scope.row.id)">确认发货</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from "./torder-add-or-update";
export default {
  data() {
    return {
      dataForm: {
        key: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    };
  },
  components: {
    AddOrUpdate
  },
  activated() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/order/torder/list"),
        method: "post",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          orderSn: this.dataForm.orderSn
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 删除
    confirmSendHandle(id) {
      var ids = id;
      this.$confirm(
        `确定标记该订单为发货状态吗?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl("/order/torder/confirmSend"),
          method: "post",
          data: this.$http.adornData(ids, false)
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    }
  }
};
</script>
