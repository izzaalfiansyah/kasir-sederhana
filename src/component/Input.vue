<script lang="ts" setup="">
	import { defineComponent } from 'vue';

	defineProps(['modelValue', 'label', 'prefix', 'suffix']);
	defineEmits(['update:modelValue']);
</script>

<script lang="ts">
	export default defineComponent({
		inheritAttrs: false,
	});
</script>

<template>
	<div class="mb-3">
		<span v-if="label" class="mb-1">{{ label }}</span>
		<div class="flex">
			<div v-if="prefix" class="bg-gray-200 shadow flex items-center px-4 rounded-l">
				{{ prefix }}
			</div>
			<input
				class="w-full rounded focus:(ring-2 ring-primary border-green-500) outline-none border border-gray-100 transition min-h-10 p-2"
				:value="modelValue"
				@input="$emit('update:modelValue', ($event.target as any).value)"
				v-bind="$attrs"
			/>
			<div v-if="suffix" class="bg-gray-200 flex items-center px-4 rounded-r">
				{{ suffix }}
			</div>
		</div>
	</div>
</template>
