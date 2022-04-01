<script setup>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import rootRoute from '@/router/routes/modules/root'
import { useUserStore } from '@/store/userStore'

const userStore = useUserStore()
const route = useRoute()
const menusList = rootRoute.children.slice(1)
const activeTabName = computed(() => route.name)

const defaultIcon = 'icon-apps'
const isCollapse = ref(window.outerWidth < 1280)
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <el-aside
    class="aside"
  >
    <el-menu
      :default-active="activeTabName"
      class="el-menu"
      router
      :collapse="isCollapse"
    >
      <img
        class="aside-avatar"
        src="@/assets/title-img.png"
        alt="aside-avatar"
      >
      <template v-for="(item, index) in menusList">
        <el-sub-menu
          v-if="item.children"
          v-show="!item.meta.requiresAdmin || userStore.is_superuser"
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
            v-show="child.component && (!child.meta.requiresAdmin || userStore.is_superuser) && (!child.meta.isHidden || route.name === child.name)"
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
          v-show="!item.meta.requiresAdmin || userStore.is_superuser"
          :key="item.path"
          :index="item.name"
          :route="item"
        >
          <el-icon>
            <component :is="item.meta.icon || defaultIcon" />
          </el-icon>
          <span>{{ item.meta.title || item.name }}</span>
        </el-menu-item>
      </template>
      <a-button
        class="collapse-button"
        @click="toggleCollapse"
      >
        <icon-menu-unfold v-if="isCollapse" />
        <icon-menu-fold v-else />
      </a-button>
    </el-menu>
  </el-aside>
</template>

<style scoped>
.el-menu{
  height: 100%;
}
.el-menu:not(.el-menu--collapse){
  width: 200px;
}
.aside{
  width: auto
}
.aside-avatar{
  width: inherit;
  margin: 10px 0 5px 0;
  align-items: center;
}

.collapse-button{
  position: absolute;
  padding: 0 12px;
  height: 30px;
  line-height: 30px;
  margin: 11px;

  right: 0;
  bottom: 0;
}
</style>
