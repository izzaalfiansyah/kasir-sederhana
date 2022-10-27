import AkunVue from '@/pages/Akun.vue';
import IndexVue from '@/pages/Index.vue';
import ProdukVue from '@/pages/Produk.vue';
import TransaksiVue from '@/pages/Transaksi.vue';
import TransaksiDetailVue from '@/pages/TransaksiDetail.vue';
import UserVue from '@/pages/User.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: IndexVue,
		},
		{
			path: '/user',
			component: UserVue,
		},
		{
			path: '/produk',
			component: ProdukVue,
		},
		{
			path: '/transaksi',
			component: TransaksiVue,
		},
		{
			path: '/transaksi/:id',
			component: TransaksiDetailVue,
		},
		{
			path: '/akun',
			component: AkunVue,
		},
	],
});

export default router;
