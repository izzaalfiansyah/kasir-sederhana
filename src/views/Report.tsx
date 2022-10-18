import { Component } from 'solid-js';

export const Report: Component = () => {
	return (
		<>
			<div class="bg-white rounded p-6 shadow max-w-550px mb-5">
				<div class="mb-3">
					<span class="mb-1">Start Date</span>
					<input type="date" class="input" />
				</div>
				<div class="mb-3">
					<span class="mb-1">End Date</span>
					<input type="date" class="input" />
				</div>
				<div class="mt-8">
					<button type="submit" class="btn bg-primary hover:bg-secondary">
						SEARCH
					</button>
				</div>
			</div>
			<div class="bg-white rounded p-6 shadow">
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
								<td colspan="5" class="text-center">
									data not found
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};
