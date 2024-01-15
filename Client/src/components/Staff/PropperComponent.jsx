import React from "react";
import { useUser } from "../../context/UserContext";
import Manager from "./ManagerLayout";
import Delivery from "./Delivery";
import Loader from "../Generics/Loader";

export default function PropperComponent() {
  const { user } = useUser();
  const role = user?.user?.role;

  if (role === "manager") return <Manager />;
  if (role === "delivery") return <Delivery />;

  return <Loader />;
}
