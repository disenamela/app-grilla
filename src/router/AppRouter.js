import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

//pages
import GrillaApp from '../pages/GrillaApp';
import NotFound from '../pages/NotFound';

const AppRouter = () => (
    <BrowserRouter>
		<Switch>
			<Route path="/grilla" component={GrillaApp}/>
			<Route component={NotFound} />
		</Switch>
    </BrowserRouter>
);

export default AppRouter;