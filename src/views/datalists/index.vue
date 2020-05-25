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
              <el-switch
                v-model="query.mode"
                active-text="收入"
                inactive-text="支出"
                @change="changeMode"
              ></el-switch>
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
                  v-for="item in names"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
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
      <router-link :to="'/dataEntry/dataentry?id=' + null">
        <el-button type="primary" size="small" style="margin-bottom: 5px">数据录入</el-button>
      </router-link>
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
          v-if="!query.mode"
          @row-dblclick="rowDbClick"
        >
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column prop="date" label="日期" width="150">
            <template slot-scope="scope">
              <router-link
                :to="'/dataEntry/dataentry?id=' + scope.row.id"
                style="color: #415fff"
              >{{scope.row.date}}</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="outName" label="支出者" width="120"></el-table-column>
          <el-table-column prop="inName" label="受支者" width="120">
            <template slot-scope="scope">{{scope.row.inName}}</template>
          </el-table-column>
          <el-table-column prop="list">
            <template slot-scope="scope">
              <div v-for="(item,index) of scope.row.list" :key="index" class="div_table">
                <span>{{item.money}}</span>
                <span>{{item.type}}</span>
                <span>{{item.desc}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 避免冲突使用了两个table -->
        <el-table :data="tableData" style="width: 100%" height="81vh" v-if="query.mode">
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column prop="date" label="日期" width="150"></el-table-column>
          <el-table-column prop="name" label="收入者" width="120"></el-table-column>
          <el-table-column prop="list">
            <template slot-scope="scope">
              <div v-for="(item,index) of scope.row.list" :key="index" class="div_table">
                <span>{{item.money}}</span>
                <span>{{item.type}}</span>
                <span>{{item.desc}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    queryDataLongRange() {
      this.$message("开发中...");
    },
    rowDbClick(row, column, event) {
      this.$confirm("是否删除该条数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Idb(db_config).then(db => {
          db.delete({
            tableName: "srcData",
            condition: item => item.id == row.id,
            success: res => {
              db.close_db();
              this.$message("删除成功");
              this.queryData();
            }
          });
        });
      });
    },
    changeMode() {
      if (!this.query.mode) {
        this.$el.querySelector(".table_title").style.left = "380px";
      } else {
        this.$el.querySelector(".table_title").style.left = "260px";
      }
      this.queryData();
    },
    queryData() {
      if (this.query.date == null) {
        Idb(db_config).then(db => {
          db.query({
            tableName: "srcData",
            condition: item =>
              item.mode == this.query.mode &&
              (item.name == this.query.name ||
                item.outName == this.query.name ||
                item.inName == this.query.name),
            success: res => {
              this.tableData = res;
              db.close_db();
            }
          });
        });
      } else {
        Idb(db_config).then(db => {
          db.query({
            tableName: "srcData",
            condition: item =>
              item.date == this.query.date &&
              item.mode == this.query.mode &&
              (item.name == this.query.name ||
                item.outName == this.query.name ||
                item.inName == this.query.name),
            success: res => {
              this.tableData = res;
              db.close_db();
            }
          });
        });
      }
    },
    getUsersInfo(){
      Idb(db_config).then(db => {
        db.queryAll({
          tableName: "userInfo",
          success: (res) => {
            this.names = res;
            db.close_db();
          }
        });
      },error=>{this.$message("获取用户信息失败")});
    }
  },
  mounted() {
    this.queryData();
    this.getUsersInfo();
  },
  data() {
    return {
      query: {
        date: new Date().format("yyyy-MM-dd"),
        name: "",
        mode: false
      },
      msg: "数据列表",
      names: [],
      tableData: []
    };
  }
};
</script>
<style lang="scss" scoped>
.table_box {
  position: relative;
  .table_title {
    width: 30%;
    position: absolute;
    top: 13px;
    left: 380px;
    // left: 300px;
    height: 50px;
    z-index: 101;
    font-size: 14px;
    font-weight: 700;
    color: rgb(144, 147, 153);
    .sp1 {
      margin-left: 90px;
    }
    .sp2 {
      margin-left: 90px;
    }
    .sp3 {
      margin-left: 90px;
    }
    .sp4 {
      margin-left: 60px;
    }
  }
}
.div_table {
  width: 100%;
  > span {
    padding: 0 20px;
    display: inline-block;
    min-width: 120px;
  }
}
</style>