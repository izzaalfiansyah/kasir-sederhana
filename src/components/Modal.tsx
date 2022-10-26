import { JSX, Show } from 'solid-js';

export default ({ children, model }: JSX.HTMLAttributes<HTMLDivElement> & { model: any }) => {
	let el: any;

	function handleClick(e: any) {
		if (e.path.indexOf(el) < 0) {
			model[1](false);
		}
	}

	return (
		<Show when={model[0]()}>
			<div
				class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 flex lg:items-center items-end justify-center z-50 lg:p-5"
				onClick={handleClick}
			>
				<div
					class="bg-white rounded shadow p-6 lg:w-550px w-full lg:max-h-full max-h-[80%] overflow-y-auto relative animate-down"
					ref={el}
				>
					{children}
				</div>
			</div>
		</Show>
	);
};
