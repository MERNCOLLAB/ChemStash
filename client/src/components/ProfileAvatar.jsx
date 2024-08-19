import { useSelector } from 'react-redux';

const ProfileAvatar = ({ handleChangeImage, fileRef, formData }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="mx-auto md:mx-20">
      <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleChangeImage} />
      <div onClick={() => fileRef.current.click()} className="group relative">
        <img
          className="size-[200px] group-hover:opacity-20 self-center cursor-pointer rounded-full object-cover"
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
        />
        <p className="opacity-0 group-hover:opacity-100 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Change
        </p>
      </div>
    </div>
  );
};

export default ProfileAvatar;
