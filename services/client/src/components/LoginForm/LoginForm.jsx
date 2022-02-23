import React, { useContext } from "react";
import { Form, Button, Input } from "antd";
import { Navigate } from "react-router-dom";
import { AuthContext } from "context/authContext";

import { Card } from "../Card/Card";

import "./LoginForm.css";

const LoginForm = () => {
	const {handleLoginFormSubmit, getIsAuthenticated} = useContext(AuthContext);

	if (getIsAuthenticated()) {
		return <Navigate to="/" replace />;
	}
	return (
		<div className="login-form">
			<h2 className="title">Log In to Flask App</h2>

			<Card className="login-form-card">
				<Form onFinish={handleLoginFormSubmit} layout="vertical">
					<Form.Item 
						label="Email" 
						name="email" 
						rules={[{ required: true, message: 'Please enter your email' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item 
						label="Password" 
						name="password"
						rules={[{ required: true, message: 'Please enter your password' }]}
					>
						<Input type="password" />
					</Form.Item>

					<div className="login-button">
						<Button style={{ width: '200px', marginTop: '1rem' }} type="primary" htmlType="submit" size="large">
							Login
						</Button>
					</div>
				</Form>
			</Card>
		</div>
	);
};

export default LoginForm;
