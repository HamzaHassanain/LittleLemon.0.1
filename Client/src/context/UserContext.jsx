// user context

import React, { useState, createContext } from "react";
import { getUser, logout } from "../apis";
const UserContext = createContext();
const useUser = () => React.useContext(UserContext);
export { UserContext, useUser };

export default function UserProvider({ children }) {
  const [user, __setUser] = useState({
    user: {},
    token: localStorage.getItem("token"),
  });

  React.useEffect(() => {
    async function get_user() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const localStorageUser = JSON.parse(localStorage.getItem("user"));
          const response = await getUser();
          const user = response.data;
          user.role = localStorageUser.role;
          __setUser({ user, token });
          localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
          await removeUser();
          console.log(error);
          throw error;
        }
      }
    }
    get_user()
      .then((_) => {})
      .catch((_) => {});
  }, []);

  async function setUser(token) {
    if (token) {
      try {
        localStorage.setItem("token", token);
        console.log(token);
        const response = await getUser();
        const user = response.data;
        __setUser({ user, token });

        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
  async function removeUser() {
    try {
      await logout();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      __setUser({ user: {}, token: "" });
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      __setUser({ user: {}, token: "" });
      throw err;
    }
  }
  async function setStaffUser(token, role) {
    if (token) {
      try {
        localStorage.setItem("token", token);
        const response = await getUser();
        const user = response.data;
        user.role = role;
        __setUser({ user, token });
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
  return (
    <UserContext.Provider value={{ user, setUser, removeUser, setStaffUser }}>
      {children}
    </UserContext.Provider>
  );
}
