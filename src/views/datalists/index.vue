<template>
  <div class="app-container">
    <div class="app-center">
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="6">
          <el-col :span="7">
            <div class="state">开支方式:</div>
          </el-col>
          <el-col :span="17">
            <div class="input_box">
              <el-switch v-model="query.mode" active-text="收入" inactive-text="支出" @change="changeMode"></el-switch>
            </div>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="6">
            <div class="state">日期:</div>
          </el-col>
          <el-col :span="18">
            <div class="input_box">
              <el-date-picker
                size="small"
                type="date"
                :clearable="false"
                value-format="yyyy-MM-dd"
                style="width: 100%"
                placeholder="选择日期"
                v-model="query.date"
              ></el-date-picker>
            </div>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="6">
            <div class="state">姓名：</div>
          </el-col>
          <el-col :span="18">
            <div class="input_box">
              <el-select
                v-model="query.name"
                size="small"
                clearable
                filterable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in nameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-col>
        <el-col :span="6">
          <div class="input_box">
            <el-button @click="queryData" type="primary" size="mini" style="width: 80px">查 询</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="table_box">
        <div class="table_title">
          <span class="sp1">金额</span>
          <span class="sp2" v-if="query.mode">收入类型</span>
          <span class="sp3" v-if="!query.mode">支出类型</span>
          <span class="sp4">备注</span>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="81vh"
          :span-method="objectSpanMethod"
        >
          <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
          <el-table-column prop="outName" label="支出者" width="120" v-if="!query.mode"></el-table-column>
          <el-table-column prop="inName" label="受支者" width="120" v-if="!query.mode"></el-table-column>
          <el-table-column prop="name" label="收入者" width="120" v-if="query.mode"></el-table-column>
          <!-- <el-table-column label="金额" width="120"></el-table-column> -->

          <el-table-column prop="list">
            <template slot-scope="scope">
              <div v-for="(item,index) of scope.row.list" :key="index" class="div_table">
                <span>{{item.money}}</span>
                <span v-if="query.mode">{{item.type}}</span>
                <span v-if="!query.mode">{{item.type}}</span>
                <span>{{item.desc}}</span>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="收入类型" v-if="query.mode" width="100"></el-table-column>
        <el-table-column label="支出类型" v-if="!query.mode"  width="100"></el-table-column>
          <el-table-column label="备注"  width="100"></el-table-column>-->
        </el-table>
      </div>
      <!--  <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="amount1" label="数值 1（元）"></el-table-column>
        <el-table-column prop="amount2" label="数值 2（元）"></el-table-column>
        <el-table-column prop="amount3" label="数值 3（元）"></el-table-column>
      </el-table>-->
    </div>
  </div>
</template>
<script>
import Idb from "idb-js"; //  引入Idb
import db_config from "@/utils/db_config";
import { getUuid } from "@/utils/common";

export default {
  name: "datalists",
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 5) {
        //从哪列开始
        if (rowIndex >= 0) {
          return {
            rowspan: 1, //从哪行开始
            colspan: 9 //合并几列
          };
        }
      }
    },
    changeMode(){
      if(!this.query.mode){
        this.$el.querySelector(".table_title").style.left = "330px";
      }else{
        this.$el.querySelector(".table_title").style.left = "210px";
      }
    },
    test() {},
    queryData() {
      Idb(db_config).then(db => {
        db.queryAll({
          tableName: "srcData",
          success: res => {
            this.tableData = res;
            console.log(res);
          }
        });
      });
    }
  },
  mounted() {
    this.queryData();
  },
  data() {
    return {
      query: {
        date: new Date().format("yyyy-MM-dd"),
        name: "",
        mode: false
      },
      msg: "数据列表",
      nameOptions: [
        {
          value: 1,
          label: "邹燕飞"
        },
        {
          value: 2,
          label: "杨春燕"
        },
        {
          value: 3,
          label: "邹宇桐"
        },
        {
          value: 4,
          label: "邹宇倩"
        },
        {
          value: 5,
          label: "邹宇韬"
        },
        {
          value: 6,
          label: "杨小平"
        },
        {
          value: 7,
          label: "沈玉蓉"
        },
        {
          value: 8,
          label: "钟凤英"
        },
        {
          value: 9,
          label: "邹玉坤"
        },
        {
          value: 10,
          label: "其它"
        }
      ],
      tableData: []
    };
  }
};
</script>
<style lang="scss" scoped>
.input_box {
  height: 100%;
  line-height: 34px;
  text-align: left;
}
.state {
  height: 34px;
  line-height: 34px;
  text-align: right;
}
.table_box{
  position: relative;
  .table_title{
    width: 30%;
    position: absolute;
    top: 13px;
    left: 330px;
    // left: 210px;
    height: 50px;
    z-index: 101;
    font-size: 14px;
    font-weight: 700;
    color: rgb(144,147,153);
    .sp1{margin-left: 90px}
    .sp2{margin-left: 90px}
    .sp3{margin-left: 90px}
    .sp4{margin-left: 60px}
  }
}
.div_table {
  width: 100%;
  // border-bottom: 1px solid #eee;
  > span {
    padding: 0 20px;
    display: inline-block;
    min-width: 120px;
  }
}
</style>