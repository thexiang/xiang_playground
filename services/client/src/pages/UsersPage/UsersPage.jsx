import React, { useContext, useState } from 'react';
import Modal from "react-modal";
import { Button } from 'antd';

import { AuthContext } from 'context/authContext';
import AddUser from 'components/AddUser';
import UsersList from 'components/UsersList';

import miyaPhoto from 'assets/miya.JPG';
import coverPhoto from 'assets/cover.png';

const modalStyles = {
	content: {
		top: "0",
		left: "0",
		right: "0",
		bottom: "0",
		border: 0,
		background: "transparent",
	},
};
  
Modal.setAppElement(document.getElementById("root"));
  

export const UsersPage = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const { getIsAuthenticated } = useContext(AuthContext);

    return (
        <div>
			{/* <img src={coverPhoto} />  */}
			{getIsAuthenticated() && (
				<Button
					onClick={() => setIsModalVisible(true)}
				>
					Add User
				</Button>
			)}
			<br />
			<br />
			<Modal
				isOpen={isModalVisible}
				style={modalStyles}
			>
				<div className="modal is-active">
				<div className="modal-background" />
				<div className="modal-card">
					<header className="modal-card-head">
					<p className="modal-card-title">Add User</p>
					<button
						className="delete"
						aria-label="close"
						onClick={() => setIsModalVisible(false)}
					/>
					</header>
					<section className="modal-card-body">
					<AddUser />
					</section>
				</div>
				</div>
			</Modal>

			<UsersList />
		</div>

    )
}