import { Component } from 'solid-js';

export const Account: Component = () => {
	return (
		<div class="bg-white rounded shadow p-6">
			<div class="flex flex-wrap -mx-2">
				<div class="mb-3 lg:w-1/2 w-full px-2">
					<span class="mb-1">Name</span>
					<input type="text" class="input" placeholder="Enter Name" />
				</div>
				<div class="mb-3 lg:w-1/2 w-full px-2">
					<span class="mb-1">Phone Number</span>
					<input type="tel" class="input" placeholder="Enter Phone Number" />
				</div>
			</div>
			<div class="mb-3">
				<span class="mb-1">Address</span>
				<textarea rows="3" class="input resize-none" placeholder="Enter Address"></textarea>
			</div>
			<div class="mb-3">
				<span class="mb-1">Username</span>
				<input type="text" class="input" placeholder="Enter Username" />
			</div>
			<div class="mb-3">
				<span class="mb-1">Password</span>
				<input type="password" class="input" placeholder="Enter Password" />
				<div class="text-xs text-gray-400">
					You can denied this field if don't want to change password
				</div>
			</div>
			<div class="mt-10">
				<button type="submit" class="btn bg-primary hover:bg-secondary">
					SAVE MY ACCOUNT
				</button>
			</div>
		</div>
	);
};
