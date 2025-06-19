<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import BuilderUI from './views/BuilderUI.vue'

const currentView = ref('builderUI')

const handleMenuSelect = (key) => {
  currentView.value = key
}
</script>

<template>
  <div class="app-container">
    <Navbar class="app-navbar" />
    <div class="app-content">
      <Sidebar class="app-sidebar" @menu-select="handleMenuSelect" />
      <main class="app-main">
        <BuilderUI v-if="currentView === 'builderUI'" />
      </main>
    </div>
  </div>
</template>

<style>
/* Global styles */
body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family);
  background-color: #f5f7f9;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app-navbar {
  flex-shrink: 0;
}

.app-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.app-sidebar {
  flex-shrink: 0;
}

.app-main {
  flex: 1;
  overflow: auto;
  background-color: #f5f7f9;
}
</style>
