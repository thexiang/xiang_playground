import React, { useContext } from "react";
import { Form, Button, Input } from "antd";
import { Navigate } from "react-router-dom";

import { AuthContext } from "context/authContext";
import { Card } from "components/Card/Card";

// import "./form.css";

const RegisterForm = (props) => {
  const { handleRegisterFormSubmit, getIsAuthenticated, isSubmitting } = useContext(AuthContext);
  
  // if (getIsAuthenticated()) {
  //   return <Navigate to="/" replace />;
  // }

	return (
		<div className="login-form">
			<h2 className="title">Register for Flask</h2>

			<Card className="login-form-card" disabled={isSubmitting}>
				<Form onFinish={handleRegisterFormSubmit} layout="vertical">
					<Form.Item 
						label="Username" 
						name="username" 
						rules={[{ required: true, message: 'Please enter your username' }]}
					>
						<Input />
					</Form.Item>

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
						<Button
							style={{ width: '200px', marginTop: '1rem' }} 
							type="primary" 
							htmlType="submit" 
							size="large" 
							loading={isSubmitting} disabled={isSubmitting}
						>
							Register
						</Button>
					</div>
				</Form>
			</Card>
		</div>
	);
};


export default RegisterForm;
