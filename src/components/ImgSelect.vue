<template>
  <el-select
    class="img-select"
    v-model="data"
    :multiple="isMulti"
    filterable
    placeholder="请选择"
    @change="changeSelection"
  >
    <el-option v-for="item in imgList" :key="item.id" :label="item.url" :value="item.url">
      <img class="avatar" style="height:36px" :src="item.url">
    </el-option>
  </el-select>
</template>

<script>
import common from '@/utils/common';
export default {
  props: {
    value: String,
    isMulti: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: '',
      imgList: [],
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {

    // 获取数据列表
    getDataList() {
      this.$http({
        url: this.$http.adornUrl('/sys/oss/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': 1,
          'limit': 100
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.imgList = data.page.list
        } else {
          this.imgList = []
        }
      })
    },
    changeSelection(value) {
      console.log("changeSelection", value);
      if (this.isMulti) {
        this.$emit("changeImgSelect", common.arrayToString(value))
      } else {
        this.$emit("changeImgSelect", value);
      }

    }

  },
  watch: {
    value: { //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        // do something, 可使用this
        if (this.isMulti) {
          this.data = newV.split(',');
        }
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

.img-select {
  width: 100%;
}
</style>
