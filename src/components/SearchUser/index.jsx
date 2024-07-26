import React, { useState } from "react";
import axios from "axios";
import SearchIcon from "../icons/SearchIcon";

const SearchUser = () => {
  const [username, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // track user input
  const handleOnChange = (e) => {
    setUserName(e.target.value);
    setError("");
  };
  const handleSearch = async () => {
    setError("");
    setLoading(true);
    if (!username) {
      setError("Please enter a username");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      if (response.status === 200) {
        // User exists
        setError(""); // Clear the error message if the user exists
        // Handle the successful user fetch (e.g., display user data)
        console.log(response.data);
      }
    } catch {
      setError("No Results");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center  mt-24 bg-white-light-mode dark:bg-navy shadow-sm h-[70px] rounded-md relative">
      <SearchIcon className=" mx-4 inline-block text-gray-400" size={20} />

      <input
        type="text"
        value={username}
        onChange={handleOnChange}
        placeholder="Enter GitHub username"
        className="h-full mr-auto focus:outline-none w-full bg-transparent"
      />

      {error && <p className="  text-red-500 w-36 ">{error}</p>}
      <button
        disabled={loading}
        onClick={handleSearch}
        className="ml-auto disabled:bg-gray bg-blue hover:bg-blue-light h-[50px] rounded-md text-white p-4"
      >
        Search
      </button>
    </div>
  );
};

export default SearchUser;
