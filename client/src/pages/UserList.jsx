import { useState, useEffect } from 'react';
import { Button, BigSpinner, SearchInput } from '../components';
import { useSelector } from 'react-redux';
import SignUp from './SignUp';
import { Drawer } from '../ui';
import useGetUsers from '../api/users/useGetUsers';

const UserList = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { error, loading, members, fetchMembers } = useGetUsers();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchUser, setSearchUser] = useState([]);
  useEffect(() => {
    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSearchUser(members);
  }, [members]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <div className=" ">
        <div className=" bg-transparent  bg-white1 sticky top-0 p-2 z-10">
          <h1 className="font-semibold pb-2">List of Users</h1>
          <div className="flex gap-2  justify-between items-center">
            <SearchInput members={members} setSearchUser={setSearchUser}/>
            {  currentUser.role === 'manager' || currentUser.role === 'tl' ?
            ( <Button variant="primary" onClick={handleDrawerOpen}>
                Add user
              </Button>) : null
            }
          </div>
          <hr className="bg-gray1 my-4" />
        </div>

        {loading ? (
          <div className="flex justify-center items-center  min-h-[calc(100vh-190px)]">
            <BigSpinner />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center  min-h-[calc(100vh-190px)]">
            Something went wrong: {error.message}
          </div>
        ) : (
          <div className="grid grid-cols-6  gap-2  justify-center max-h-[calc(100vh-250px)] h-full p-4 -z-10 overflow-y-scroll ">
            <>
              {searchUser.map((member) => (
                <div className="card card-compact bg-base-100 shadow-md w-full" key={member._id}>
                  <figure>
                    <img className="" src={member.profilePicture} />
                  </figure>
                  <div className="card-body">
                    <div className="grid">
                      <p>{member.username}</p>
                      <small className="text-gray1">{member.role}</small>
                    </div>
                    <div className="grid">
                      <p className="">{member.email}</p>
                      <small className="text-gray1">Email</small>
                    </div>
                  </div>
                </div>
              ))}
            </>
          </div>
        )}

        <Drawer isOpen={drawerOpen} onClose={handleDrawerClose}>
          <SignUp handleDrawerClose={handleDrawerClose} />
        </Drawer>
      </div>
    </>
  );
};

export default UserList;
