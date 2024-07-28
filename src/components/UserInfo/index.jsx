import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const UserInfo = () => {
  const { state } = useContext(UserContext);
  const { user } = state;
  if (!user) {
    return (
      <div className="mt-4 p-4 bg-white dark:bg-navy rounded-md shadow-sm">
        <p className="text-gray-500">No user information available.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-white dark:bg-navy rounded-md shadow-sm">
      <div className="flex ">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4 w-full">
          {user.name && (
            <h2 className="text-xxl font-bold text-black-light-mode">
              {user.name}
            </h2>
          )}

          <p className="text-blue text-lg">@{user.login}</p>
          <p>{user.bio}</p>
          <div className=" flex bg-light-gray rounded-lg w-ful p-5 place-content-between text-center mt-5">
            <p>
              <strong>Followers:</strong>
              <br /> {user.followers}
            </p>
            <p>
              <strong>Following:</strong>
              <br /> {user.following}
            </p>
            <p>
              <strong>Public Repos:</strong>
              <br /> {user.public_repos}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
