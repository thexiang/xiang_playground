import React, { useContext, useState } from "react";
import { Button, Input, InputNumber, Table } from 'antd';

import { UsersContext } from "context/usersContext";
import { AuthContext } from "context/authContext";
import { Card } from "./Card/Card";
import { TwoColumn } from "./Layout/TwoColumn";

const UsersList = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState(undefined);
	const [draftData, setDraftData] = useState({});

	const { dogs, deleteDog, updateDog, isLoadingDogs } = useContext(UsersContext);
	const { isAuthenticated } = useContext(AuthContext);

	const handleOnChange = (key, e) => {
		// InputNumber component's value returned directly from e
		const value = e?.target?.value ?? e;
		setDraftData({ ...draftData, [key]: value});
	}

	const handleClickEdit = (id) => {
		setIsEditing(!isEditing);
		setEditId(id);
	}

	const handleSave = (id) => {
		updateDog(id, draftData);
		setDraftData({});
		setIsEditing(false);
	}
	
	const columns = [
		{
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (_, record) => (
				<>
					{isEditing && editId === record.id 
						? <Input defaultValue={record.name} onChange={(e) => handleOnChange('name', e)} style={{ width: '100px' }} /> 
						: record.name
					}
				</>
			)
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
			render: (_, record) => (
				<>
					{isEditing && editId === record.id 
						? <InputNumber defaultValue={record.age} onChange={(e) => handleOnChange('age', e)} style={{ width: '100px' }} /> 
						: record.age
					}
				</>
			)
		}
	];

	const authenticatedCols = [
		{
			title: 'Action',
			dataIndex: 'edit',
			key: 'edit',
			render: (_, record) => {
				const isEditingThis = isEditing && editId === record.id;
				const handleClick = isEditingThis ? () => handleSave(record.id) : () => handleClickEdit(record.id);
				return (
					<>
						<Button onClick={handleClick} style={{ marginRight: '10px' }}>
							{isEditingThis ? 'Save' : 'Edit'}
						</Button>
						<Button danger onClick={() => deleteDog(record.id)}>Delete</Button>
					</>
				)
			}
		}
	]

	const cols = isAuthenticated ? [...columns, ...authenticatedCols] : columns;
	
	return (
		<TwoColumn>
			<>
				<Card>
					<Table dataSource={dogs} columns={cols} loading={isLoadingDogs} />
				</Card>

				<Card>
					Hello
				</Card>
			</>
		</TwoColumn>
	);
};

export default UsersList;
