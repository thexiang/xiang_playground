import React, { useState, createContext, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthContext } from './authContext';
import { MessageContext } from './messageContext';

export const UsersContext = createContext({
    usersArr: [],
    dogs: [],
    title: 'Miya Playground',
    getUsers: () => {},
    addUser: () => {},
    removeUser: () => {},
});

export const UsersProvider = (props) => {
	const [usersArr, setUsersArr] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [title, setTitle] = useState('Miya Playground');

    // TODO: move to another context?
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

    const { accessToken } = useContext(AuthContext);
    const { createMessage } = useContext(MessageContext);

    const getUsers = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_SERVICE_URL}/users`)
            setUsersArr(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    const getDogs = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_NODE_DOG_API_URL}/dogs`);
            setDogs(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    const resetForm = () => {
        setUserName('');
        setEmail('');
    }

    // TODO: refactor to async
    const addUser = (data) => {
        axios
            .post(`${process.env.REACT_APP_API_SERVICE_URL}/users`, data)
            .then((res) => {
                getUsers();
                resetForm();
                createMessage("success", "User added.");
            })
            .catch((err) => {
                console.log(err);
                createMessage("danger", "That user already exists.");
            });
    };

    // TODO: refactor to async
    const removeUser = (user_id) => {
        axios
          .delete(`${process.env.REACT_APP_API_SERVICE_URL}/users/${user_id}`)
          .then((res) => {
            getUsers();
            createMessage("success", "User removed.");
          })
          .catch((err) => {
            console.error(err);
            createMessage("danger", "Something went wrong.");
          });
    };

    useEffect(() => {
        getDogs();
        getUsers();
    }, [])

    useEffect(() => {
        getUsers();
    }, [accessToken]);

	return (
		<UsersContext.Provider
			value={{
				usersArr,
                dogs,
                title,
                getUsers,
                addUser,
                removeUser,
			}}
		>
			{props.children}
		</UsersContext.Provider>
	);
};
