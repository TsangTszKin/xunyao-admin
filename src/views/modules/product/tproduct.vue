<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <!-- <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item> -->
       <el-form-item>
        <el-input v-model="dataForm.name" placeholder="产品名" clearable></el-input>
      </el-form-item>
       <el-form-item>
        <el-input v-model="dataForm.className" placeholder="分类名" clearable></el-input>
      </el-form-item>
       <el-form-item>
        <el-input v-model="dataForm.shopName" placeholder="店铺名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button
          v-if="isAuth('generator:tproduct:save')"
          type="primary"
          @click="addOrUpdateHandle()"
        >新增</el-button>
        <el-button
          v-if="isAuth('generator:tproduct:delete')"
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
      <el-table-column prop="name" header-align="center" align="center" label="商品名称"></el-table-column>
      <el-table-column prop="className" header-align="center" align="center" label="所属分类"></el-table-column>
      <el-table-column prop="shopName" header-align="center" align="center" label="所属商家"></el-table-column>
      <el-table-column prop="oldPrice" header-align="center" align="center" label="原价格"></el-table-column>
      <el-table-column prop="discountPrice" header-align="center" align="center" label="优惠价"></el-table-column>
      <el-table-column prop="commonName" header-align="center" align="center" label="通用名称"></el-table-column>
      <!-- <el-table-column prop="englishName" header-align="center" align="center" label="英文名字"></el-table-column> -->
      <el-table-column prop="specification" header-align="center" align="center" label="规格"></el-table-column>
      <el-table-column prop="stock" header-align="center" align="center" label="库存">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.stock === 1" size="small" type="danger">有</el-tag>
          <el-tag v-else size="small">无</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="state" header-align="center" align="center" label="审批状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state === 0" size="small" type="danger">待审核</el-tag>
          <el-tag v-else-if="scope.row.state === 1" size="small" type="danger">通过</el-tag>
          <el-tag v-else size="small">不通过</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column prop="top" header-align="center" align="center" label="是否置顶">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.top === 1" size="small" type="danger">是</el-tag>
          <el-tag v-else size="small">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="lowerShelf" header-align="center" align="center" label="是否下架">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.lowerShelf === 1" size="small" type="danger">是</el-tag>
          <el-tag v-else size="small">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="state" header-align="center" align="center" label="审批状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state === -1" size="small" type="danger">待提交</el-tag>
          <el-tag v-else-if="scope.row.state === 0" size="small" type="danger">待审核</el-tag>
          <el-tag v-else-if="scope.row.state === 1" size="small" type="danger">通过</el-tag>
          <el-tag v-else size="small">不通过</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="manufacturer" header-align="center" align="center" label="生产厂商"></el-table-column>
      <el-table-column prop="barCode" header-align="center" align="center" label="条形码"></el-table-column>
      <el-table-column prop="approvalNumber" header-align="center" align="center" label="批准文号"></el-table-column> -->
      <!-- <el-table-column prop="id" header-align="center" align="center" label="主键id"></el-table-column> -->
      <!-- <el-table-column prop="createBy" header-align="center" align="center" label="创建人"></el-table-column> -->
      <!-- <el-table-column prop="updateBy" header-align="center" align="center" label="修改人"></el-table-column> -->
      <!-- <el-table-column prop="delFlag" header-align="center" align="center" label="删除标识"></el-table-column> -->
      <!-- <el-table-column prop="remarks" header-align="center" align="center" label="备注"></el-table-column> -->
      <!-- <el-table-column prop="shopId" header-align="center" align="center" label></el-table-column> -->
      <!-- <el-table-column prop="productImg" header-align="center" align="center" label="商品图片（多张，隔开）">
        <template slot-scope="scope">
          <img class="avatar" v-for="(item, i) in getImgArrayFormString(scope.row.productImg)" style="height:36px" :src="item">
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        prop="productExplain"
        header-align="center"
        align="center"
        label="药品说明(可通过摄像头扫描识别药盒上文字说明)"
      ></el-table-column>
      <el-table-column prop="reminder" header-align="center" align="center" label="温馨提示"></el-table-column>
      <el-table-column prop="prescription" header-align="center" align="center" label="是否处方药"></el-table-column> -->
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" v-if="scope.row.state === -1||scope.row.state === 2" size="small" @click="auditHandle(scope.row.id)">提交审批</el-button>
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
import AddOrUpdate from './tproduct-add-or-update'
export default {
  data() {
    return {
      dataForm: {
        // key: '',
        name: '',
        shopName: '',
        className: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  activated() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/admin/product/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          // 'key': this.dataForm.key,
          'shopName': this.dataForm.key,
          'name': this.dataForm.key,
          'className': this.dataForm.key,
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list
          this.totalPage = data.page.totalCount
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/admin/product/delete'),
          method: 'delete',
          data: this.$http.adornData(ids, false)
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    },
    auditHandle(id) {
      this.$confirm(`确定要提交审批吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/admin/product/applyAudit'),
          method: 'post',
          data: this.$http.adornData(id, false)
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    },
    getImgArrayFormString(str) {
      console.log(str)
      if (str) {
        console.log('str.split(",")', str.split(","))
        return str.split(",");
      } else {
        return []
      }
    }
  }
}
</script>
