import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
const SearchInput = ({members, setSearchUser}) => {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        const search = e.target.value;
        setSearch(search);
        const filteredUser = members.filter((user) => user.username.toLowerCase().includes(search.toLowerCase()));
        setSearchUser(filteredUser);
      };
    
  
    return (
    <div className="relative">
      <input 
      type="search"
      value={search}
      placeholder="Search for user"
      className="pl-10 py-2 w-50 rounded-lg shadow-sm border-blue1 focus:outline-none focus:ring-1 focus:ring-blue0" 
      onChange={handleSearch}
      />
      <div className="pl-3 absolute inset-y-0 left-0 flex items-center pointer-events-none">
        <IoSearchSharp size={24} />
      </div>
    </div>
  )
}

export default SearchInput;
