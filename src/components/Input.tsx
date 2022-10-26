import { For, JSX, Show } from 'solid-js';

export const Input = ({
	label,
	...other
}: JSX.InputHTMLAttributes<HTMLInputElement> & { label?: string }) => {
	return (
		<div class="mb-3">
			<Label>{label}</Label>
			<input
				{...other}
				class="w-full rounded focus:(ring-2 ring-primary border-green-500) outline-none border border-gray-100 transition min-h-10 p-2"
			/>
		</div>
	);
};

export const Select = ({
	label,
	items,
	...other
}: JSX.SelectHTMLAttributes<HTMLSelectElement> & {
	label?: string;
	items: Array<{
		text: string;
		value: string;
	}>;
}) => {
	return (
		<div class="mb-3">
			<Label>{label}</Label>
			<select
				{...other}
				class="w-full rounded focus:(ring-2 ring-primary border-green-500) outline-none border border-gray-100 transition min-h-10 p-2"
			>
				<For each={items}>{(item) => <option value={item.value}>{item.text}</option>}</For>
			</select>
		</div>
	);
};

export const Textarea = ({
	label,
	...other
}: JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) => {
	return (
		<div class="mb-3">
			<Label>{label}</Label>
			<textarea
				class="w-full rounded focus:(ring-2 ring-primary border-green-500) outline-none border border-gray-100 transition min-h-10 p-2 resize-none"
				{...other}
				placeholder="Masukkan Alamat"
			></textarea>
		</div>
	);
};

const Label = ({ children }: any) => {
	return (
		<Show when={!!children}>
			<span class="mb-1">{children}</span>
		</Show>
	);
};
