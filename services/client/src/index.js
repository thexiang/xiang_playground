import { AuthProvider } from "context/authContext.jsx";
import { MessageProvider } from "context/messageContext.jsx";
import { UsersProvider } from "context/usersContext.jsx";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.jsx";
import 'antd/dist/antd.css';

ReactDOM.render(
	<Router>
		<MessageProvider>
			<AuthProvider>
				<UsersProvider>
					<App />
				</UsersProvider>
			</AuthProvider>
		</MessageProvider>
	</Router>,
	document.getElementById("root")
);
