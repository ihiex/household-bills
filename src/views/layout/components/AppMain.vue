<template>
  <section class="app-main" id="AppMain">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{breadNav}}</el-breadcrumb-item>
        <!--  <el-breadcrumb-item>
          <a href="/">活动管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
      </el-breadcrumb>
    </div>

    <transition name="fade" mode="out-in">
      <div class="main_router">
        <router-view></router-view>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  provide() {
    return {
      setBar: this.setBar,
      setBreadcrumb: this.setBreadcrumb
    };
  },
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
    breadNav() {
      console.log(this.$route);
      return this.$route.meta.title;
    }
  },
  mounted() {
   /*  let count = 1;
    setInterval(()=>{
      document.querySelector("#AppMain").style.backgroundImage = "url('/static/images/bg"+ ++count+".png')";
      if(count >= 19){
        count = 1
      }
    },1000 * 10) */
  },
  methods: {
    setBar(item) {
      console.log(item);
      this.item = item;
    },
    setBreadcrumb(val) {
      console.log(val);
    }
  },
  data() {
    return {
      item: []
    };
  }
};
</script>
<style lang="scss" scoped>
.app-main {
  background: url("/static/images/bg13.png") no-repeat center bottom;
  background-color: rgba(230, 230, 230, 0.8);
  background-size: 100% 90%;
}
.breadcrumb {
  border-bottom: solid 1px #ccc;
  padding: 10px;
}
.main_router{
  height: 91vh;
  overflow: auto;
  // border: solid 1px red;
}
</style>
