import React, { useContext } from "react";
import { MessageContext } from "context/messageContext";

const style = {
  top: "auto",
};

const Message = () => {
	const {messageType, messageText, removeMessage} = useContext(MessageContext);

	if (!messageType && !messageText) {
		return null;
	}

	return (
		<section data-testid="message">
			<div className={`notification is-${messageType}`}>
			<button
				className="delete"
				style={style}
				onClick={removeMessage}
			/>
			<span className="message-text">{messageText}</span>
			</div>
		</section>
	);
};

export default Message;
