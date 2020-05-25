<template>
  <div class="app-container">
    <div class="query_data">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="6">
            <div class="state">日期:</div>
          </el-col>
          <el-col :span="18">
            <div class="input_box">
              <el-date-picker
                size="small"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 100%"
                placeholder="选择日期"
                v-model="date"
              ></el-date-picker>
            </div>
          </el-col>
        </el-col>
        <el-col :span="6">
          <div class="input_box">
            <el-button
              @click="queryDataLongRange"
              type="primary"
              size="mini"
              style="width: 80px"
            >远程查询</el-button>
            <el-button @click="queryData" size="mini" style="width: 80px">本地查询</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="show_data">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content">
            <div>年/元</div>
            <div>收入：150000</div>
            <div>支出：25400</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <div>月/元</div>
            <div>收入：11000</div>
            <div>支出：1400</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <div>周/元</div>
            <div>收入：0</div>
            <div>支出：140</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="Charts"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {
      date: ""
    };
  },
  filters: {},
  created() {},
  methods: {
    queryDataLongRange() {
      console.log("远程数据");
    },
    queryData() {
      console.log("本地数据");
    },
    setChart(dom) {
      let myChart = echarts.init(dom);
      let option = {
        title: {
          text: "年开支分布",
          left: "center"
        },
        grid: {
          top: "10%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "2019-01",
            "2019-02",
            "2019-03",
            "2019-04",
            "2019-05",
            "2019-06",
            "2019-07",
            "2019-08",
            "2019-09",
            "2019-10",
            "2019-11",
            "2019-12"
            ]
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} 元"
          },
          axisPointer: {
            snap: true
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 1,
              color: "green"
            },
            {
              gt: 1,
              lte: 5,
              color: "red"
            },
            {
              gt: 5,
              lte: 9,
              color: "green"
            },
            {
              gt: 5,
              lte:500,
              color: "red"
            },
            {
              gt: 10,
              lte: 1200,
              color: "green"
            }
          ]
        },
        series: [
          {
            name: "月开支",
            type: "line",
            smooth: true,
            data: [
              3300,
              3280,
              10250,
              8260,
              3270,
              3300,
              4550,
              3500,
              5400,
              3390,
              6380,
              9390
            ],
            markArea: {
              data: [
                [
                  {
                    name: "高支出",
                    xAxis: "2019-03"
                  },
                  {
                    xAxis: "2019-04"
                  }
                ],
                [
                  {
                    name: "高支出",
                    xAxis: "2019-11"
                  },
                  {
                    xAxis: "2019-12"
                  }
                ]
              ]
            }
          }
        ]
      };

      myChart.setOption(option, true);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    }
  },
  mounted() {
    this.setChart(this.$el.querySelector("#Charts"));
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  .query_data {
    height: 5vh;
  }
  .show_data {
    height: 20vh;
    text-align: center;
    padding: 30px 0;
    .grid-content {
      height: 11vh;
      color: #666;
      min-width: 200px;
      max-width: 400px;
      margin: auto;
      font-size: 20px;
      font-weight: 700;
      background-color: rgba(241, 28, 13, 0.5);
      border-radius: 50%;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      padding-top: 15px;
    }
  }
  #Charts {
    height: 61vh;
  }
}
</style>
