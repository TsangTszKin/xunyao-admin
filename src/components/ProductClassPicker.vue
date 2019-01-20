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
        let dataList;
        if (data && data.code === 0) {
          dataList = data.page.list
        } else {
          dataList = []
        }
        let tempArray = [];
        dataList.forEach(element => {
          tempArray.push({
            value: element.id,
            label: element.className
          })
          this.options = tempArray;
        })
      })
    },
    changeSelect(value) {
      console.log("value", value);
      this.$emit("changeSelectCallBack", value)
    }
  },
}
</script>

<style>
</style>
