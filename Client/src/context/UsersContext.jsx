import React from "react";
import {
  getUsers,
  makeUserManager,
  removeUserManager,
  makeUserDelivery,
  removeUserDelivery,
} from "../apis";

const UsersContext = React.createContext();
const useUsers = () => React.useContext(UsersContext);

export { UsersContext, useUsers };

export default function UsersContextProvider({ children }) {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  async function changeUserRole(username, newRole) {
    const user = users.find((user) => user.username === username);
    const oldRole = user.role;
    if (oldRole === "manager") {
      try {
        await removeUserManager(user.id);
        if (newRole === "delivery") {
          await makeUserDelivery({ username: user.username });
        }
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else if (oldRole === "delivery") {
      try {
        await removeUserDelivery(user.id);
        if (newRole === "manager") {
          await makeUserManager({ username: user.username });
        }
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else {
      try {
        if (newRole === "manager") {
          await makeUserManager({ username: user.username });
        } else if (newRole === "delivery") {
          await makeUserDelivery({ username: user.username });
        }
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
  return (
    <UsersContext.Provider value={{ users, changeUserRole }}>
      {children}
    </UsersContext.Provider>
  );
}
