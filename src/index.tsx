/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';

import '@fortawesome/fontawesome-free/css/all.css';
import 'virtual:windi.css';
import './index.css';

import { App } from './App';

render(
	() => (
		<Router>
			<App></App>
		</Router>
	),
	document.getElementById('root') as HTMLElement,
);
