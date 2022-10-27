<script lang="ts" setup>
	import { ref } from 'vue';

	const menus = [
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
	];

	const sidebarOpen = ref(false);

	function toggleSidebar() {
		sidebarOpen.value = !sidebarOpen.value;
	}
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
						<li class="mb-0">
							<RouterLink
								to="/account"
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
								to="#"
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
						to="/account"
						class="p-2 px-4 rounded-full flex items-center font-semibold text-base"
					>
						<div class="lg:block hidden">Superadmin</div>
					</RouterLink>
				</div>
			</div>
			<div class="pt-4 text-base">
				<div class="main-content">
					<RouterView></RouterView>
				</div>
			</div>
		</div>
	</div>
</template>
