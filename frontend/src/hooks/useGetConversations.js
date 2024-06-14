import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';  // Ensure you have toast imported

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/users');
                if (!res.ok) {
                    throw new Error('Failed to fetch conversations');
                }
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getConversations();
    }, []); // Added an empty dependency array to ensure the effect runs only once

    return { loading, conversations };
};

export default useGetConversations;
