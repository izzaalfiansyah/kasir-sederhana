import { Component, createSignal, For, onMount, Show } from 'solid-js';
import Loading from '../components/Loading';
import { http } from '../lib';
import { User } from './User';

export interface Transaksi {
	userId?: number;
	user?: User;
	customer?: string;
	pajak?: BigInteger;
	total?: number;
	detail?: Array<any>;
	created_at?: string;
}

export const Transaction: Component = () => {
	const [data, setData] = createSignal<Array<Transaksi>>();
	const [isLoading, setIsLoading] = createSignal(false);

	async function get() {
		await setIsLoading(true);
		const { data } = await http.get('/transaksi');
		setData(data);
		setIsLoading(false);
	}

	onMount(() => {
		get();
	});

	return (
		<>
			<button class="btn bg-primary hover:bg-secondary mb-4">
				<div class="flex items-center">
					<i class="fa fa-plus mr-2"></i>
					ADD
				</div>
			</button>
			<div class="rounded p-6 shadow bg-white">
				<div class="overflow-x-auto relative">
					<table class="table">
						<thead>
							<tr>
								<th>Customer</th>
								<th>Date</th>
								<th>Jumlah Produk</th>
								<th>Total</th>
								<th>Petugas</th>
							</tr>
						</thead>
						<tbody>
							<For
								each={data()}
								fallback={
									<tr>
										<td colspan={99} class="text-center">
											data tidak tersedia
										</td>
									</tr>
								}
							>
								{(item) => (
									<tr>
										<td class="font-semibold">{item.user?.nama}</td>
										<td>{item.created_at}</td>
										<td>
											<div class="flex justify-center">
												<div class="bg-primary rounded-full px-3 h-8 flex items-center justify-center text-white shadow">
													{item.detail?.length}
												</div>
											</div>
										</td>
										<td>RP {item.total?.toLocaleString('id-ID')}</td>
										<td>{item.user?.nama}</td>
										<td class="text-right">
											<button class="btn bg-primary hover:bg-secondary mr-2">
												<div class="flex items-center">
													<i class="fa fa-eye"></i>
													<span class="ml-2 lg:block hidden">VIEW</span>
												</div>
											</button>
											<button class="btn bg-secondary hover:bg-red-400">
												<div class="flex items-center">
													<i class="fa fa-trash"></i>
													<span class="ml-2 lg:block hidden">DELETE</span>
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
		</>
	);
};
