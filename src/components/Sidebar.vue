<script setup>
// Sidebar component
import { ref } from 'vue';

const activeIndex = ref(0);
const emit = defineEmits(['menu-select']);

const onMenuSelect = (index, item) => {
  activeIndex.value = index;
  emit('menu-select', item.key);
};

const items = [
  {
    key: 'builderUI',
    label: 'Prompt Builder',
    icon: 'pi pi-pencil',
  }
];

// Emit menu select for first item on mounted to select it by default
emit('menu-select', items[0].key);
</script>

<template>
  <div class="h-full bg-[#152735] border-r border-gray-200 w-[250px] text-white">
    <div class="flex justify-center">
      <TieredMenu
        :model="items"
        class="w-full bg-transparent border-none text-center"
        unstyled
      >
        <template #item="{ item, props }">
          <a v-ripple v-bind="props.action" @click="emit('menu-select', item.key)" 
            class="flex items-center justify-center p-3 text-white transition-colors hover:bg-white/20"
            >
            <i :class="[item.icon, 'mr-2']" :style="item.key === 'builderUI' ? 'color: yellow' : ''"></i>
            <span>{{ item.label }}</span>
          </a>
        </template>
      </TieredMenu>
    </div>
  </div>
</template>