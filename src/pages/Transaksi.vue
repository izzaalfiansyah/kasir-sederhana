<script lang="ts" setup="">
	import { Button, Card, Input, Loading, Modal } from '@/component';
	import { auth, formatMoney, http, localeMoney, showSnackbar } from '@/lib';
	import { onMounted, ref } from 'vue';
	import { useRouter } from 'vue-router';
	import type { User } from './User.vue';

	export interface Transaksi {
		id?: number;
		userId?: number | string;
		customer?: string;
		subtotal?: number;
		pajak?: number;
		total?: number;
		user?: User;
		detail?: any;
		created_at?: string;
	}

	const router = useRouter();

	const data = ref<Array<Transaksi>>([]);
	const req = ref<Transaksi>({});
	const isLoading = ref(false);
	const modalSave = ref(false);
	const modalDelete = ref(false);

	function nullable() {
		req.value = {
			pajak: 0,
			userId: auth.id as string,
		};
	}

	async function get() {
		nullable();
		isLoading.value = true;
		const res = await http.get('/transaksi', {
			params: {
				userId: auth.role == '1' ? '' : auth.id,
			},
		});
		data.value = res.data;
		isLoading.value = false;
	}

	async function create() {
		const { data: item } = await http.post('/transaksi', req.value);
		showSnackbar('silahkan menambahkan item transaksi');

		router.push('/transaksi/' + item.id);

		modalSave.value = false;
		get();
	}

	async function destroy() {
		await http.delete('/transaksi/' + req.value.id);
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
						<th>Tanggal</th>
						<th>Customer</th>
						<th>Operator</th>
						<th>Total Produk</th>
						<th>Subtotal</th>
						<th>Pajak</th>
						<th>Total</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="!data.length">
						<td colspan="99" class="text-center">data tidak tersedia</td>
					</tr>
					<tr v-for="item in data">
						<td class="font-semibold">{{ item.created_at?.slice(0, 10) }}</td>
						<td>{{ item.customer }}</td>
						<td class="font-semibold">{{ item.user?.nama }}</td>
						<td>{{ item.detail?.length }}</td>
						<td>{{ formatMoney(item.subtotal as number) }}</td>
						<td>{{ formatMoney(item.pajak as number) }}</td>
						<td>{{ formatMoney(item.total as number) }}</td>
						<td class="text-right">
							<Button variant="primary" mr="2" @click="$router.push('/transaksi/' + item.id)">
								<div class="flex items-center">
									<i class="fa fa-eye"></i>
									<span class="ml-2 lg:block hidden">Item</span>
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
	</Card>

	<form @submit.prevent="create">
		<Modal v-model="modalSave">
			<div class="mb-3 pb-3 border-b text-xl">Tambah Transaksi</div>
			<Input
				label="customer"
				placeholder="Masukkan Customer (Atas Nama)"
				v-model="req.customer"
			></Input>
			<Input
				:suffix="localeMoney"
				type="number"
				label="pajak"
				placeholder="Masukkan Pajak"
				v-model="req.pajak"
			></Input>
			<div class="text-right">
				<Button type="submit" variant="primary" mt="5">Buat Transaksi</Button>
			</div>
		</Modal>
	</form>

	<form @submit.prevent="destroy">
		<Modal v-model="modalDelete">
			<div class="mb-3 pb-3 border-b text-xl">Hapus Transaksi</div>
			<div>
				Anda yakin menghapus transaksi pada tanggal
				<span class="font-semibold">{{ req.created_at?.slice(0, 10) }}</span
				>?
			</div>
			<div class="text-right">
				<Button type="submit" variant="primary" mt="5">Hapus Transaksi</Button>
			</div>
		</Modal>
	</form>
</template>
