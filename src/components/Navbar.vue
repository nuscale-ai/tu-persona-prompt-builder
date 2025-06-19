<script setup>
import { Avatar, Menubar } from 'primevue';

// Navbar component
</script>

<template>
  <Menubar
    class="
      px-4 
      py-2 
    "
    style="border-radius: 0px;border: none;"
  >
    <template #start>
      <div class="flex items-center">
        <img src="/logo.svg" alt="Logo" class="h-8 mr-2" />
        <!-- text-[#00a6ca] -->
        <span class="text-xl">Persona Prompt Builder</span>
      </div>
    </template>

    <template #end>
      <Avatar icon="pi pi-user" size="medium" shape="circle" />
    </template>
  </Menubar>
</template>