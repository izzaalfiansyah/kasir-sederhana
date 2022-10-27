<script setup="" lang="ts">
	import { Button, Input } from '@/component';
	import LoginDec from '@/assets/login-dec.png';
	import { ref } from 'vue';
	import { http, showSnackbar } from '@/lib';

	const req = ref<{
		username?: string;
		password?: string;
	}>({});

	async function login() {
		const res = await http.post('/login', req.value);

		localStorage.setItem('id', res.data.id);
		localStorage.setItem('role', res.data.role);

		showSnackbar('berhasil login');

		window.location.href = window.location.origin + window.location.pathname;
	}
</script>

<template>
	<div class="flex flex-wrap min-h-screen justify-between">
		<form
			@submit.prevent="login"
			class="h-screen flex-1 bg-gray-50 flex p-4 items-center justify-center"
		>
			<div class="bg-white rounded shadow p-8 lg:w-500px w-full">
				<div class="text-center mb-3 pb-3 text-xl">Login</div>
				<Input label="Username" placeholder="Masukkan Username" v-model="req.username"></Input>
				<Input
					type="password"
					label="Password"
					placeholder="Masukkan Password"
					v-model="req.password"
				></Input>
				<Button type="submit" variant="primary" class="w-full mt-10">Submit</Button>
			</div>
		</form>
		<img :src="LoginDec" alt="" class="flex-1 h-screen object-cover w-full lg:block hidden" />
	</div>
</template>
