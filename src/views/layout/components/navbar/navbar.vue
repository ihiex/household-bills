<template>
    <div class="navbar">
        <img src="/static/svg/family_property.svg" alt="">
    </div>
</template>
<script>
export default {
    name: 'navbar',
    data(){
        return{
            msg: 'navbar'
        }
    }
}
</script>
<style lang="scss" scoped>
    .navbar{
        height: 50px;
        width: 100%;
        background-color: rgba(48, 65, 86, 1);
        // line-height: 50px;
        text-align: right;
        padding: 0 20px;
        // background: url('/static/images/navbar.png') no-repeat center center;
        // background-size: 500px 50px;
        >img{
            height: 30px;
            position: relative;
            top: 10px
        }

    }
</style>