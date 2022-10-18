import { Component } from 'solid-js';

export const User: Component = () => {
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
								<th>Name</th>
								<th>Username</th>
								<th>Phone Number</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="font-semibold">Muhammad Izza Alfiansyah</td>
								<td>izzaalfiansyah</td>
								<td>081231921351</td>
								<td class="text-right">
									<button class="btn bg-primary hover:bg-secondary mr-2">
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
								<td class="font-semibold">Amelia Ayu Safitri</td>
								<td>ameliaayu</td>
								<td>081259253376</td>
								<td class="text-right">
									<button class="btn bg-primary hover:bg-secondary mr-2">
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
								<td class="font-semibold">Mohammad Rafly Azzuhri</td>
								<td>rafflyazzuhri</td>
								<td>082330539264</td>
								<td class="text-right">
									<button class="btn bg-primary hover:bg-secondary mr-2">
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
								<td class="font-semibold">Ricky Ahmad Mahbubi</td>
								<td>rickymahbubi</td>
								<td>082330538264</td>
								<td class="text-right">
									<button class="btn bg-primary hover:bg-secondary mr-2">
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
