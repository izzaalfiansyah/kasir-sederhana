<script lang="ts" setup="">
	import { defineComponent } from 'vue';

	defineProps(['modelValue', 'label']);
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
		<textarea
			class="w-full rounded focus:(ring-2 ring-primary border-green-500) outline-none border border-gray-100 transition min-h-10 p-2 resize-none"
			:value="modelValue"
			@input="$emit('update:modelValue', ($event.target as any).value)"
			v-bind="$attrs"
		></textarea>
	</div>
</template>
