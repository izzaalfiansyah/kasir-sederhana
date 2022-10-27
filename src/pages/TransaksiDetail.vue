<script lang="ts" setup="">
	import { Button, Card, Input, Loading, Modal, Select } from '@/component';
	import { formatMoney, http, showSnackbar } from '@/lib';
	import { onMounted, ref } from 'vue';
	import { useRoute } from 'vue-router';
	import type { Produk } from './Produk.vue';
	import type { Transaksi } from './Transaksi.vue';

	export interface TransaksiDetail {
		id?: number;
		transaksiId?: number;
		produkId?: number;
		harga?: number;
		jumlah?: number;
		diskon?: number;
		hargaAkhir?: number;
		produk?: Produk;
	}

	const route = useRoute();
	const transaksiId = route.params.id;
	const transaksi = ref<Transaksi>({});
	const data = ref<Array<TransaksiDetail>>([]);
	const produk = ref<Array<Produk>>([]);
	const req = ref<TransaksiDetail>({});
	const isEdit = ref(false);
	const isLoading = ref(false);
	const modalSave = ref(false);
	const modalDelete = ref(false);

	function nullable() {
		req.value = {
			diskon: 0,
		};
	}

	async function getParent() {
		const res = await http.get('/transaksi/' + transaksiId);
		transaksi.value = res.data;
	}

	async function getProduk() {
		const res = await http.get('/produk');
		produk.value = res.data;
	}

	async function get() {
		nullable();
		isLoading.value = true;
		const res = await http.get(`/transaksi/${transaksiId}/detail`);
		data.value = res.data;
		isLoading.value = false;
	}

	async function save() {
		if (isEdit.value) {
			await http.put(`/transaksi/${transaksiId}/detail/` + req.value.id, req.value);
			showSnackbar('item berhasil diedit');
		} else {
			await http.post(`/transaksi/${transaksiId}/detail`, req.value);
			showSnackbar('item berhasil ditambah');
		}

		modalSave.value = false;
		get();
	}

	async function destroy() {
		await http.delete(`/transaksi/${transaksiId}/detail/` + req.value.id);
		showSnackbar('item berhasil dihapus');
		modalDelete.value = false;
		get();
	}

	onMounted(() => {
		get();
		getProduk();
		getParent();
	});
</script>

<template>
	<Card>
		<div class="flex flex-wrap">
			<div class="lg:w-1/2 w-full">
				<table>
					<tr>
						<td>Tanggal</td>
						<td class="px-4">:</td>
						<td>{{ transaksi.created_at?.slice(0, 10) }}</td>
					</tr>
					<tr>
						<td>Customer</td>
						<td class="px-4">:</td>
						<td>{{ transaksi.customer }}</td>
					</tr>
					<tr>
						<td>Operator</td>
						<td class="px-4">:</td>
						<td>{{ transaksi.user?.nama }}</td>
					</tr>
				</table>
			</div>
			<div class="lg:w-1/2 w-full lg:pt-0 lg:mt-0 mt-4 pt-4 border-t lg:border-0">
				<table>
					<tr>
						<td>Total Produk</td>
						<td class="px-4">:</td>
						<td>{{ data.length }}</td>
					</tr>
					<tr>
						<td>Subtotal</td>
						<td class="px-4">:</td>
						<td>{{ formatMoney(0) }}</td>
					</tr>
					<tr>
						<td>Pajak</td>
						<td class="px-4">:</td>
						<td>{{ formatMoney(transaksi.pajak as number) }}</td>
					</tr>
					<tr>
						<td>Total</td>
						<td class="px-4">:</td>
						<td>{{ formatMoney(0) }}</td>
					</tr>
				</table>
			</div>
		</div>
	</Card>
	<Card>
		<div class="bg-gray-100 rounded p-3 mb-4">
			<Button
				variant="primary"
				@click="
					nullable();
					modalSave = true;
					isEdit = false;
				"
			>
				<div class="flex items-center">
					<i class="fa fa-plus mr-2"></i>
					Tambah Item
				</div>
			</Button>
		</div>
		<div class="overflow-x-auto relative">
			<table class="table">
				<thead>
					<tr>
						<th>Produk</th>
						<th>Harga</th>
						<th>Jumlah</th>
						<th>Diskon</th>
						<th>Total</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="!data.length">
						<td colspan="99" class="text-center">data tidak tersedia</td>
					</tr>
					<tr v-for="item in data">
						<td class="font-semibold">{{ item.produk?.nama }}</td>
						<td>RP {{ item.harga?.toLocaleString('id-ID') }}</td>
						<td>{{ item.jumlah }}</td>
						<td>{{ item.diskon }}%</td>
						<td>RP {{ item.hargaAkhir?.toLocaleString('id-ID') }}</td>
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
				<Select
					label="Produk"
					v-model="req.produkId"
					:items="[
						{ value: '', text: 'Pilih Produk' },
						...produk.map((item) => ({
							value: item.id,
							text: `${item.nama} (${formatMoney(item.harga as number)})`,
						})),
					]"
				>
				</Select>
				<Input
					type="number"
					label="Jumlah"
					placeholder="Masukkan Jumlah"
					v-model="req.jumlah"
				></Input>
				<Input
					type="number"
					label="Diskon"
					placeholder="Masukkan Diskon"
					v-model="req.diskon"
					suffix="%"
					max="100"
				></Input>
				<div class="text-right">
					<Button variant="primary" mt="5" type="submit">Simpan Item</Button>
				</div>
			</Modal>
		</form>

		<form @submit.prevent="destroy">
			<Modal v-model="modalDelete">
				<div>Anda yakin menghapus item ini?</div>
				<div class="text-right">
					<Button type="submit" variant="primary" mt="5">Hapus Item</Button>
				</div>
			</Modal>
		</form>
	</Card>
</template>
