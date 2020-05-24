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
        <!--  <el-row :gutter="20">
         
        </el-row>
        <el-row :gutter="20">
          
        </el-row>-->
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
          <el-col :span="6">
            <el-col :span="7" style="line-height: 36px">维护类型:</el-col>
            <el-col :span="15" style="line-height: 36px">
              <el-input size="small" clearable v-model="outType" style="width: 100%;"></el-input>
            </el-col>
            <el-col :span="2" style="line-height: 36px">
              <el-button
                size="small"
                icon="el-icon-plus"
                plain
                circle
                title="添加一行"
                @click="addType(outType)"
              ></el-button>
            </el-col>
          </el-col>
          <el-col :span="6">
            <el-col :span="7" style="line-height: 36px">维护姓名:</el-col>
            <el-col :span="15" style="line-height: 36px">
              <el-input size="small" clearable v-model="name" style="width: 100%;"></el-input>
            </el-col>
            <el-col :span="2" style="line-height: 36px">
              <el-button
                size="small"
                icon="el-icon-plus"
                plain
                circle
                title="添加一行"
                @click="addName(name)"
              ></el-button>
            </el-col>
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
                  v-for="item in nameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
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
                  v-for="item in nameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
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
                  v-for="item in nameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
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
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
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
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
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
          <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
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
    addName(name) {
      let obj = {
        value: this.nameOptions.length + 1,
        label: name
      };
      this.nameOptions.push(obj);
    },
    addType(outType) {
      let obj = {};
      if (this.ruleForm.mode) {
        obj = {
          value: this.options1.length + 1,
          label: outType
        };
        this.options1.push(obj);
      } else {
        obj = {
          value: this.options.length + 1,
          label: outType
        };
        this.options.push(obj);
      }
    },
    submitFormlocality(formName) {

      this.ruleForm.id = getUuid();

      this.$refs[formName].validate(valid => {
        if (valid) {
          Idb(db_config).then(db => {
            db.insert({
              tableName: "srcData",
              data: this.ruleForm,
              success: () => {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
              }
            });
          });
        } else {
          this.$message.error('添加失败');
          return false;
        }
      });
    },
    submitForm(formName) {
      //   console.log(this.ruleForm.list[this.ruleForm.list.length-1])

      this.$refs[formName].validate(valid => {
        if (valid) {
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
    }
  },
  mounted() {
    //   this.setBreadcrumb([1,2,3])
  },
  data() {
    return {
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
      options1: [
        {
          value: 1,
          label: "工资"
        }
      ],
      options: [
        {
          value: 1,
          label: "买菜"
        },
        {
          value: 2,
          label: "水果"
        },
        {
          value: 3,
          label: "衣服"
        },
        {
          value: 4,
          label: "学费"
        },
        {
          value: 5,
          label: "房租"
        },
        {
          value: 6,
          label: "美食/餐厅消费"
        },
        {
          value: 7,
          label: "小孩衣服"
        },
        {
          value: 8,
          label: "医疗支出"
        },
        {
          value: 9,
          label: "孝敬长辈"
        },
        {
          value: 10,
          label: "加油"
        },
        {
          value: 11,
          label: "汽车配件"
        },
        {
          value: 12,
          label: "探亲访友"
        },
        {
          value: 13,
          label: "房建"
        },
        {
          value: 14,
          label: "家用电器"
        },
        {
          value: 15,
          label: "电费"
        },
        {
          value: 16,
          label: "水费"
        },
        {
          value: 17,
          label: "电子产品"
        },
        {
          value: 18,
          label: "化妆品"
        },
        {
          value: 19,
          label: "其它消费"
        }
      ],
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