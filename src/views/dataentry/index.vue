<template>
  <div class="app-container">
    <div class="app-center">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="发生日期：" prop="date">
              <el-date-picker
                size="small"
                type="date"
                :clearable="false"
                value-format="yyyy-MM-dd"
                style="width: 100%"
                placeholder="选择日期"
                v-model="ruleForm.date"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="开支方式：" prop="mode" style="color: #1ED76D">
          <el-switch
            v-model="ruleForm.mode"
            active-text="收入"
            inactive-text="支出"
            @change="changeMode"
          ></el-switch>
        </el-form-item>
        <el-row :gutter="20" v-if="!ruleForm.mode">
          <el-col :span="6">
            <el-form-item label="支出者：">
              <el-select
                v-model="ruleForm.outName"
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
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="!ruleForm.mode">
          <el-col :span="6">
            <el-form-item label="受支者：">
              <el-select
                v-model="ruleForm.inName"
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
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="ruleForm.mode">
          <el-col :span="6">
            <el-form-item label="收入者：">
              <el-select
                v-model="ruleForm.name"
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
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-for="(item,index) of ruleForm.list" :key="index">
          <el-col :span="6">
            <el-form-item label="发生金额：">
              <el-input size="small" v-model="item.money" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="支出类型：" v-if="!ruleForm.mode">
              <el-select
                v-model="item.type"
                size="small"
                clearable
                filterable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in consumptionTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收入类型：" v-else>
              <el-select
                v-model="item.type"
                size="small"
                clearable
                filterable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in incomeTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注：">
              <el-input size="small" v-model="item.desc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="line-height: 36px">
            <el-button
              size="small"
              icon="el-icon-plus"
              plain
              circle
              title="添加一行"
              @click="addRow(index+1)"
            ></el-button>
            <el-button
              size="small"
              icon="el-icon-delete"
              plain
              circle
              title="删除一行"
              @click="removeRow(index)"
              v-if="index != 0"
            ></el-button>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button size="small" type="primary" @click="submitFormlocality('ruleForm')">暂存本地</el-button>
          <el-button size="small" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button size="small" @click="resetForm('ruleForm')" v-if="!isEdit">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getUuid } from "@/utils/common";
import Idb from "idb-js"; //  引入Idb
import db_config from "@/utils/db_config";

export default {
  name: "dataEntry",
  methods: {
    removeRow(index) {
      this.ruleForm.list.splice(index, 1);
    },
    addRow(index) {
      let obj = {
        money: "",
        type: "",
        desc: ""
      };

      this.ruleForm.list.splice(index, 0, obj);
    },
    submitFormlocality(formName) {
      if (this.$route.query.id === "null") {
        this.ruleForm.id = getUuid();
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          Idb(db_config).then(db => {
            db.insert({
              tableName: "srcData",
              data: this.ruleForm,
              success: () => {
                this.conformFlag = true;
                this.$router.push({ path: "/dataLists/datalists" });
                db.close_db();
                if (this.$route.query.id === "null") {
                  this.$message({
                    message: "添加成功",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: "修改成功",
                    type: "success"
                  });
                }
              }
            });
          });
        } else {
          this.$message.error("添加失败");
          return false;
        }
      });
    },
    submitForm(formName) {
      //   console.log(this.ruleForm.list[this.ruleForm.list.length-1])

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message("开发中....");
          console.log(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changeMode() {
      this.ruleForm.list = [
        {
          money: "",
          type: "",
          desc: ""
        }
      ];
    },
    resetForm(formName) {
      //   this.$refs[formName].resetFields();
      this.ruleForm = {
        outName: "",
        inName: "",
        date: new Date().format("yyyy-MM-dd"),
        name: "",
        mode: false,
        list: [
          {
            money: "",
            type: "",
            desc: ""
          }
        ]
      };
    },
    getUsersInfo() {
      Idb(db_config).then(
        db => {
          db.queryAll({
            tableName: "userInfo",
            success: res => {
              this.names = res;
              db.close_db();
            }
          });
        },
        error => {
          this.$message({message: "获取用户信息失败",type:'error'});
        }
      );
    },
    getConsumptionType() {
      Idb(db_config).then(
        db => {
          db.queryAll({
            tableName: "consumptionType",
            success: res => {
              this.consumptionTypes = res;
              db.close_db();
            }
          });
        },
        error => {
          this.$message({message:"获取消费类型失败",type:'error'});
        }
      );
    },
    getIncomeType() {
      Idb(db_config).then(
        db => {
          db.queryAll({
            tableName: "incomeType",
            success: res => {
              this.incomeTypes = res;
              db.close_db();
            }
          });
        },
        error => {
          this.$message({message:"获取收入类型失败",type:'error'});
        }
      );
    }
  },
  mounted() {
    if (this.$route.query.id !== "null") {
      this.isEdit = true;
      Idb(db_config).then(db => {
        db.query({
          tableName: "srcData",
          condition: item => item.id === this.$route.query.id,
          success: res => {
            this.ruleForm = res[0];
            db.close_db();
          },
          error: () => {
            this.$message({
              message: "数据获取失败",
              type: "error"
            });
          }
        });
      });
    }
    this.getUsersInfo();
    this.getConsumptionType();
    this.getIncomeType();
  },
  beforeRouteLeave(to, from, next) {
    if (
      !this.conformFlag &&
      (this.ruleForm.list.length >= 2 ||
        this.ruleForm.list[0].money !== "" ||
        this.ruleForm.list[0].type !== "")
    ) {
      this.$confirm("有新增的内容没有保存是否确定要离开", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          next();
        })
        .catch(() => {});
    } else {
      next();
    }
  },
  data() {
    return {
      conformFlag: false,
      isEdit: false,
      name: "",
      outType: "",
      ruleForm: {
        id: getUuid(),
        outName: "",
        inName: "",
        name: "",
        date: new Date().format("yyyy-MM-dd"),
        mode: false,
        list: [
          {
            money: "",
            type: "",
            desc: ""
          }
        ]
      },
      names: [],
      incomeTypes: [],
      consumptionTypes: [],
      rules: {
        money: [{ required: true, message: "请输入金额", trigger: "blur" }],
        /*  date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ], */
        type: [
          {
            required: true,
            message: "请选择支出方式",
            trigger: "change"
          }
        ]
      }
    };
  }
};
</script>
<style lang="scss">
.el-form-item {
  color: rgb(20, 215, 18);
}
</style>