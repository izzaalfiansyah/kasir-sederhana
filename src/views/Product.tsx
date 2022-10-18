import { Component } from 'solid-js';

export const Product: Component = () => {
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
								<th>Category</th>
								<th>Price</th>
								<th>Unit</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="font-semibold">
									<div class="flex items-center">
										<div class="h-80px w-60px rounded bg-gray-100 mr-3"></div>
										Mango
									</div>
								</td>
								<td>Fruit</td>
								<td>$ 5,500</td>
								<td>Pcs</td>
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
							<tr>
								<td class="font-semibold">
									<div class="flex items-center">
										<div class="h-80px w-60px rounded bg-gray-100 mr-3"></div>
										Banana
									</div>
								</td>
								<td>Fruit</td>
								<td>$ 3,000</td>
								<td>Pcs</td>
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
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};
