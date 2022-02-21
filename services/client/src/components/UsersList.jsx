import React, { useContext } from "react";
import { UsersContext } from "context/usersContext";
import { AuthContext } from "context/authContext";

const UsersList = () => {
	const { usersArr, removeUser } = useContext(UsersContext);
	const { getIsAuthenticated } = useContext(AuthContext);
	
	return (
		<div>
			<table className="table is-hoverable is-fullwidth">
			<thead>
				<tr>
				<th>ID</th>
				<th>Email</th>
				<th>Username</th>
				{getIsAuthenticated() && <th />}
				</tr>
			</thead>
			<tbody>
				{usersArr.map((user) => {
				return (
					<tr key={user.id}>
					<td>{user.id}</td>
					<td>{user.email}</td>
					<td className="username">{user.username}</td>
					{getIsAuthenticated() && (
						<td>
						<button
							className="button is-danger is-small"
							onClick={() => removeUser(user.id)}
						>
							Delete
						</button>
						</td>
					)}
					</tr>
				);
				})}
			</tbody>
			</table>
		</div>
	);
};

export default UsersList;
