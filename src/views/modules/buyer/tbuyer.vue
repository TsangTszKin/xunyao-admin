<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item label="年龄">
        <el-input v-model="dataForm.borndate2" placeholder="小于等于"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="dataForm.borndate1" placeholder="大于等于"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <!-- <el-button
          v-if="isAuth('buyer:tbuyer:save')"
          type="primary"
          @click="addOrUpdateHandle()"
        >新增</el-button>-->
        <el-button
          v-if="isAuth('buyer:tbuyer:delete')"
          type="danger"
          @click="deleteHandle()"
          :disabled="dataListSelections.length <= 0"
        >批量删除</el-button>
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
      <el-table-column prop="openId" header-align="center" align="center" label="微信openid"></el-table-column>
      <el-table-column prop="headimgurl" header-align="center" align="center" label="微信头像">
        <template slot-scope="scope">
          <img class="avatar" style="height:36px" :src="scope.row.headimgurl">
        </template>
      </el-table-column>
      <el-table-column prop="nickname" header-align="center" align="center" label="昵称"></el-table-column>
      <el-table-column prop="realname" header-align="center" align="center" label="真实姓名"></el-table-column>
      <el-table-column prop="idCard" header-align="center" align="center" label="身份证号"></el-table-column>
      <el-table-column prop="borndate" header-align="center" align="center" label="出生日期"></el-table-column>
      <el-table-column prop="phone" header-align="center" align="center" label="手机号"></el-table-column>
      <el-table-column prop="money" header-align="center" align="center" label="已交保证金"></el-table-column>
      <el-table-column prop="lockMoney" header-align="center" align="center" label="冻结金额"></el-table-column>
      <el-table-column prop="breakMoney" header-align="center" align="center" label="违约金额"></el-table-column>
      <!-- <el-table-column prop="password" header-align="center" align="center" label="登陆密码"></el-table-column> -->
      <el-table-column prop="remarks" header-align="center" align="center" label="备注"></el-table-column>
      <!-- <el-table-column prop="delFlag" header-align="center" align="center" label="删除标识"></el-table-column> -->
      <el-table-column prop="sex" header-align="center" align="center" label="性别">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex === 1" size="small">男</el-tag>
          <el-tag v-if="scope.row.sex === 0" size="small" type="warning">女</el-tag>
          <!-- <el-tag v-if="scope.row.sex === null" size="small" type="info">未知</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column prop="realname" header-align="center" align="center" label="真实姓名"></el-table-column>
      <el-table-column prop="idCard" header-align="center" align="center" label="身份证号"></el-table-column>
      <el-table-column prop="type" header-align="center" align="center" label="用户类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 1" size="small" type="danger">会员</el-tag>
          <el-tag v-if="scope.row.type === 0" size="small" type="info">游客</el-tag>
          <!-- <el-tag v-if="scope.row.type === null" size="small" type="info">未知</el-tag> -->
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
import AddOrUpdate from "./tbuyer-add-or-update";
export default {
  data() {
    return {
      dataForm: {
        key: "",
        borndate1: "",
        borndate2: ""
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
  mounted() {
    this.getDataList();
  },
  activated() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/admin/buyer/tbuyer/list"),
        method: "post",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          key: this.dataForm.key,
          borndate1: this.dataForm.borndate1,
          borndate2: this.dataForm.borndate2
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
          url: this.$http.adornUrl("/admin/buyer/tbuyer/delete"),
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
