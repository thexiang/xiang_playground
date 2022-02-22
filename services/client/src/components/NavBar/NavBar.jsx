import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from 'antd';

import { AuthContext } from "context/authContext";
import { UsersContext } from "context/usersContext";

import "./NavBar.css";

const NavBar = () => {
  const { getIsAuthenticated, logoutUser } = useContext(AuthContext);
  const { title } = useContext(UsersContext);

	return (
		<Menu mode="vertical" defaultValue={['home']}>
      <Menu.Item key="home">
				<Link to="/" className="navbar-item" data-testid="nav-about">
					Home
				</Link>
			</Menu.Item>

			<Menu.Item key="about">
				<Link to="/about" className="navbar-item" data-testid="nav-about">
					About
				</Link>
			</Menu.Item>

			{getIsAuthenticated() ? (
				<>
					<Menu.Item key="status">
						<Link to="/status" className="navbar-item" data-testid="nav-status">
							User Status
						</Link>
					</Menu.Item>
					<Menu.Item key="logout">
						<div onClick={logoutUser}>
							Logout
						</div>		
					</Menu.Item>
				</>
			) : (
				<>
				<Menu.Item key="register">
					<Link to="/register" className="navbar-item" data-testid="nav-register">
						Register
					</Link>
				</Menu.Item>

				<Menu.Item key="login">
					<Link to="/login" className="navbar-item" data-testid="nav-login">
						Log In
					</Link>
				</Menu.Item>
				</>
			)}
		</Menu>
	);
};

export default NavBar;
