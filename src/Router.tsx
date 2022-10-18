import { Route, Routes } from '@solidjs/router';
import { Component } from 'solid-js';
import { Account } from './views/Account';
import { Home } from './views/Home';
import { Product } from './views/Product';
import { Report } from './views/Report';
import { Transaction } from './views/Transaction';
import { User } from './views/User';

export const Router: Component = () => {
	return (
		<Routes>
			<Route path={'/'} component={Home}></Route>
			<Route path={'/user'} component={User}></Route>
			<Route path={'/product'} component={Product}></Route>
			<Route path={'/transaction'} component={Transaction}></Route>
			<Route path={'/account'} component={Account}></Route>
			<Route path={'/report'} component={Report}></Route>
		</Routes>
	);
};
