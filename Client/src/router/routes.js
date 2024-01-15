import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import User from "../pages/User";
import Menu from "../pages/Menu";
import SingleMenuItem from "../pages/SingleMenuItem";
import Auth from "../pages/Auth";
import Cart from "../pages/Cart";
import Page404 from "../pages/Page404";
import ClientLayout from "../components/Generics/ClientLayout";

import StaffAuth from "../pages/StaffAuth";
import Staff from "../pages/Staff";
import StaffCategoriesDashboard from "../pages/StaffCategoriesDashboard";
import StaffUsersDashboard from "../pages/StaffUsersDashboard";
import StaffMenuItemsDashboard from "../pages/StaffMenuItemsDashboard";
import StaffOrdersDashboard from "../pages/StaffOrdersDashboard";
import ManagerLayout from "../components/Staff/ManagerLayout";

import StaffSingleMenuItemDashboard from "../pages/StaffSingleMenuItemDashboard";
import StaffSingleCategoryDashboard from "../pages/StaffSingleCategoryDashboard";

import DeliveryLayout from "../components/Staff/DeliveryLayout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ClientLayout>
            <Home />
          </ClientLayout>
        ),
      },
      {
        path: "/cart",
        element: (
          <ClientLayout>
            <Cart />
          </ClientLayout>
        ),
      },
      {
        path: "/user",
        element: (
          <ClientLayout>
            <User />
          </ClientLayout>
        ),
      },
      {
        path: "/menu",
        element: (
          <ClientLayout>
            <Menu />
          </ClientLayout>
        ),
      },
      {
        path: "/menu/:id",
        element: (
          <ClientLayout>
            <SingleMenuItem />
          </ClientLayout>
        ),
      },
      {
        path: "/auth/:type",
        element: (
          <ClientLayout>
            <Auth />
          </ClientLayout>
        ),
      },
      {
        path: "/staff/manager/users",
        element: (
          <ManagerLayout>
            <StaffUsersDashboard />
          </ManagerLayout>
        ),
      },
      {
        path: "/staff/manager/menu-items",
        element: (
          <ManagerLayout>
            <StaffMenuItemsDashboard />
          </ManagerLayout>
        ),
      },
      {
        path: "/staff/manager/menu-items/edit/:id",
        element: (
          <ManagerLayout>
            <StaffSingleMenuItemDashboard />
          </ManagerLayout>
        ),
      },
      {
        path: "/staff/manager/menu-items/new",
        element: (
          <ManagerLayout>
            <StaffSingleMenuItemDashboard />
          </ManagerLayout>
        ),
      },
      {
        path: "/staff/manager/categories",
        element: (
          <ManagerLayout>
            <StaffCategoriesDashboard />
          </ManagerLayout>
        ),
      },
      {
        path: "/staff/manager/categories/new",
        element: (
          <ManagerLayout>
            <StaffSingleCategoryDashboard />
          </ManagerLayout>
        ),
      },
      {
        path: "/staff/manager/categories/edit/:id",
        element: (
          <ManagerLayout>
            <StaffSingleCategoryDashboard />
          </ManagerLayout>
        ),
      },
      {
        path: "/staff/manager/orders",
        element: (
          <ManagerLayout>
            <StaffOrdersDashboard />
          </ManagerLayout>
        ),
      },
      {
        path: "/staff/delivery/orders",
        element: (
          <DeliveryLayout>
            <StaffOrdersDashboard />
          </DeliveryLayout>
        ),
      },
      {
        path: "/staff/auth",
        element: <StaffAuth />,
      },
      {
        path: "/staff",
        element: <Staff />,
      },
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
]);

export default routes;
