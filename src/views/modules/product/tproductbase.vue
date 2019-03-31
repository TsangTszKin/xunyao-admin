<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button
          v-if="isAuth('product:tproductbase:save')"
          type="primary"
          @click="addOrUpdateHandle()"
        >新增</el-button>
        <el-button
          v-if="isAuth('product:tproductbase:delete')"
          type="danger"
          @click="deleteHandle()"
          :disabled="dataListSelections.length <= 0"
        >批量删除</el-button>
      </el-form-item>
      <el-upload
        style="width: fit-content;float: right;"
        v-if="isAuth('product:tproductbase:save')"
        class="upload-demo"
        :action="importProductUrl"
        :on-preview="handlePreview"
        :on-success="importSuccess"
        :limit="1"
      >
        <el-button size="small" type="primary">导入</el-button>
        <el-alert title="只能上传excel文件" type="warning" style="width: 165px;margin: 5px;"></el-alert>
        <!-- <el-alert title="模板" type="warning" style="width: 165px;margin: 5px;"></el-alert> -->
      </el-upload>
      <el-button style="width: fit-content;float: right;" size="small" type="primary"><a href="./static/商品基本信息模版.xlsx" style="color:#fff;">下载模板</a></el-button>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;"
    >
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="id" header-align="center" align="center" label="商品ID"></el-table-column>
      <!-- <el-table-column prop="className" header-align="center" align="center" label="状态"></el-table-column> -->
      <el-table-column prop="code" header-align="center" align="center" label="商品编号"></el-table-column>
      <el-table-column prop="commonName" header-align="center" align="center" label="通用名"></el-table-column>
      <el-table-column prop="name" header-align="center" align="center" label="商品名称"></el-table-column>
      <el-table-column prop="unit" header-align="center" align="center" label="单位"></el-table-column>
      <el-table-column prop="theform" header-align="center" align="center" label="剂型"></el-table-column>
      <el-table-column prop="specification" header-align="center" align="center" label="规格/型号"></el-table-column>
      <el-table-column prop="place" header-align="center" align="center" label="生产厂家"></el-table-column>
      <!-- <el-table-column prop="className" header-align="center" align="center" label="产地"></el-table-column> -->
      <el-table-column prop="oldPrice" header-align="center" align="center" label="零售价"></el-table-column>
      <el-table-column prop="discountPrice" header-align="center" align="center" label="会员价"></el-table-column>
      <el-table-column prop="barCode" header-align="center" align="center" label="条形码"></el-table-column>
      <el-table-column prop="approvalNumber" header-align="center" align="center" label="批准文号"></el-table-column>
      <!-- <el-table-column prop="className" header-align="center" align="center" label="特价商品"></el-table-column> -->
      <el-table-column prop="prescription" header-align="center" align="center" label="处方登记">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.prescription === 1" size="small" type="danger">是</el-tag>
          <el-tag v-else size="small">否</el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
import AddOrUpdate from "./tproductbase-add-or-update";
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
      addOrUpdateVisible: false,
      importProductUrl: this.$http.adornUrl(
        `/product/tproductbase/importProduct?token=${this.$cookie.get("token")}`
      )
    };
  },
  components: {
    AddOrUpdate
  },
  activated() {
    this.getDataList();
  },
  methods: {
    importSuccess() {
      this.$message({
        message: "导入成功",
        type: "success",
        duration: 1500,
        onClose: () => {
          this.getDataList();
        }
      });
    },
    handlePreview(file) {
      console.log("file", file);
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/product/tproductbase/list"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          name: this.dataForm.name
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
          url: this.$http.adornUrl("/product/tproductbase/delete"),
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
