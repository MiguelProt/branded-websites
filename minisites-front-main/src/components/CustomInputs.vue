<script setup>
const props = defineProps(["input"]);

</script>
<template>
  <div class="mb-4" >
    <label class="block text-gray-700 text-sm font-bold mb-2" for="fullName">
      {{ input.label }}
    </label>
    <input
      v-if="input.type === 'input'"
      v-model="input.text"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :id="input.label"
      type="text"
      :placeholder="input.label"
    />
    <textarea
      v-else
      v-model="input.text"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :id="input.label"
      :placeholder="input.label"
    ></textarea>
  </div>
</template>
