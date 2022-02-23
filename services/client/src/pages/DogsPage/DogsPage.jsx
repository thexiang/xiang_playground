import React, { useState } from 'react';
import { Button, Modal } from 'antd';

import AddDog from 'components/AddDog';
import UsersList from 'components/UsersList';


export const DogsPage = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <div>
			<Button
				onClick={() => setIsModalVisible(true)}
				style={{ margin: '2rem auto'}}
				type="primary"
			>
				Add Dog
			</Button>

			<UsersList />

			<Modal closable={false} visible={isModalVisible} footer={null}>
				<AddDog onCancel={() => setIsModalVisible(false)} />
			</Modal>
		</div>

    )
}