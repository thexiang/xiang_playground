import React, { useContext } from "react";
import { UsersContext } from "context/usersContext";
import { AuthContext } from "context/authContext";
import { Card } from "./Card/Card";
import { TwoColumn } from "./Layout/TwoColumn";

const UsersList = () => {
	const { usersArr, dogs, removeUser } = useContext(UsersContext);
	const { getIsAuthenticated } = useContext(AuthContext);
	
	return (
		<TwoColumn>
			<>
				<Card>
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
						{dogs.map((user) => {
						return (
							<tr key={user.name}>
							<td>{user.nickName}</td>
							<td>{user.age}</td>
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
				</Card>
				<Card>
					111
				</Card>
			</>
		</TwoColumn>
	);
};

export default UsersList;
