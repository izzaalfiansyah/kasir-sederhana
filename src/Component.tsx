import { Component } from 'solid-js';

export const Modal: Component = () => {
	return (
		<div class="z-30 fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 flex items-center justify-center">
			<div class="bg-white rounded shadow p-4 max-w-550px"></div>
		</div>
	);
};
