import { Component, createSignal, For, onMount, Show } from 'solid-js';
import { Input, Select, Textarea } from '../components/Input';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import { http } from '../lib';

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

export const User: Component = () => {
	const [data, setData] = createSignal<Array<User>>([]);
	const [isLoading, setIsLoading] = createSignal(false);
	const [modal, setModal] = createSignal(false);

	async function get() {
		await setIsLoading(true);
		const { data } = await http.get('/user');
		setData(data);
		setIsLoading(false);
	}

	onMount(() => {
		get();
	});

	return (
		<>
			<button
				class="btn bg-primary hover:bg-secondary mb-4"
				onClick={() => {
					setModal(true);
				}}
			>
				<div class="flex items-center">
					<i class="fa fa-plus mr-2"></i>
					TAMBAH
				</div>
			</button>
			<div class="rounded p-6 shadow bg-white">
				<div class="overflow-x-auto relative">
					<table class="table">
						<thead>
							<tr>
								<th>Nama</th>
								<th>Username</th>
								<th>Nomor Telepon</th>
								<th>Alamat</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<For
								each={data()}
								fallback={
									<tr>
										<td colspan="5" class="text-center">
											data tidak tersedia
										</td>
									</tr>
								}
							>
								{(item) => (
									<tr>
										<td class="font-semibold">{item.nama}</td>
										<td>{item.username}</td>
										<td>{item.telepon}</td>
										<td>{item.alamat}</td>
										<td class="text-right">
											<button class="btn bg-primary hover:bg-secondary mr-2" onClick={() => {}}>
												<div class="flex items-center">
													<i class="fa fa-pen"></i>
													<span class="ml-2 lg:block hidden">EDIT</span>
												</div>
											</button>
											<button class="btn bg-secondary hover:bg-red-400" onClick={() => {}}>
												<div class="flex items-center">
													<i class="fa fa-trash"></i>
													<span class="ml-2 lg:block hidden">HAPUS</span>
												</div>
											</button>
										</td>
									</tr>
								)}
							</For>
						</tbody>
					</table>
					<Show when={isLoading()}>
						<Loading></Loading>
					</Show>
				</div>
			</div>
			<form action="">
				<Modal model={[modal, setModal]}>
					<Input label="Nama" placeholder="Masukkan Nama" />
					<Input label="Nomor Telepon" placeholder="Masukkan Nomor Telepon" />
					<Textarea rows={3} label="Alamat" placeholder="Masukkan Alamat" />
					<Input label="Username" placeholder="Masukkan Username" />
					<Input label="Password" placeholder="Masukkan Password" />
					<Select
						label="Role"
						items={[
							{ text: 'Admin', value: '1' },
							{ text: 'Kasir', value: '2' },
						]}
					/>
					<button class="btn bg-primary hover:bg-secondary mt-5">
						<div class="flex items-center">SIMPAN</div>
					</button>
				</Modal>
			</form>
		</>
	);
};
