import React from "react";

import NavBar from "components/NavBar/NavBar";
import { Routes } from 'router/routes';

import 'antd/dist/antd.css';
import './App.css';

const App = () => {
    return (
		<div className="layout">
			<NavBar />
			<Routes />
		</div>
    );
}

export default App;
