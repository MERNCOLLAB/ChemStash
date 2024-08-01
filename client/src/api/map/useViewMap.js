import { useState } from "react"

const useViewMap = () => {
    const [map, setMap] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(null);

    const viewMap = async () => {
    try {
        setLoading(true);
        const res = await fetch('/api/map/viewmap');
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'Failed to fetch map data');
        }
        setMap(data);
        } catch (error) {

        setError(error.message || 'Failed to fetch map data');
        }
        finally{
            setLoading(false);
        }
    };

    return {loading,error,map, viewMap};
}
export default useViewMap;
