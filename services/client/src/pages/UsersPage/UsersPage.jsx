import React, { useContext, useState } from 'react';
import { Button, Modal } from 'antd';

import { AuthContext } from 'context/authContext';
import AddUser from 'components/AddUser';
import UsersList from 'components/UsersList';


export const UsersPage = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const { getIsAuthenticated } = useContext(AuthContext);

    return (
        <div>
			{/* <img src={coverPhoto} />  */}
			{getIsAuthenticated() && (
				<Button
					onClick={() => setIsModalVisible(true)}
					style={{ margin: '2rem auto'}}
				>
					Add User
				</Button>
			)}

			<UsersList />

			<Modal closable={false} visible={isModalVisible} footer={null}>
				<AddUser onCancel={() => setIsModalVisible(false)} />
			</Modal>
		</div>

    )
}