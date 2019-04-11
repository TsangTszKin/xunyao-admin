<template>
  <div class="mod-home">
    <el-select v-model="type" placeholder="请选择" style="margin-bottom: 50px;">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <div id="main1" :style="{width: '100%', height: '300px',marginBottom: '50px'}"></div>
    <div id="main2" :style="{width: '100%', height: '300px',marginBottom: '50px'}"></div>
    <div id="main3" :style="{width: '100%', height: '300px',marginBottom: '50px'}"></div>
    <div id="main4" :style="{width: '100%', height: '300px',marginBottom: '50px'}"></div>
    <div id="main5" :style="{width: '100%', height: '300px',marginBottom: '50px'}"></div>
    <div id="main6" :style="{width: '100%', height: '300px',marginBottom: '50px'}"></div>
    <div id="main7" :style="{width: '100%', height: '300px',marginBottom: '50px'}"></div>
    <div id="main8" :style="{width: '100%', height: '300px',marginBottom: '50px'}"></div>
    <div id="main10" :style="{width: '100%', height: '300px',marginBottom: '50px'}"></div>
    <div id="main9" :style="{width: '100%', height: '300px',marginBottom: '50px'}"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import common from "../../utils/common";

export default {
  data() {
    return {
      options: [
        {
          value: 3,
          label: "日统计"
        },
        {
          value: 2,
          label: "月份统计"
        },
        {
          value: 1,
          label: "年度统计"
        }
      ],
      type: 3
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    // 获取当前管理员信息
    getUserInfo() {
      this.$http({
        url: this.$http.adornUrl("/sys/user/info"),
        method: "get",
        params: this.$http.adornParams()
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.loading = false;
          this.userId = data.user.userId;
          this.userName = data.user.username;
          this.getData(data.user.admin);
        }
      });
    },
    getData(isAdmin) {
      this.$http({
        url: this.$http.adornUrl("/admin/other/statistics"),
        method: "get",
        params: this.$http.adornParams({
          type: this.type
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.initEcharts(data, isAdmin);
        }
      });
    },
    initEcharts(data, isAdmin) {
      //初始化横坐标
      let xArray1 = [];
      let xArray2 = [];
      let xArray3 = [];
      let xArray4 = [];
      let xArray5 = [];

      let xArray6 = [];
      let xArray7 = [];
      let xArray8 = [];
      let xArray9 = [];

      data.buyerList.forEach(element => {
        if (!xArray1.includes(element.time)) {
          xArray1.push(element.time);
        }
      });
      data.logList.forEach(element => {
        if (!xArray2.includes(element.time)) {
          xArray2.push(element.time);
        }
      });
      data.orderList.forEach(element => {
        if (!xArray3.includes(element.time)) {
          xArray3.push(element.time);
        }
      });
      data.failureOrderList.forEach(element => {
        if (!xArray4.includes(element.time)) {
          xArray4.push(element.time);
        }
      });
      data.successOrderList.forEach(element => {
        if (!xArray5.includes(element.time)) {
          xArray5.push(element.time);
        }
      });
      data.maleBuyerList.forEach(element => {
        if (!xArray6.includes(element.time)) {
          xArray6.push(element.time);
        }
      });
      data.femaleBuyerList.forEach(element => {
        if (!xArray7.includes(element.time)) {
          xArray7.push(element.time);
        }
      });
      data.unknownBuyerList.forEach(element => {
        if (!xArray8.includes(element.time)) {
          xArray8.push(element.time);
        }
      });
      if (isAdmin) {
        data.shopList.forEach(element => {
          if (!xArray9.includes(element.time)) {
            xArray9.push(element.time);
          }
        });
      }

      xArray1.sort();
      xArray2.sort();
      xArray3.sort();
      xArray4.sort();
      xArray5.sort();
      xArray6.sort();
      xArray7.sort();
      xArray8.sort();
      if (isAdmin) xArray9.sort();

      //初始化纵坐标
      let yArray = [];

      let buyerListData = [];
      let logListData = [];
      let orderListData = [];
      let failureOrderListData = [];
      let successOrderListData = [];
      let maleBuyerListData = [];
      let femaleBuyerListData = [];
      let unknownBuyerListData = [];
      let shopListData = [];

      xArray1.forEach(element => {
        let buyerListValue = 0;
        data.buyerList.forEach(element2 => {
          if (element2.time == element) {
            buyerListValue = element2.count;
          }
        });
        buyerListData.push(buyerListValue);
      });
      xArray2.forEach(element => {
        let logListDataValue = 0;
        data.logList.forEach(element2 => {
          if (element2.time == element) {
            logListDataValue = element2.count;
          }
        });
        logListData.push(logListDataValue);
      });
      xArray3.forEach(element => {
        let orderListDataValue = 0;
        data.orderList.forEach(element2 => {
          if (element2.time == element) {
            orderListDataValue = element2.count;
          }
        });
        orderListData.push(orderListDataValue);
      });
      xArray4.forEach(element => {
        let failureOrderListDataValue = 0;
        data.failureOrderList.forEach(element2 => {
          if (element2.time == element) {
            failureOrderListDataValue = element2.count;
          }
        });
        failureOrderListData.push(failureOrderListDataValue);
      });
      xArray5.forEach(element => {
        let successOrderListDataValue = 0;
        data.successOrderList.forEach(element2 => {
          if (element2.time == element) {
            successOrderListDataValue = element2.count;
          }
        });
        successOrderListData.push(successOrderListDataValue);
      });
      xArray6.forEach(element => {
        let maleBuyerListDataValue = 0;
        data.maleBuyerList.forEach(element2 => {
          if (element2.time == element) {
            maleBuyerListDataValue = element2.count;
          }
        });
        maleBuyerListData.push(maleBuyerListDataValue);
      });
      xArray7.forEach(element => {
        let femaleBuyerListDataValue = 0;
        data.femaleBuyerList.forEach(element2 => {
          if (element2.time == element) {
            femaleBuyerListDataValue = element2.count;
          }
        });
        femaleBuyerListData.push(femaleBuyerListDataValue);
      });
      xArray8.forEach(element => {
        let unknownBuyerListDataValue = 0;
        data.unknownBuyerList.forEach(element2 => {
          if (element2.time == element) {
            unknownBuyerListDataValue = element2.count;
          }
        });
        unknownBuyerListData.push(unknownBuyerListDataValue);
      });
      if (isAdmin)
        xArray9.forEach(element => {
          let shopListDataValue = 0;
          data.shopList.forEach(element2 => {
            if (element2.time == element) {
              shopListDataValue = element2.count;
            }
          });
          shopListData.push(shopListDataValue);
        });
      console.log(orderListData, successOrderListData, failureOrderListData);
      let myChart1 = echarts.init(document.getElementById("main1"));
      let myChart2 = echarts.init(document.getElementById("main2"));
      let myChart3 = echarts.init(document.getElementById("main3"));
      let myChart4 = echarts.init(document.getElementById("main4"));
      let myChart5 = echarts.init(document.getElementById("main5"));
      let myChart6 = echarts.init(document.getElementById("main6"));
      let myChart7 = echarts.init(document.getElementById("main7"));
      let myChart8 = echarts.init(document.getElementById("main8"));
      let myChart9 = echarts.init(document.getElementById("main9"));
      let myChart10 = echarts.init(document.getElementById("main10"));

      // 绘制图表
      let option1 = {
        title: {
          text: "用户数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["用户数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xArray1
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "用户数",
            type: "line",
            stack: "总量",
            data: buyerListData
          }
        ]
      };
      let option2 = {
        title: {
          text: "用户访问次数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["用户访问次数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xArray2
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "用户访问次数",
            type: "line",
            stack: "总量",
            data: logListData
          }
        ]
      };
      let option3 = {
        title: {
          text: "订单数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xArray3
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单数",
            type: "line",
            stack: "总量",
            data: orderListData
          }
        ]
      };
      let option4 = {
        title: {
          text: "订单成功数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单成功数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xArray4
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单成功数",
            type: "line",
            stack: "总量",
            data: successOrderListData
          }
        ]
      };
      let option5 = {
        title: {
          text: "订单失败数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单失败数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xArray5
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单失败数",
            type: "line",
            stack: "总量",
            data: failureOrderListData
          }
        ]
      };
      let option6 = {
        title: {
          text: "男性用户"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["男性用户"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xArray6
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "男性用户",
            type: "line",
            stack: "总量",
            data: maleBuyerListData
          }
        ]
      };
      let option7 = {
        title: {
          text: "女性用户"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["女性用户"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xArray7
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "女性用户",
            type: "line",
            stack: "总量",
            data: femaleBuyerListData
          }
        ]
      };
      let option8 = {
        title: {
          text: "未知用户"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["未知用户"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xArray8
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "未知用户",
            type: "line",
            stack: "总量",
            data: unknownBuyerListData
          }
        ]
      };
      let option9 = {
        title: {
          text: "用户搜索次数"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          data: ["产品搜索", "店铺搜索"]
        },
        series: [
          {
            name: "用户搜索次数",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: data.productSearchCount, name: "产品搜索" },
              { value: data.shopSearchCount, name: "店铺搜索" }
            ]
          }
        ]
      };
      let option10 = {
        title: {
          text: "店铺增长"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["店铺增长"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xArray9
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "店铺增长",
            type: "line",
            stack: "总量",
            data: shopListData
          }
        ]
      };
      myChart1.setOption(option1);
      myChart2.setOption(option2);
      myChart3.setOption(option3);
      myChart4.setOption(option4);
      myChart5.setOption(option5);
      myChart6.setOption(option6);
      myChart7.setOption(option7);
      myChart8.setOption(option8);
      myChart9.setOption(option9);
      if (isAdmin) {
        myChart10.setOption(option10);
      }
    }
  },
  watch: {
    type() {
      this.getData();
    }
  }
};
</script>

<style>
.mod-home {
  line-height: 1.5;
}
</style>

