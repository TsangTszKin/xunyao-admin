<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.shop_name" placeholder="店铺名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <!-- <el-button
          v-if="isAuth('shop:tshopapply:save')"
          type="primary"
          @click="auditHandle()"
        >新增</el-button>
        <el-button
          v-if="isAuth('shop:tshopapply:delete')"
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
      <!-- <el-table-column prop="id" header-align="center" align="center" label="主键id"></el-table-column> -->
      <el-table-column prop="shopName" header-align="center" align="center" label="店铺名称"></el-table-column>
      <el-table-column prop="shopLogo" header-align="center" align="center" label="店铺logo">
        <template slot-scope="scope">
          <img class="avatar" style="height:36px" :src="scope.row.shopLogo">
        </template>
      </el-table-column>
      <el-table-column prop="realName" header-align="center" align="center" label="店长姓名"></el-table-column>
      <el-table-column prop="address" header-align="center" align="center" label="地址"></el-table-column>
      <el-table-column prop="telephone" header-align="center" align="center" label="电话"></el-table-column>
      <!-- <el-table-column prop="cardId1" header-align="center" align="center" label="身份证正面"></el-table-column>
      <el-table-column prop="cardId2" header-align="center" align="center" label="身份证反面"></el-table-column>
      <el-table-column prop="drugBusinessCert" header-align="center" align="center" label="药品经营许可证"></el-table-column>
      <el-table-column prop="foodBusinessCert" header-align="center" align="center" label="食品经营许可证"></el-table-column>
      <el-table-column prop="businessLicense" header-align="center" align="center" label="营业执照"></el-table-column>
      <el-table-column prop="drugQualityCert" header-align="center" align="center" label="药品经营质量管理规范"></el-table-column>
      <el-table-column prop="drugRegisterCert" header-align="center" align="center" label="执业药师注册证"></el-table-column> -->
      <el-table-column prop="status" header-align="center" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" size="small" type="danger">未处理</el-tag>
          <el-tag v-else-if="scope.row.status === 1" size="small" type="danger">通过</el-tag>
          <el-tag v-else size="small">不通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" header-align="center" align="center" label="申请时间"></el-table-column>
      <el-table-column prop="auditTime" header-align="center" align="center" label="审批时间"></el-table-column>
      <el-table-column prop="auditBy" header-align="center" align="center" label="审批人"></el-table-column>
      <el-table-column prop="remarks" header-align="center" align="center" label="备注"></el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="auditHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button> -->
          <el-button v-if="scope.row.status===0" type="text" size="small" @click="auditHandle(scope.row.id)">审批</el-button>
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
    <!-- 弹窗, 审核 -->
    <add-or-update v-if="auditVisible" ref="AddOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from "./tshopapply-audit";
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
      auditVisible: false
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
        url: this.$http.adornUrl("/shop/tshopapply/list"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          shop_name: this.dataForm.shop_name
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
    auditHandle(id) {
      this.auditVisible = true;
      this.$nextTick(() => {
        this.$refs.AddOrUpdate.init(id);
      });
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      this.$confirm(
        `确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl("/shop/tshopapply/delete"),
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
