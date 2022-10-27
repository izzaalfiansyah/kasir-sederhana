<script lang="ts" setup="">
	import { Button, Card, Input, Loading, Modal } from '@/component';
	import { formatMoney, http, localeMoney, showSnackbar } from '@/lib';
	import { onMounted, ref } from 'vue';

	export interface Produk {
		id?: number;
		nama?: string;
		harga?: number;
		satuan?: string;
		barcode?: string;
		barcodeImg?: string;
		barcodeUrl?: string;
	}

	const data = ref<Array<Produk>>([]);
	const req = ref<Produk>({});
	const isEdit = ref(false);
	const isLoading = ref(false);
	const modalSave = ref(false);
	const modalDelete = ref(false);

	function nullable() {
		req.value = {
			satuan: 'Pcs',
		};
	}

	async function get() {
		nullable();
		isLoading.value = true;
		const res = await http.get('/produk');
		data.value = res.data;
		isLoading.value = false;
	}

	async function save() {
		if (isEdit.value) {
			await http.put('/produk/' + req.value.id, req.value);
			showSnackbar('data berhasil diedit');
		} else {
			await http.post('/produk', req.value);
			showSnackbar('data berhasil ditambah');
		}

		modalSave.value = false;
		get();
	}

	async function destroy() {
		await http.delete('/produk/' + req.value.id);
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
						<th>Barcode</th>
						<th>Nama Produk</th>
						<th>Satuan</th>
						<th>Harga</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="!data.length">
						<td colspan="99" class="text-center">data tidak tersedia</td>
					</tr>
					<tr v-for="item in data">
						<td><img :src="item.barcodeUrl" alt="" class="w-120px" /></td>
						<td class="font-semibold">{{ item.nama }}</td>
						<td>{{ item.satuan }}</td>
						<td>{{ formatMoney(item.harga as number) }}</td>
						<td class="text-right">
							<Button
								variant="primary"
								mr="2"
								@click="
									isEdit = true;
									modalSave = true;
									req = { ...item };
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
					label="Jenis Satuan"
					placeholder="Masukkan Jenis Satuan"
					v-model="req.satuan"
				></Input>
				<Input
					type="number"
					label="Harga"
					:suffix="localeMoney"
					placeholder="Masukkan Harga"
					v-model="req.harga"
				></Input>
				<div class="text-right">
					<Button variant="primary" mt="5" type="submit">Simpan Data</Button>
				</div>
			</Modal>
		</form>

		<form @submit.prevent="destroy">
			<Modal v-model="modalDelete">
				<div>
					Anda yakin menghapus produk <span class="font-semibold">{{ req.nama }}</span
					>?
				</div>
				<div class="text-right">
					<Button type="submit" variant="primary" mt="5">Hapus Data</Button>
				</div>
			</Modal>
		</form>
	</Card>
</template>
