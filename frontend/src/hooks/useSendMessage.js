import { useState } from 'react';
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (messageContent) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: messageContent }) // Assuming 'messageContent' is the content of the message
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            
            setMessages([...messages, data]); // Assuming 'data' is the newly added message object

            
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
