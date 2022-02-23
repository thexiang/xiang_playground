import React, { useState, createContext, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthContext } from './authContext';
import { MessageContext } from './messageContext';

export const UsersContext = createContext({
    usersArr: [],
    dogs: [],
    title: 'Miya Playground',
    getUsers: () => {},
    addDog: () => {},
    removeUser: () => {},
    deleteDog: () => {},
    updateDog: () => {},
    isLoadingDogs: false,
});

export const UsersProvider = (props) => {
	const [usersArr, setUsersArr] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [title, setTitle] = useState('Miya Playground');
    const [isLoadingDogs, setIsLoadingDogs] = useState(false);

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
        setIsLoadingDogs(true);
        try {
            const res = await axios.get(`${process.env.REACT_APP_NODE_DOG_API_URL}/dogs`);
            setDogs(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoadingDogs(false);
        }
    }

    const updateDog = async (id, data) => {
        try {
            await axios.patch(`${process.env.REACT_APP_NODE_DOG_API_URL}/dog/update/${id}`, data);
            getDogs();
        } catch (err) {
            console.error(err);
        }
    }

    const deleteDog = async (id) => {
        console.log(id);
        try {
            await axios.delete(`${process.env.REACT_APP_NODE_DOG_API_URL}/dog/delete/${id}`);
            getDogs();
        } catch (err) {
            console.error(`Error deleting dog: dog id ${id}`);
        }    
    }


    // TODO: refactor to async
    const addDog = async (data) => {
        console.log(data);
        try {
            await axios.post(`${process.env.REACT_APP_NODE_DOG_API_URL}/dog/add`, data);
            getDogs();
        } catch (err) {
            console.error(err);
        }
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
                addDog,
                removeUser,
                deleteDog,
                updateDog,
                isLoadingDogs,
			}}
		>
			{props.children}
		</UsersContext.Provider>
	);
};
