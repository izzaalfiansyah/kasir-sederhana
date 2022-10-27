<script lang="ts" setup>
	import { Button, Modal } from '@/component';
	import { http, auth } from '@/lib';
	import type { User } from '@/pages/User.vue';
	import { onMounted, ref } from 'vue';
	import { useRouter } from 'vue-router';

	const menus =
		auth.role == '1'
			? [
					{
						path: '/',
						title: 'Dashboard',
						icon: 'lightbulb',
					},
					{
						path: '/user',
						title: 'User',
						icon: 'user',
					},
					{
						path: '/produk',
						title: 'Data Produk',
						icon: 'image',
					},
					{
						path: '/transaksi',
						title: 'Data Transaksi',
						icon: 'folder-open',
					},
					{
						path: '/laporan',
						title: 'Laporan',
						icon: 'newspaper',
					},
			  ]
			: [
					{
						path: '/',
						title: 'Dashboard',
						icon: 'lightbulb',
					},
					{
						path: '/transaksi',
						title: 'Data Transaksi',
						icon: 'folder-open',
					},
					{
						path: '/laporan',
						title: 'Laporan',
						icon: 'newspaper',
					},
			  ];

	const router = useRouter();
	const sidebarOpen = ref(false);
	const modalLogout = ref(false);
	const user = ref<User>({});

	function toggleSidebar() {
		sidebarOpen.value = !sidebarOpen.value;
	}

	async function getAuth() {
		const res = await http.get('/user/' + auth.id);
		user.value = res.data;
		user.value.password = '';
	}

	async function logout() {
		await http.get('/logout');
		await router.push('/');

		localStorage.removeItem('id');
		localStorage.removeItem('role');

		window.location.href = window.location.origin + window.location.pathname;
	}

	onMounted(() => {
		getAuth();
	});
</script>

<template>
	<div class="min-h-screen bg-[#FAFAFA] text-gray-700">
		<div
			class="fixed top-0 left-0 right-0 bottom-0 z-10 bg-black bg-opacity-25 !lg:hidden"
			:class="{ '!hidden': !sidebarOpen }"
			@click="toggleSidebar"
		></div>
		<div
			class="fixed top-0 left-0 bottom-0 w-280px bg-white shadow z-20 transition transform -translate-x-full !lg:translate-x-0"
			:class="{ '!translate-x-0': sidebarOpen }"
		>
			<div class="p-6 flex flex-col h-full justify-between">
				<div>
					<div class="py-5 font-bold text-2xl">Kasir.</div>
					<ul class="mt-2">
						<li
							v-for="item in menus"
							:class="{ 'bg-primary rounded-lg shadow': item.path == $route.path }"
						>
							<RouterLink
								@click="toggleSidebar"
								:to="item.path"
								class="block p-4 py-3 font-semibold flex items-center transition hover:(transform translate-x-8px)"
							>
								<div class="text-center w-6 mr-3">
									<i :class="'fa fa-' + item.icon"></i>
								</div>
								<div>{{ item.title }}</div>
							</RouterLink>
						</li>
					</ul>
				</div>
				<div>
					<ul class="mb-5">
						<li class="mb-0" :class="{ 'bg-primary rounded-lg shadow': '/akun' == $route.path }">
							<RouterLink
								@click="toggleSidebar"
								to="/akun"
								class="block p-4 py-3 font-semibold flex items-center transition hover:(transform translate-x-8px)"
							>
								<div class="text-center w-6 mr-3">
									<i class="far fa-user"></i>
								</div>
								<div>Akun</div>
							</RouterLink>
						</li>
						<li class="mb-0">
							<a
								href=""
								@click.prevent="modalLogout = true"
								class="block p-4 py-3 font-semibold flex items-center transition hover:(transform translate-x-8px)"
							>
								<div class="text-center w-6 mr-3">
									<i class="far fa-hourglass-half"></i>
								</div>
								<div>Logout</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="px-4 lg:px-6 transition lg:ml-280px relative">
			<div class="!text-xl font-semibold flex h-20 justify-between border-b border-gray-100">
				<div class="flex items-center h-full">
					<i
						@click="toggleSidebar"
						class="!lg:hidden fa fa-bars mr-4 ml-2 block cursor-pointer"
					></i>
					<div class="font-normal px-5 p-2 w-180px text-base rounded-full shadow-sm bg-white">
						{{ $route.path }}
					</div>
				</div>
				<div class="h-full flex items-center">
					<RouterLink
						to="/akun"
						class="p-2 px-4 rounded-full flex items-center font-semibold text-base"
					>
						<div
							class="lg:block hidden p-2 px-5 bg-primary rounded-full shadow hover:bg-secondary transition"
						>
							<i class="fa fa-user mr-4"></i>
							{{ user.nama }}
						</div>
					</RouterLink>
				</div>
			</div>
			<div class="pt-4 text-base">
				<div class="main-content">
					<RouterView></RouterView>
				</div>
			</div>
		</div>

		<form @submit.prevent="logout">
			<Modal v-model="modalLogout">
				<div>Anda yakin akan logout? Sesi anda akan terhapus!</div>
				<div class="text-right">
					<Button type="submit" variant="primary" mt="5">Logout</Button>
				</div>
			</Modal>
		</form>
	</div>
</template>
