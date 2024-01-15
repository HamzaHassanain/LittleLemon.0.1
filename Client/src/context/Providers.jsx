import UserContextProvider from "./UserContext";
import MenuItemsContextProvider from "./MenuItemsContext";
import CategoriesContextProvider from "./CategoriesContext";
import CartContextProvider from "./CartContext";
import OrdersContextProvider from "./OrdersContext";
function Providers({ children }) {
  return (
    <UserContextProvider>
      <MenuItemsContextProvider>
        <CategoriesContextProvider>
          <CartContextProvider>
            <OrdersContextProvider>{children}</OrdersContextProvider>
          </CartContextProvider>
        </CategoriesContextProvider>
      </MenuItemsContextProvider>
    </UserContextProvider>
  );
}

export default Providers;
