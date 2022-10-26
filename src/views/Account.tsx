import { Component, createSignal, onMount } from 'solid-js';
import { Input, Textarea } from '../components/Input';
import { auth, http, showSnackbar } from '../lib';
import { User } from './User';

export const Account: Component = () => {
	const [data, setData] = createSignal<User>();

	async function get() {
		await setData({});
		const { data } = await http.get('/user/' + auth.id);
		setData(data);
		handleData('password', '');
	}

	async function update(e: any) {
		e.preventDefault();

		try {
			await http.put('/user/' + auth.id, data());
			showSnackbar('data berhasil diedit');
			get();
		} catch (err: any) {
			showSnackbar(err.response.data, 'bg-red-400');
		}
	}

	function handleData(key: any, value: any) {
		setData((item) => {
			(item as any)[key] = value;
			return item;
		});
	}

	onMount(() => {
		get();
	});

	return (
		<form onSubmit={update} class="bg-white rounded shadow p-6">
			<div class="flex flex-wrap -mx-2">
				<div class="lg:w-1/2 w-full px-2">
					<Input
						label="Nama"
						placeholder="Masukkan Nama"
						value={data()?.nama}
						onInput={(e) => handleData('nama', e.currentTarget.value)}
					/>
				</div>
				<div class="lg:w-1/2 w-full px-2">
					<Input
						label="Nomor Telepon"
						type="tel"
						placeholder="Masukkan Nomor Telepon"
						onInput={(e) => handleData('telepon', e.currentTarget.value)}
						value={data()?.telepon}
					/>
				</div>
			</div>
			<Textarea
				rows="3"
				label="Alamat"
				value={data()?.alamat}
				onInput={(e) => handleData('alamat', e.currentTarget.value)}
				placeholder="Masukkan Alamat"
			/>
			<Input
				type="text"
				label="Username"
				placeholder="Masukkan Username"
				onInput={(e) => handleData('username', e.currentTarget.value)}
				value={data()?.username}
			/>
			<Input
				label="Password"
				type="password"
				onInput={(e) => handleData('password', e.currentTarget.value)}
				placeholder="Masukkan Password"
			/>
			<div class="text-xs text-gray-400 -mt-3">Kosongkan jika tidak ingin mengganti password</div>
			<div class="mt-10">
				<button type="submit" class="btn bg-primary hover:bg-secondary">
					SIMPAN AKUN
				</button>
			</div>
		</form>
	);
};
