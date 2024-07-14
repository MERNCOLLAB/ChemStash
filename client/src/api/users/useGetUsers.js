import { useState } from 'react';

const useGetUsers = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/manager/members', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch members');
      }
      const data = await response.json();
      setMembers(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return { loading, error, members, fetchMembers };
};
export default useGetUsers;
