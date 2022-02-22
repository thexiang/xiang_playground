import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import { UsersPage } from 'pages/UsersPage/UsersPage';
import { AboutPage } from 'pages/AboutPage/AboutPage';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { StatusPage } from 'pages/StatusPage/StatusPage';
import { Layout } from 'components/Layout/Layout';

const routes = [
    {
		path: '/',
		exact: true,
		component: UsersPage,
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
    }
]

export const Routes = () => {
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} exact={route.exact} element={<Layout><route.component /></Layout>} />
            ))}
        </Switch>
    )
}
