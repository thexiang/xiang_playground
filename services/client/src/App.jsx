import React from "react";

import Message from "components/Message";
import NavBar from "components/NavBar";

import { Routes } from 'router/routes';

const App = () => {
    return (
		<div>
			<NavBar />
			<section className="section">
				<div className="container">
					<Message />
					<Routes />
				</div>
			</section>
		</div>
    );
}

export default App;
