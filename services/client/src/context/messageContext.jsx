import React, { useState, createContext } from 'react';

export const MessageContext = createContext({
    messageType: null,
    messageText: null,
    createMessage: () => {},
    removeMessage: () => {},
});

export const MessageProvider = (props) => {
	const [messageType, setMessageType] = useState(null);
    const [messageText, setMessageText] = useState(null);

    const removeMessage = () => {
        setMessageType(null);
        setMessageText(null);
	};
   
    const createMessage = (type, text) => {
        setMessageType(type);
        setMessageText(text);

		setTimeout(() => {
			removeMessage();
		}, 3000);
	};

	return (
		<MessageContext.Provider
			value={{
				messageType,
                messageText,
                createMessage,
                removeMessage,
			}}
		>
			{props.children}
		</MessageContext.Provider>
	);
};
