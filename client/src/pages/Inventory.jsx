import { useEffect, useState } from "react";

function Inventory() {
  const [lists, setLists] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/chemical/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setLists(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    fetchList();
  }, []);

  return (
    <div className="flex flex-col ">
      <div className="">
        <h1>Chemical List</h1>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Something went wrong, {error.message}</div>
      ) : (
        <table className="w-full border-collapse border border-gray-500">
          <thead>
            <tr className="text-left uppercase">
              <th>name</th>
              <th>casNumber</th>
              <th>molecularFormula</th>
              <th>purity</th>
              <th>location</th>
              <th>supplier</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list) => (
              <tr key={list._id}>
                <td>{list.name}</td>
                <td>{list.casNumber}</td>
                <td>{list.molecularFormula}</td>
                <td>{list.location}</td>
                <td>{list.supplier}</td>
                <td>{list.purity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Inventory;
