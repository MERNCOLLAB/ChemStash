import {  useRef } from 'react';
import { Button } from '../components';
import { useSelector } from 'react-redux';
import useUploadMap from '../hooks/map/useUploadMap';

function Map() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const {   
    imagePercent,
    imageError,
    map,
    uploadedImageURL,
    handleChange, 
    handleSubmit, 
    } = useUploadMap();
 
  return (
    <div className='p-4 max-w-[90%] mx-auto'>
      <h1 className="text-3xl font-bold mt-4 mb-8">Laboratory Map</h1>
      <form onSubmit={handleSubmit}>
        {currentUser.role === 'manager' || currentUser.role === 'tl' ? (
          <>
            <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleChange} />
            <div
              onClick={() => fileRef.current.click()}
              className="group relative mx-auto w-full rounded-full cursor-pointer"
              style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <img className=" w-full " src={uploadedImageURL || map[0]} alt="Map" />
              <p className="opacity-0 group-hover:opacity-100 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded">
                Change Map
              </p>
            </div>
          </>
        ) : (
          <div className="group relative mx-auto w-full rounded-full cursor-pointer">
            <img className="max-w-[80%] mx-auto" src={map[0]} alt="Map" />
          </div>
        )}

        <p className="text-center text-sm mt-4">
          {imageError ? (
            <span className="text-red-700">Error uploading image</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span>{`Uploading ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-emerald-700">Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        {currentUser.role === 'manager' || currentUser.role === 'tl' ? (
          <div className="mt-8 text-center">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        ) : (
          ''
        )}
      </form>
    </div>
  );
}

export default Map;
