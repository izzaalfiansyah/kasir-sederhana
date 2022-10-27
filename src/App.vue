<script setup="" lang="ts">
	import Admin from './layouts/Admin.vue';
	import Login from './layouts/Login.vue';
	import { auth } from './lib';
</script>

<template>
	<Admin v-if="auth.id"></Admin>
	<Login v-else></Login>
</template>
