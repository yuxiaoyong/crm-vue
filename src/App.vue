<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
  import { Layout } from "@/view/layout"

  export default {
    name: 'App'
  }
</script>

<style>
  [v-cloak] {
    display: none;
  }
</style>
