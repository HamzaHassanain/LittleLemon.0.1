import React from "react";
import Loader from "../Generics/Loader";
import NoItems from "../Generics/NoItems";
import MenuItem from "./MenuItem";

export default function MenuItems({ items, isLoading }) {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container menu-items">
      {items?.length ? (
        items.map((item) => <MenuItem key={item.id} item={item} />)
      ) : (
        <NoItems />
      )}
    </div>
  );
}
