import IndexVue from '@/pages/Index.vue';
import ProdukVue from '@/pages/Produk.vue';
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
	],
});

export default router;
