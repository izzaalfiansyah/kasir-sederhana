<script setup lang="ts">
	import type { ButtonHTMLAttributes } from 'vue';

	interface Props extends ButtonHTMLAttributes {
		variant: 'primary' | 'secondary';
	}

	defineProps<Props>();

	const bgColor = {
		primary: 'bg-primary hover:bg-secondary',
		secondary: 'bg-secondary hover:bg-red-400',
	};
</script>

<template>
	<button
		class="p-2 px-5 rounded uppercase transition transform font-semibold text-sm"
		:class="bgColor[variant]"
	>
		<slot></slot>
	</button>
</template>
