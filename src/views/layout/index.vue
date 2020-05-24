<template>
  <div class="app-wrapper">
    <navbar></navbar>  
    <sidebar class="sidebar-container"></sidebar>
    <!-- <sidebar class="sidebar-container" v-on:updateItems="updateItem($event)"></sidebar> -->
    <div class="main-container">
     
      <app-main :data="item"></app-main>
    </div>
  </div>
</template>
a
<script>
import AppMain from "@/views/layout/components/AppMain"; //页面布局的右侧区域
import sidebar from "@/views/layout/components/sidebar"; //页面布局的左侧菜单
import navbar from "./components/navbar/navbar";

export default {
  name: "layout",
  components: {
    sidebar,
    AppMain,
    navbar
  },
  methods:{
    /* updateItem(item){
      console.log("[[[[[[[[[[[[[[[[[[[[[[")
      console.log(item)
      console.log("[[[[[[[[[[[[[[[[[[[[[[")
      this.item = item
    } */
  },
  data(){
    return{
      item: null,
    }
  }
};
</script>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
