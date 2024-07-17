import { useState } from 'react';

const useGetUsers = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/manager/members');
      if (!response.ok) {
        throw new Error('Failed to fetch members');
      }
      const data = await response.json();
      setMembers(data);
    } catch (error) {

      setError(true);
    }finally{
      setLoading(false);
    }
  };

  return { loading, error, members, fetchMembers };
};
export default useGetUsers;
