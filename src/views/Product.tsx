import { Component, createSignal, For, onMount, Show } from 'solid-js';
import Loading from '../components/Loading';
import { http } from '../lib';

export interface Produk {
	nama?: string;
	harga?: number;
	satuan?: string;
	barcode?: string;
	barcodeImg?: string;
	barcodeUrl?: string;
}

export const Product: Component = () => {
	const [data, setData] = createSignal<Array<Produk>>([]);
	const [isLoading, setIsLoading] = createSignal(false);

	async function get() {
		await setIsLoading(true);
		const { data } = await http.get('/produk');
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
								<th>Barcode</th>
								<th>Produk</th>
								<th>Satuan</th>
								<th>Price</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<For
								each={data()}
								fallback={
									<tr>
										<td colspan="4" class="text-center">
											data tidak tersedia
										</td>
									</tr>
								}
							>
								{(item) => (
									<tr>
										<td>
											<img src={item.barcodeUrl} alt="" class="w-200px object-cover" />
										</td>
										<td class="font-semibold">{item.nama}</td>
										<td>{item.satuan}</td>
										<td>RP {item.harga?.toLocaleString('id-ID')}</td>
										<td class="text-right">
											<button class="btn bg-primary hover:bg-secondary mr-3">
												<div class="flex items-center">
													<i class="fa fa-pen"></i>
													<span class="ml-2 lg:block hidden">EDIT</span>
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
						<Loading />
					</Show>
				</div>
			</div>
		</>
	);
};
