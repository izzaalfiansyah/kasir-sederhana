import { NavLink, useLocation } from '@solidjs/router';
import { Component, createSignal, For } from 'solid-js';
import { Router } from '../Router';

export const Admin: Component = () => {
	const [sidebarOpen, setSidebarOpen] = createSignal(false);

	const location = useLocation();

	function toggleSidebar() {
		setSidebarOpen(!sidebarOpen());
	}

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
			path: '/product',
			title: 'Data Produk',
			icon: 'image',
		},
		{
			path: '/transaction',
			title: 'Data Transaksi',
			icon: 'folder-open',
		},
		{
			path: '/report',
			title: 'Laporan',
			icon: 'newspaper',
		},
	];

	return (
		<div class="min-h-screen bg-[#FAFAFA] text-gray-700">
			<div
				class="fixed top-0 left-0 right-0 bottom-0 z-10 bg-black bg-opacity-25 !lg:hidden"
				classList={{ '!hidden': !sidebarOpen() }}
				onClick={toggleSidebar}
			></div>
			<div
				class="fixed top-0 left-0 bottom-0 w-280px bg-white shadow z-20 transition transform -translate-x-full !lg:translate-x-0"
				classList={{ '!translate-x-0': sidebarOpen() }}
			>
				<div class="p-6 flex flex-col h-full justify-between">
					<div>
						<div class="py-5 font-bold text-2xl">Kasir.</div>
						<ul class="mt-2">
							<For each={menus}>
								{(item) => (
									<li
										classList={{ 'bg-primary rounded-lg shadow': item.path == location.pathname }}
									>
										<NavLink
											href={item.path}
											class="block p-4 py-3 font-semibold flex items-center transition hover:(transform translate-x-8px)"
										>
											<div class="text-center w-6 mr-3">
												<i class={'far fa-' + item.icon}></i>
											</div>
											<div>{item.title}</div>
										</NavLink>
									</li>
								)}
							</For>
						</ul>
					</div>
					<div>
						<ul class="mb-5">
							<li
								class="mb-0"
								classList={{ 'bg-primary rounded-lg shadow': '/account' == location.pathname }}
							>
								<NavLink
									href="/account"
									class="block p-4 py-3 font-semibold flex items-center transition hover:(transform translate-x-8px)"
								>
									<div class="text-center w-6 mr-3">
										<i class="far fa-user"></i>
									</div>
									<div>Akun</div>
								</NavLink>
							</li>
							<li class="mb-0">
								<a
									href="#"
									class="block p-4 py-3 font-semibold flex items-center transition hover:(transform translate-x-8px)"
									onClick={() => {}}
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
							class="!lg:hidden fa fa-bars mr-4 ml-2 block cursor-pointer"
							onClick={toggleSidebar}
						></i>
						<div class="font-normal px-5 p-2 w-180px text-base rounded-full shadow-sm bg-white">
							{location.pathname}
						</div>
					</div>
					<div class="h-full flex items-center">
						<NavLink
							href="/account"
							class="p-2 px-4 rounded-full flex items-center font-semibold text-base"
						>
							<div class="lg:block hidden">Superadmin</div>
						</NavLink>
					</div>
				</div>
				<div class="pt-4 text-base">
					<div class="main-content">
						<Router></Router>
					</div>
				</div>
			</div>
		</div>
	);
};
