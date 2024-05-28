import { useState, useEffect } from "react";


const UserList = () => {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/user/manager/members", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setMembers(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error);
            }
        };
        fetchMembers();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="text-center">
                <h1>List of Users</h1>
            </div>
            {loading ? (<div>Loading...</div>) :
                error ? (<div>Something went wrong, {error.message}</div>) :
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th>Profile Picture</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr key={member._id}>
                                    <td className="flex justify-center p-2">
                                        <img src={member.profilePicture}
                                            alt={member.username}
                                            className="size-10 rounded-full" />
                                    </td>
                                    <td className="text-center">{member.username}</td>
                                    <td className="text-center">{member.role}</td>
                                    <td className="text-center">{member.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
        </div>
    )
};

export default UserList;