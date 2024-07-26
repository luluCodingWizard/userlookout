import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import SearchIcon from "../icons/SearchIcon";

const SearchUser = () => {
  const { state, setUsername, searchUser } = useContext(UserContext);
  const handleOnChange = (e) => {
    setUsername(e.target.value);
  };
  return (
    <div className="flex items-center  mt-24 bg-white-light-mode dark:bg-navy shadow-sm h-[70px] rounded-md relative">
      <SearchIcon className=" mx-4 inline-block text-gray-400" size={20} />

      <input
        type="text"
        value={state.username}
        onChange={handleOnChange}
        placeholder="Enter GitHub username"
        className="h-full mr-auto focus:outline-none w-full bg-transparent"
      />

      {state.error && <p className="  text-red-500 w-36 ">{state.error}</p>}
      <button
        disabled={state.loading}
        onClick={searchUser}
        className="ml-auto disabled:bg-gray bg-blue hover:bg-blue-light h-[50px] rounded-md text-white p-4"
      >
        Search
      </button>
    </div>
  );
};

export default SearchUser;
