<script setup="" lang="ts">
	import { ref } from 'vue';

	defineProps(['modelValue']);
	const emits = defineEmits(['update:modelValue']);

	let el = ref();

	function handleClick(e: any) {
		if (e.path.indexOf(el.value) < 0) {
			emits('update:modelValue', false);
		}
	}
</script>

<template>
	<div
		class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 z-50 flex lg:items-center items-end justify-center lg:p-6"
		@click="handleClick"
		v-if="modelValue"
	>
		<div
			class="bg-white !lg:animate-down animate-up lg:rounded rounded-t-lg shadow p-6 lg:w-550px w-full overflow-y-auto lg:max-h-full max-h-[80%]"
			ref="el"
		>
			<slot></slot>
		</div>
	</div>
</template>
