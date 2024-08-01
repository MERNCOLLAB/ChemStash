import { useState } from "react";

const useUpdateMap = () => {
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const updateMap = async (formData) => {
        try {
            const res = await fetch(`/api/map/update`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            const data = await res.json();
            if (!res.ok) {
              throw new Error(data.message || 'Failed to update map image');
            }
      
            setUpdateSuccess(true);
          } catch (error) {
            setError(error);
          }
        };
     return {updateSuccess, updateMap}; 
}


export default useUpdateMap;
