import axios from 'axios';

export const http = axios.create({
	baseURL: (window as any).apiURL || 'http://localhost:8000',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export const auth = {
	id: localStorage.getItem('id'),
	role: localStorage.getItem('role'),
};

export const showSnackbar = (content: any, color: string = '') => {
	const snackbar = document.createElement('div');
	snackbar.innerHTML = `
	<div class="fixed top-0 left-0 right-0 flex justify-center p-5 animate-down">
			<div class="lg:w-550px w-full text-white p-4 rounded shadow shadow-lg ${color || 'bg-primary'}">
				${content}
			</div>
		</div>
		`;
	setTimeout(() => {
		snackbar.remove();
	}, 3000);
	document.body.append(snackbar);
};
