<template>
  <el-select style="width:100%" :value="value" placeholder="请输入商品名称" @change="changeSelect" 
  filterable remote reserve-keyword :remote-method="remoteSearch">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: function () {
        return ''
      }
    }
  },
  mounted() {
    this.getDataList('');
  },
  data() {
    return {
      options: [
        // {
        //   value: '选项1',
        //   label: '黄金糕'
        // }
      ],
      dataList:[]
    }
  },
  // 获取数据列表
  methods: {
    getDataList(searchValue) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/product/tproductbase/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': 1,
          'limit': 20,
          'name':searchValue
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list
        } else {
          this.dataList = []
        }
        let tempArray = [];
        this.dataList.forEach(element => {
          tempArray.push({
            value: element.id,
            label: element.name
          })
          this.options = tempArray;
        })
      })
    },
    remoteSearch(searchValue){
      this.getDataList(searchValue);
    },
    changeSelect(value) {
      let obj = this.dataList.find((item)=>{
          return item.id === value;
      });
      this.$emit("changeSelectCallBack", obj)
    }
  },
}
</script>

<style>
</style>
