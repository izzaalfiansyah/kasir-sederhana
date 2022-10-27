<script lang="ts" setup>
	import { Button, Card, Input, Textarea } from '@/component';
	import { auth, http, showSnackbar } from '@/lib';
	import { onMounted, ref } from 'vue';
	import type { User } from './User.vue';

	const req = ref<User>({});

	async function get() {
		const res = await http.get('/user/' + auth.id);
		req.value = res.data;
		req.value.password = '';
	}

	async function update() {
		await http.put('/user/' + auth.id, req.value);
		showSnackbar('berhasil menyimpan akun');
		get();
	}

	onMounted(() => {
		get();
	});
</script>

<template>
	<form @submit.prevent="update">
		<Card>
			<Input label="Nama" placeholder="Masukkan Nama" v-model="req.nama"></Input>
			<Input
				type="tel"
				label="Nomor Telepon"
				placeholder="Masukkan Nomor Telepon"
				v-model="req.telepon"
			></Input>
			<Textarea
				label="Alamat"
				rows="3"
				placeholder="Masukkan Alamat"
				v-model="req.alamat"
			></Textarea>
			<div class="flex -mx-3 flex-wrap">
				<div class="lg:w-1/2 w-full px-3">
					<Input label="Username" placeholder="Masukkan Username" v-model="req.username"></Input>
				</div>
				<div class="lg:w-1/2 w-full px-3">
					<Input
						type="password"
						label="Password"
						placeholder="Masukkan Password"
						v-model="req.password"
					></Input>
				</div>
			</div>
			<div class="text-xs text-gray-400 mb-3 -mt-3">
				Kosongkan jika tidak ingin mengganti password
			</div>
			<Button variant="primary" mt="5" type="submit">Simpan Data</Button>
		</Card>
	</form>
</template>
