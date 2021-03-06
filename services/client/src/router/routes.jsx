import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import { DogsPage } from 'pages/DogsPage/DogsPage';
import { AboutPage } from 'pages/AboutPage/AboutPage';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { StatusPage } from 'pages/StatusPage/StatusPage';
import { UsersListPage } from 'pages/UsersListPage/UsersListPage';
import { Layout } from 'components/Layout/Layout';
import { Flask } from 'pages/Flask/FlaskPage';

const routes = [
    {
		path: '/',
		exact: true,
		component: DogsPage,
	},
    {
        path: '/about',
        exact: true,
        component: AboutPage
    },
    {
        path: '/register',
        exact: true,
        component: RegisterPage
    },
    {
        path: '/login',
        exact: true,
        component: LoginPage
    },
    {
        path: '/status',
        exact: true,
        component: StatusPage
    },
    {
        path: '/users',
        exact: true,
        component: UsersListPage,
    }
]

export const Routes = () => {
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} exact={route.exact} element={<Layout><route.component /></Layout>} />
            ))}
            <Route path="*" element={<div>Page Not Found</div>}/>
        </Switch>
    )
}
