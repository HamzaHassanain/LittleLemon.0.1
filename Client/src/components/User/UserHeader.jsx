import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
export default function UserHeader() {
  const navigate = useNavigate();
  const { user, removeUser } = useUser();
  async function handleLogout() {
    try {
      await removeUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="">
      <div className="user-header">
        <h2 className="welcome">Welcome {user?.user?.username}</h2>
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
