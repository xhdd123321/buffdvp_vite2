<script setup>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import rootRoute from '@/router/routes/modules/root'

const route = useRoute()
const menusList = rootRoute.children.slice(1)
const activeTabName = computed(() => route.name)

const defaultIcon = 'Menu'
</script>

<template>
  <el-aside
    width="200px"
    class="aside"
  >
    <el-menu
      :default-active="activeTabName"
      class="el-menu"
      router
    >
      <img
        class="aside-avatar"
        src="@/assets/title-img.png"
        alt="aside-avatar"
      >
      <template v-for="(item, index) in menusList">
        <el-sub-menu
          v-if="item.children"
          :key="item.path"
          :index="item.name"
          :route="item"
        >
          <template #title>
            <el-icon>
              <component :is="item.meta.icon || defaultIcon" />
            </el-icon>
            <span>{{ item.meta.title || item.name }}</span>
          </template>
          <el-menu-item
            v-for="(child, chi) in item.children"
            v-show="child.component"
            :key="child.path"
            :index="child.name"
            :route="child"
          >
            <el-icon>
              <component :is="child.meta.icon || defaultIcon" />
            </el-icon>
            <span>{{ child.meta.title || child.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item
          v-else
          :key="item.path"
          :index="item.name"
          :route="item"
        >
          <el-icon>
            <component :is="item.meta.icon || defaultIcon" />
          </el-icon>
          <span>{{ item.meta.title || item.name }}</span>
        </el-menu-item></template></el-menu>
  </el-aside>
</template>

<style scoped>
.el-menu{
  height: 100%;
}
.aside-avatar{
  width: 190px;
  margin: 10px 0 5px 0;
  align-items: center;
}
</style>
