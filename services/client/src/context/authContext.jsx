import React, { useState, createContext, useContext } from 'react';
import axios from "axios";

import { MessageContext } from './messageContext';

export const AuthContext = createContext({
    accessToken: null,
    handleRegisterFormSubmit: () => {},
    getIsAuthenticated: () => {},
    handleLoginFormSubmit: () => {},
    logoutUser: () => {},
    isAuthenticated: true,
});

export const AuthProvider = (props) => {
    const [accessToken, setAccessToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true); //TODO: change to false after fix login

    const { createMessage } = useContext(MessageContext);

    const validRefresh = async () => {
        let isValid;
        try {
            const token = window.localStorage.getItem("refreshToken");
            if (token) {
                const res = await axios.post(`${process.env.REACT_APP_API_SERVICE_URL}/auth/refresh`, {
                                refresh_token: token,
                            })
                isValid = true;
                setAccessToken(res.data.access_token);
                window.localStorage.setItem("refreshToken", res.data.refresh_token);
            } else {
                isValid = false;
            }
        } catch (err) {
            console.error(err);
            isValid = false;
        } finally {
            return isValid;
        }
    }

    const handleRegisterFormSubmit = (data) => {
        const url = `${process.env.REACT_APP_API_SERVICE_URL}/auth/register`;
        axios
          .post(url, data)
          .then((res) => {
            createMessage("success", "You have registered successfully.");
          })
          .catch((err) => {
            console.error(err);
            createMessage("danger", "That user already exists.");
          });
    };

    const getIsAuthenticated = async () => {
        if (accessToken || validRefresh()) {
          return true;
        }
        return false;
    };

    const handleLoginFormSubmit = (data) => {
        const url = `${process.env.REACT_APP_API_SERVICE_URL}/auth/login`;
        axios
          .post(url, data)
          .then((res) => {
            setAccessToken(res.data.access_token)
            getUsers();
            window.localStorage.setItem("refreshToken", res.data.refresh_token);
            createMessage("success", "You have logged in successfully.");
          })
          .catch((err) => {
            console.error(err);
            createMessage("danger", "Incorrect email and/or password.");
          });
    };

    const logoutUser = () => {
		window.localStorage.removeItem("refreshToken");
        setAccessToken(null);
		createMessage("success", "You have logged out.");
	};

	return (
		<AuthContext.Provider
			value={{
                accessToken,
                handleRegisterFormSubmit,
                getIsAuthenticated,
                handleLoginFormSubmit,
                logoutUser,
                isAuthenticated,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};