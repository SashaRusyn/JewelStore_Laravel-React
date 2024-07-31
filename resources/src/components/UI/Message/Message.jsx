import React from "react";
import { useMessageContext } from "../../../context/MessageContext";

const Message = () => {
    const { message, setMessage } = useMessageContext();

    {
        return message
            ? <div className="message">
                <span>{message}</span>
                <i className="fas fa-times" onClick={() => setMessage("")}></i>
            </div>
            : <div></div>
    }
}

export default Message;