import React from "react";
import Sidebar from "./Sidebar";
import UserHeader from "../User/UserHeader";
import UsersContextProvider from "../../context/UsersContext";
import MenuItemsProvider from "../../context/MenuItemsContext";
export default function Layout({ links, children }) {
  return (
    <MenuItemsProvider>
      <UsersContextProvider>
        <div className="dashboard">
          <header className="dashboard-header">
            <UserHeader />
          </header>
          <div className="dashboard-body">
            <Sidebar links={links} />
            {children}
          </div>
        </div>
      </UsersContextProvider>
    </MenuItemsProvider>
  );
}
