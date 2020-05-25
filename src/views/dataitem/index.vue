<template>
  <div class="app-container">
    <div class="app-center">
      <div style="color: red">该页面有待开发，以下数据临时使用...</div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="7" style="line-height: 36px">维护支出类型:</el-col>
          <el-col :span="15" style="line-height: 36px">
            <el-input size="small" clearable v-model="consumptionType" style="width: 100%;"></el-input>
          </el-col>
          <el-col :span="2" style="line-height: 36px">
            <el-button
              size="small"
              icon="el-icon-plus"
              plain
              circle
              title="添加"
              @click="addConsumptionType(consumptionType)"
            ></el-button>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="7" style="line-height: 36px">维护收入类型:</el-col>
          <el-col :span="15" style="line-height: 36px">
            <el-input size="small" clearable v-model="incomeType" style="width: 100%;"></el-input>
          </el-col>
          <el-col :span="2" style="line-height: 36px">
            <el-button
              size="small"
              icon="el-icon-plus"
              plain
              circle
              title="添加"
              @click="addIncomeType(incomeType)"
            ></el-button>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="7" style="line-height: 36px">维护姓名:</el-col>
          <el-col :span="15" style="line-height: 36px">
            <el-input size="small" clearable v-model="userInfo" style="width: 100%;"></el-input>
          </el-col>
          <el-col :span="2" style="line-height: 36px">
            <el-button
              size="small"
              icon="el-icon-plus"
              plain
              circle
              title="添加一行"
              @click="addUserInfo(userInfo)"
            ></el-button>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-col :span="7" style="line-height: 36px">初始化下拉框数据:</el-col>
          <el-col :span="17" style="line-height: 36px">
          <el-button type="primary" plain @click="initData" size="small">初始化数据</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Idb from "idb-js"; //  引入Idb
import db_config from "@/utils/db_config";

import { getUuid } from "@/utils/common";

export default {
  name: "dataitem",
  methods: {
    addUserInfo(val) {
      let obj = {
        id: getUuid(),
        name: val
      };
      Idb(db_config).then(
        db => {
          db.insert({
            tableName: "userInfo",
            data: obj,
            success: res => {
              this.$message({ message: "添加用户列表成功", type: "success" });
              db.close_db();
            }
          });
        },
        error => {
          this.$message({ message: "添加用户列表失败", type: "error" });
        }
      );
    },
    addConsumptionType(val) {
      let obj = {
        id: getUuid(),
        name: val
      };
      Idb(db_config).then(
        db => {
          db.insert({
            tableName: "consumptionType",
            data: obj,
            success: res => {
              this.$message({ message: "添加支出类型成功", type: "success" });
              db.close_db();
            }
          });
        },
        error => {
          this.$message({ message: "添加支出类型失败", type: "error" });
        }
      );
    },
    addIncomeType(val) {
      let obj = {
        id: getUuid(),
        name: val
      };
      Idb(db_config).then(
        db => {
          db.insert({
            tableName: "incomeType",
            data: obj,
            success: res => {
              this.$message({ message: "添加收入类型成功", type: "success" });
              db.close_db();
            }
          });
        },
        error => {
          this.$message({ message: "添加收入类型失败", type: "error" });
        }
      );
    },
    initData() {
      let usersInfo = [];
      let consumptionType = [];
      let incomeType = [];

      for (let item of this.names) {
        let obj = {
          id: getUuid(),
          name: item
        };
        usersInfo.push(obj);
      }
      for (let item of this.consumptionTypes) {
        let obj = {
          id: getUuid(),
          name: item
        };
        consumptionType.push(obj);
      }
      for (let item of this.incomeTypes) {
        let obj = {
          id: getUuid(),
          name: item
        };
        incomeType.push(obj);
      }
      //用户
      Idb(db_config).then(
        db => {
          db.insert({
            tableName: "userInfo",
            data: usersInfo,
            success: () => {
              this.$message({ message: "用户信息初始化成功", type: "success" });
              db.close_db();
            }
          });
        },
        error => {
          this.$message({ message: "用户信息初始化失败", type: "error" });
        }
      );
      //消费类型
      Idb(db_config).then(
        db => {
          db.insert({
            tableName: "consumptionType",
            data: consumptionType,
            success: () => {
              this.$message({ message: "消费类型初始化成功", type: "success" });
              db.close_db();
            }
          });
        },
        error => {
          this.$message({ message: "消费类型初始化失败", type: "error" });
        }
      );
      //收入类型
      Idb(db_config).then(
        db => {
          db.insert({
            tableName: "incomeType",
            data: incomeType,
            success: () => {
              this.$message({ message: "收入类型初始化成功", type: "success" });
              db.close_db();
            }
          });
        },
        error => {
          this.$message({ message: "收入类型初始化失败", type: "error" });
        }
      );
    }
  },
  data() {
    return {
      msg: "数据字典",
      userInfo: "",
      incomeType: "",
      consumptionType: "",
      names: [
        "邹燕飞",

        "杨春燕",

        "邹宇桐",

        "邹宇倩",

        "邹宇韬",

        "杨小平",

        "沈玉蓉",

        "钟凤英",

        "邹玉坤"
      ],
      incomeTypes: ["工资", "买卖", "红包"],
      consumptionTypes: [
        "买菜",

        "水果",

        "衣服",

        "学费",

        "房租",

        "美食/餐厅消费",

        "小孩衣服",

        "医疗支出",

        "孝敬长辈",

        "加油",

        "汽车配件",

        "探亲访友",

        "房建",

        "家用电器",

        "电费",

        "水费",

        "电子产品",

        "化妆品",

        "其它消费"
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
</style>