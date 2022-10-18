import { Component } from 'solid-js';

export const Transaction: Component = () => {
	return (
		<>
			<button class="btn bg-primary hover:bg-secondary mb-4">
				<div class="flex items-center">
					<i class="fa fa-plus mr-2"></i>
					ADD
				</div>
			</button>
			<div class="rounded p-6 shadow bg-white">
				<div class="overflow-x-auto">
					<table class="table">
						<thead>
							<tr>
								<th>Product</th>
								<th>Waiter</th>
								<th>Date</th>
								<th>Qty</th>
								<th>Subtotal</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<div class="flex items-center">
										<div class="h-80px w-60px rounded bg-gray-100 mr-3"></div>
										<div>
											<div class="font-semibold">Mango</div>
											<div class="text-sm">$ 5,000</div>
										</div>
									</div>
								</td>
								<td class="font-semibold">Muhammad Izza Alfiansyah</td>
								<td>2022-10-18 07:12:00</td>
								<td>3 Pcs</td>
								<td>$ 15,000</td>
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
							<tr>
								<td>
									<div class="flex items-center">
										<div class="h-80px w-60px rounded bg-gray-100 mr-3"></div>
										<div>
											<div class="font-semibold">Mango</div>
											<div class="text-sm">$ 5,000</div>
										</div>
									</div>
								</td>
								<td class="font-semibold">Ricky Ahmad Mahbubi</td>
								<td>2022-10-17 14:43:00</td>
								<td>2 Pcs</td>
								<td>$ 10,000</td>
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
							<tr>
								<td>
									<div class="flex items-center">
										<div class="h-80px w-60px rounded bg-gray-100 mr-3"></div>
										<div>
											<div class="font-semibold">Banana</div>
											<div class="text-sm">$ 3,000</div>
										</div>
									</div>
								</td>
								<td class="font-semibold">Muhammad Izza Alfiansyah</td>
								<td>2022-10-17 10:38:00</td>
								<td>6 Pcs</td>
								<td>$ 18,000</td>
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
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};
