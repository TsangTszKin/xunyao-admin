<template>
  <el-select :value="value" placeholder="请选择" @change="changeSelect">
    <el-option :key="0" label="不限" :value="0"></el-option>
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
    this.getDataList();
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
    getDataList() {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/shop/tshop/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': 1,
          'limit': 100
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
            value: element.shopId,
            label: element.shopName
          })
          this.options = tempArray;
        })
      })
    },
    changeSelect(value) {
      let obj = {shopId:0,shopName:'不限'};
      if(value!=0){
        obj = this.dataList.find((item)=>{
            return item.shopId === value;
        });
      }
      this.$emit("changeSelectCallBack", obj)
    }
  },
}
</script>

<style>
</style>
