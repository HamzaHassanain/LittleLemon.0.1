import React from "react";
import { useUsers } from "../../context/UsersContext";
import Select from "react-select";
import { useOrders } from "../../context/OrdersContext";
export default function SelectDeliveryFrom({ orderId, curDelivery }) {
  const { users } = useUsers();
  const { setDeliveryCrew } = useOrders();
  const deliveryCrews = users.filter((user) => user.role === "delivery");
  const [curOption, setCurOption] = React.useState({
    value: curDelivery?.username,
    label: curDelivery?.username,
  });
  const options = deliveryCrews.map((user) => ({
    value: user.username,
    label: user.username,
  }));

  return (
    <Select
      options={options}
      value={curOption}
      onChange={async (option) => {
        try {
          await setDeliveryCrew(orderId, { delivery_crew: option.value });
          setCurOption(option);
        } catch (error) {
          console.log(error);
        }
      }}
    />
  );
}
