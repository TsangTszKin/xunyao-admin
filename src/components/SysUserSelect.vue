<template>
  <el-select
    class="select"
    v-model="data"
    :multiple="isMulti"
    filterable
    placeholder="请选择"
    @change="changeSelection"
  >
    <el-option v-for="item in list" :key="item.userId" :label="item.username" :value="item.userId">
      {{item.username}}
    </el-option>
  </el-select>
</template>

<script>
import common from '@/utils/common';
export default {
  props: {
    value: Number,
    isMulti: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: '',
      list: [],
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {

    // 获取数据列表
    getDataList() {
      this.$http({
        url: this.$http.adornUrl('/sys/user/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': 1,
          'limit': 100
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.list = data.page.list
        } else {
          this.list = []
        }
      })
    },
    changeSelection(value) {
      //console.log("changeSelection", value);
      
      this.$emit("changeSelect", value);

    }

  },
  watch: {
    value: { //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        // do something, 可使用this
        // if (this.isMulti) {
        //   this.data = newV.split(',');
        // }
        this.data = newV;
        console.log(newV, oldV);
      },
      deep: true
    }
  },
};
</script>

<style scoped>
.ul {
  list-style: none;
}

.ul > .li {
  padding: 10px;
  cursor: pointer;
}

.ul > .li:hover {
  background-color: #18b4a329;
}

.ul > .li > img {
  height: 50px;
}

.select {
  width: 100%;
}
</style>
