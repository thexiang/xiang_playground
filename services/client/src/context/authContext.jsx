import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from "axios";
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
    accessToken: null,
    handleRegisterFormSubmit: () => {},
    getIsAuthenticated: () => {},
    handleLoginFormSubmit: () => {},
    logoutUser: () => {},
    isAuthenticated: true,
    isSubmitting: false,
});

export const AuthProvider = (props) => {
    const [accessToken, setAccessToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true); //TODO: change to false after fix login
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const validRefresh = () => {
      const token = window.localStorage.getItem("refreshToken");
      if (token) {
        axios
          .post(`${process.env.REACT_APP_API_SERVICE_URL}/auth/refresh`, {
            refresh_token: token,
          })
          .then((res) => {
            setAccessToken(res.data.access_token);
            window.localStorage.setItem("refreshToken", res.data.refresh_token);
            return true;
          })
          .catch((err) => {
            return false;
          });
      }
      return false;
    }

    const handleRegisterFormSubmit = async (data) => {
        const url = `${process.env.REACT_APP_API_SERVICE_URL}/auth/register`;
        setIsSubmitting(true);
        try {
          axios.post(url, data);
          notification.success({
            message: 'Register Success!',
            description:
              'You can now using login form to access Flask app',
          });
          navigate('/login')
        } catch (err) {
          console.error(err);
        } finally {
          setIsSubmitting(false);
        }
    };

    const getIsAuthenticated = () => {
        if (accessToken || validRefresh()) {
          return true;
        }
        
        return false;
    };

    const handleLoginFormSubmit = async (data) => {
        const url = `${process.env.REACT_APP_API_SERVICE_URL}/auth/login`;
        setIsSubmitting(true)
        try {
          const res = await axios.post(url, data)
          setAccessToken(res.data.access_token)
          window.localStorage.setItem("refreshToken", res.data.refresh_token);

          notification.success({
            message: 'Login Success!'
          });

        } catch (err) {
          console.error(err);
        } finally {
          setIsSubmitting(false);
        }
    };

    const logoutUser = () => {
      window.localStorage.removeItem("refreshToken");
      setAccessToken(null);
      navigate('/');
      notification.success({
        message: 'Logout Success!'
      });
    };

  useEffect(() => {
    validRefresh()
  }, [])

	return (
		<AuthContext.Provider
			value={{
                accessToken,
                handleRegisterFormSubmit,
                getIsAuthenticated,
                handleLoginFormSubmit,
                logoutUser,
                isAuthenticated,
                isSubmitting,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};