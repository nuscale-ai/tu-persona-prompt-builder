<script setup>

import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
</script>

<template>
  <div class="p-2 h-full">
    <div class="h-full flex flex-col">
      <!-- Toolbar -->
      <div class="flex items-center h-12 px-4 border-b border-gray-200 gap-4 bg-white">
        <div class="flex items-center font-semibold text-gray-800 gap-2">
          <i class="pi pi-sliders-h text-blue-500"></i>
          LLM Persona Builder
        </div>
        <div class="flex items-center gap-2 ml-auto">
          <Button label="Preview" icon="pi pi-eye" text class="text-sm px-3 py-1" />
          <Button label="Test" icon="pi pi-bolt" text class="text-sm px-3 py-1" />
          <Button label="Save" icon="pi pi-save" text class="text-sm px-3 py-1" />
          <Button label="Export" icon="pi pi-upload" text class="text-sm px-3 py-1" />
          <Button label="Share" icon="pi pi-users" text class="text-sm px-3 py-1" />
          <Button label="Settings" icon="pi pi-cog" text class="text-sm px-3 py-1" />
        </div>
      </div>

      <!-- Layout Columns -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Persona Column -->
        <div class="w-72 border-r border-gray-200 bg-gray-50 flex flex-col">
          <div class="border-b p-2 bg-white text-xs font-medium flex items-center justify-between">
            <span>Personas</span>
            <div class="flex gap-1">
              <Button icon="pi pi-plus" text rounded class="p-1" />
              <Button icon="pi pi-search" text rounded class="p-1" />
            </div>
          </div>
          <div class="overflow-auto p-2 flex-1">
            <div class="mb-2 border rounded p-2 bg-white shadow-sm cursor-pointer hover:bg-blue-50 border-blue-300">
              <div class="text-sm font-semibold">Customer Support</div>
              <div class="text-xs text-gray-500">Modified 2h ago</div>
            </div>
            <!-- Add more persona items here -->
          </div>
          <div class="border-t p-2 bg-white text-xs font-medium flex items-center justify-between">
            <span>Prompts</span>
            <div class="flex gap-1">
              <Button icon="pi pi-plus" text rounded class="p-1" />
              <Button icon="pi pi-clone" text rounded class="p-1" />
            </div>
          </div>
          <div class="overflow-auto p-2 flex-1">
            <div class="mb-2 border rounded p-2 bg-white shadow-sm cursor-pointer hover:bg-green-50 border-green-300">
              <div class="text-sm font-semibold">General Support v1.3</div>
              <div class="flex justify-between text-xs text-gray-500">
                <span>2h ago</span>
                <span>1,247 tokens</span>
              </div>
              <div class="text-xs text-gray-400 mt-1 line-clamp-2">
                You are a friendly customer support specialist who helps users...
              </div>
            </div>
            <!-- Add more prompt items here -->
          </div>
        </div>

        <!-- Editor Column -->
        <div class="flex-1 flex flex-col bg-white">
          <div class="h-12 flex items-center px-4 border-b justify-between bg-gray-50">
            <span class="font-semibold text-sm">General Support v1.3</span>
            <div class="flex gap-1">
              <Button icon="pi pi-refresh" text rounded class="p-1" />
              <Button icon="pi pi-clone" text rounded class="p-1" />
              <Button icon="pi pi-cog" text rounded class="p-1" />
            </div>
          </div>
          <div class="flex-1 overflow-auto p-4 space-y-4">
            <!-- Sections like Role, Background, etc. would go here as form cards -->
            <Card class="bg-gray-50">
              <template #title>
                <div class="flex items-center gap-2">
                  <i class="pi pi-user text-red-400"></i>
                  Role Definition
                </div>
              </template>
              <template #content>
                <div class="space-y-2">
                  <div>
                    <label class="block text-xs font-semibold mb-1">Primary Role</label>
                    <InputText class="w-full text-sm" value="Customer Support Specialist" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold mb-1">Role Description</label>
                    <Textarea class="w-full text-sm" value="You are a friendly and professional customer support specialist..." rows="3" autoResize />
                  </div>
                </div>
              </template>
            </Card>
            <!-- More cards for Background, Instructions, Schema, etc. -->
          </div>
        </div>

        <!-- Assistant Column -->
        <div class="w-80 border-l border-gray-200 bg-gray-50 flex flex-col">
          <div class="border-b p-2 bg-white text-xs font-medium flex items-center justify-between">
            <span>AI Assistant</span>
            <div class="flex gap-1">
              <Button icon="pi pi-refresh" text rounded class="p-1" />
              <Button icon="pi pi-cog" text rounded class="p-1" />
            </div>
          </div>
          <div class="flex-1 overflow-auto p-3 space-y-3">
            <div class="flex gap-2 items-start">
              <i class="pi pi-robot text-blue-500"></i>
              <div class="bg-white border rounded p-2 text-sm">
                I'm here to help you build better prompts! Would you like help refining the role definition?
              </div>
            </div>
            <div class="flex gap-2 items-start">
              <i class="pi pi-user text-gray-500"></i>
              <div class="bg-white border rounded p-2 text-sm">
                Yes, please review the background context section.
              </div>
            </div>
          </div>
          <div class="p-2 border-t bg-white">
            <Textarea placeholder="Ask me anything..." class="w-full text-sm" rows="2" autoResize />
          </div>
        </div>
      </div>

      <!-- Status Bar -->
      <div class="h-6 flex items-center px-4 text-xs justify-between bg-blue-100 text-blue-800">
        <div class="flex gap-4">
          <span>Saved</span>
          <span>Tokens: 1,247 / 4,096</span>
          <span>Validation: Passed</span>
        </div>
        <div class="flex gap-2">
          <span>v1.3.2</span>
          <span>John Doe</span>
        </div>
      </div>
    </div>
  </div>
</template>