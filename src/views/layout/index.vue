<template>
    <div>
        <div>{{layout}}</div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'Layout',
    data(){
        return{
            msg: 'layout'
        }
    }
}
</script>
<style lang="scss" scope>
    
</style>