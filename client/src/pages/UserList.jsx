import { useState, useEffect } from 'react';
import { Button,BigSpinner } from '../components';
import SignUp from './SignUp';
import { Drawer } from '../ui';
import useGetUsers from '../api/users/useGetUsers';

const UserList = () => {
  const {error,loading, members, fetchMembers} = useGetUsers();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <div className="p-8">
        <h1 className="font-semibold pb-4">List of Users</h1>

        {loading ? (
                  <div className="flex justify-center items-center  min-h-[calc(100vh-190px)]">
                  <BigSpinner />
                </div>
        ) : error ? (
          <div className="flex justify-center items-center  min-h-[calc(100vh-190px)]">Something went wrong: {error.message}</div>
        ) : (
          <table className="table table-zebra bg-white0">
            <thead className='text-center font-semibold text-base p-4'>
              <tr>
                <th>Profile Picture</th>
                <th>Username</th>
                <th>Role</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr className="hover:bg-gray0 duration-500 ease-out" key={member._id}>
                  <td className="flex justify-center p-2">
                    <img src={member.profilePicture} alt={member.username} className="h-10 w-10 rounded-full" />
                  </td>
                  <td className="text-center">{member.username}</td>
                  <td className="text-center">{member.role}</td>
                  <td className="text-center">{member.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      <div className="mt-4">
      <Button variant="primary"  onClick={handleDrawerOpen}>
        Add user
      </Button>
      </div>
      <Drawer isOpen={drawerOpen} onClose={handleDrawerClose}>
        <SignUp handleDrawerClose={handleDrawerClose} />
      </Drawer>
      </div>
    </>
  );
};

export default UserList;
