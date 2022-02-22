import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { AuthContext } from "context/authContext";

const UserStatus = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const { getIsAuthenticated, accessToken } = useContext(AuthContext);

  const getUserStatus = (event) => {
    const options = {
      url: `${process.env.REACT_APP_API_SERVICE_URL}/auth/status`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    return axios(options)
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);

      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getUserStatus()
  }, []);

    if (!getIsAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    return (
      <div>
        <ul>
          <li>
            <strong>Email:</strong>&nbsp;
            <span data-testid="user-email">{email}</span>
          </li>
          <li>
            <strong>Username:</strong>&nbsp;
            <span data-testid="user-username">{username}</span>
          </li>
        </ul>
      </div>
    );
  }

export default UserStatus;
