<template>
  <div class="app-container">
    <div class="app-center">
      <el-button @click="test">test</el-button>
    </div>
  </div>
</template>
<script>
import Idb from "idb-js"; //  引入Idb
import db_config from "@/utils/db_config";
import { getUuid } from "@/utils/common";

export default {
  name: "datalists",
  data() {
    return {
      msg: "数据列表"
    };
  },
  methods: {
    test() {
    },
    query(){
      Idb(db_config).then(db => {
         db.queryAll({
           tableName: "srcData",
            success: (res) => {
                console.log(res)
            }
         })
       })
    }
  }
};
</script>
<style lang="scss" scoped>
</style>