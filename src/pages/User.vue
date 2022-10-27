<script lang="ts" setup="">
	import { Button, Card, Input, Loading, Modal, Select, Textarea } from '@/component';
	import { http, showSnackbar } from '@/lib';
	import { onMounted, ref } from 'vue';

	export interface User {
		id?: number;
		username?: string;
		password?: string;
		nama?: string;
		alamat?: string;
		telepon?: string;
		role?: string;
		roleDetail?: string;
	}

	const data = ref<Array<User>>([]);
	const req = ref<User>({});
	const isEdit = ref(false);
	const isLoading = ref(false);
	const modalSave = ref(false);
	const modalDelete = ref(false);

	function nullable() {
		req.value = {};
	}

	async function get() {
		nullable();
		isLoading.value = true;
		const res = await http.get('/user');
		data.value = res.data;
		isLoading.value = false;
	}

	async function save() {
		if (isEdit.value) {
			await http.put('/user/' + req.value.id, req.value);
			showSnackbar('data berhasil diedit');
		} else {
			await http.post('/user', req.value);
			showSnackbar('data berhasil ditambah');
		}

		modalSave.value = false;
		get();
	}

	async function destroy() {
		await http.delete('/user/' + req.value.id);
		showSnackbar('data berhasil dihapus');
		modalDelete.value = false;
		get();
	}

	onMounted(() => {
		get();
	});
</script>

<template>
	<Button
		variant="primary"
		mb="4"
		@click="
			nullable();
			modalSave = true;
			isEdit = false;
		"
	>
		<div class="flex items-center">
			<i class="fa fa-plus mr-2"></i>
			TAMBAH
		</div>
	</Button>
	<Card>
		<div class="overflow-x-auto relative">
			<table class="table">
				<thead>
					<tr>
						<th>Nama</th>
						<th>Username</th>
						<th>Nomor Telepon</th>
						<th>Role</th>
						<th>Alamat</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="!data.length">
						<td colspan="99" class="text-center">data tidak tersedia</td>
					</tr>
					<tr v-for="item in data">
						<td class="font-semibold">{{ item.nama }}</td>
						<td>{{ item.username }}</td>
						<td>{{ item.telepon }}</td>
						<td>{{ item.roleDetail }}</td>
						<td>{{ item.alamat }}</td>
						<td class="text-right">
							<Button
								variant="primary"
								mr="2"
								@click="
									isEdit = true;
									modalSave = true;
									req = { ...item };
									req.password = '';
								"
							>
								<div class="flex items-center">
									<i class="fa fa-pen"></i>
									<span class="ml-2 lg:block hidden">Edit</span>
								</div>
							</Button>
							<Button
								variant="secondary"
								@click="
									req = { ...item };
									modalDelete = true;
								"
							>
								<div class="flex items-center">
									<i class="fa fa-trash"></i>
									<span class="ml-2 lg:block hidden">Hapus</span>
								</div>
							</Button>
						</td>
					</tr>
				</tbody>
			</table>
			<Loading v-if="isLoading"></Loading>
		</div>

		<form @submit.prevent="save">
			<Modal v-model="modalSave">
				<div class="mb-3 pb-3 border-b text-xl">{{ isEdit ? 'Edit' : 'Tambah' }} Data</div>
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
				<Input label="Username" placeholder="Masukkan Username" v-model="req.username"></Input>
				<Input
					type="password"
					label="Password"
					placeholder="Masukkan Password"
					v-model="req.password"
				></Input>
				<div v-if="isEdit" class="text-xs text-gray-400 mb-3 -mt-3">
					Kosongkan jika tidak ingin mengganti password
				</div>
				<Select
					label="Role"
					v-model="req.role"
					:items="[
						{ value: '', text: 'Pilih Role' },
						{ value: '1', text: 'Superadmin' },
						{ value: '2', text: 'Kasir' },
					]"
				></Select>
				<div class="text-right">
					<Button variant="primary" mt="5" type="submit">Simpan Data</Button>
				</div>
			</Modal>
		</form>

		<form @submit.prevent="destroy">
			<Modal v-model="modalDelete">
				<div>
					Anda yakin menghapus user <span class="font-semibold">{{ req.nama }}</span
					>?
				</div>
				<div class="text-right">
					<Button type="submit" variant="primary" mt="5">Hapus Data</Button>
				</div>
			</Modal>
		</form>
	</Card>
</template>
