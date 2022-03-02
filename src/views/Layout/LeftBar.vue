<template>
  <el-menu
    class="left-bar-menu"
    active-text-color="#fff"
    default-active="2"
    @open="handleOpen"
    @close="handleClose"
  >
    <router-link :to="{ name: 'home' }">
      <el-menu-item index="1">
        <template #title>
          <svg-icon class="left-menu-icon" iconname="icon-shouye"/>
          <span>首页</span>
        </template>
      </el-menu-item>
    </router-link>
    <el-sub-menu index="2">
      <template #title>
        <svg-icon class="left-menu-icon" iconname="icon-shebeiguanli"/>
        <span>设备管理</span>
      </template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <svg-icon class="left-menu-icon" iconname="icon-xitongpeizhi"/>
        <span>系统管理</span>
      </template>
        <router-link :to="{ name: 'menu' }">
          <el-menu-item index="3-1">菜单管理</el-menu-item>
        </router-link>
        <el-menu-item index="3-2">item two</el-menu-item>
        <el-menu-item index="3-3">item three</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="4" disabled>
      <el-icon><document /></el-icon>
      <span>Navigator Three</span>
    </el-menu-item>
  </el-menu>
</template>


<style lang="scss" scoped>
.left-menu-icon{
  font-size: 18px;
  margin-right: 8px;
}
.left-bar-menu{
  color: $dark-brown;
}
.el-menu-item.is-active {
   background-color: $blue !important;//你要修改的颜色
   border-radius: 4px;
}
</style>
