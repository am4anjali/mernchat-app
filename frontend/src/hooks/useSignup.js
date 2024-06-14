import toast from 'react-hot-toast';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    // Validate input fields
    const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
    if (!success) return;

    setLoading(true);
    try {
      // Perform signup request to the backend
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Signup failed');
      }

      const data = await res.json();

      // Store user data in local storage
      localStorage.setItem("chat-user", JSON.stringify(data));

      // Update user context
      setAuthUser(data);

      toast.success('Signup successful');
    } catch (error) {
      if (error instanceof SyntaxError) {
        toast.error('Failed to parse response');
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Input validation function
  function handleInputErrors  ({ fullName, username, password, confirmPassword, gender })  {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      toast.error('Please fill in all the fields');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  return { loading, signup };
};

export default useSignup;