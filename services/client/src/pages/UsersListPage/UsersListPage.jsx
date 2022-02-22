import React, { useContext } from 'react';
import { Table } from 'antd';

import { UsersContext } from "context/usersContext";

export const UsersListPage = () => {
    const { usersArr } = useContext(UsersContext);

    const columns = [
        {
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		},
        {
			title: 'Username',
			dataIndex: 'username',
			key: 'username',
		},
        {
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
        {
			title: 'Created Date',
			dataIndex: 'created_date',
			key: 'created_date',
		},
    ]
    return (
        <Table dataSource={usersArr} columns={columns} />
    )
}