<template>
  <el-select :value="value" placeholder="请选择" @change="changeSelect">
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
        url: this.$http.adornUrl('/product/tproductclass/list'),
        method: 'post',
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
            value: element.id,
            label: element.className
          })
          this.options = tempArray;
        })
      })
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
