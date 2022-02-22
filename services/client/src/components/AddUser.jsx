import React, { useContext, useState } from "react";
import { Form, Input, InputNumber, Button } from 'antd';

import { UsersContext } from "context/usersContext";

import "./form.css";

const AddUser = ({ onCancel }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { addDog } = useContext(UsersContext);

	const handleFinish = async (values) => {
		setIsSubmitting(true);
		try {
			await addDog(values);
			setIsSubmitting(false);
			onCancel();
		} catch (err) {
			console.error('Something went wrong when submitting dog');
		}
	}

	return (
		<>
			<h3>Add your puppy!</h3>
			<Form onFinish={handleFinish} disabled={isSubmitting}>
				<Form.Item 
					label="Name" 
					name="name" 
					rules={[{ required: true, message: 'Please enter puppy name' }]}
				>
					<Input style={{ width: '200px' }} />
				</Form.Item>

				<Form.Item 
					label="Age" 
					name="age"
					rules={[{ required: true, message: 'Please enter puppy age' }]}
				>
					<InputNumber style={{ width: '200px' }} />
				</Form.Item>

				<Button onClick={onCancel} disabled={isSubmitting} style={{ marginRight: '10px' }}>Cancel</Button>
				<Button type="primary" htmlType="submit" loading={isSubmitting} disabled={isSubmitting}>Submit</Button>
			</Form>
		</>
	)
};

export default AddUser;
