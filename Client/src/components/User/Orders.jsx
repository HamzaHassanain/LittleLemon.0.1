import React from "react";

export default function Orders({ items }) {
  console.log(items);
  // delivery_crew  , id , total , date , status , deliverd
  return (
    <div className="orders">
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Total</th>
            <th>Date</th>
            <th>Status</th>
            <th>Delivery Crew</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.total}</td>
              <td>{item.date}</td>
              <td className={item.status ? "did" : "no"}></td>
              <td>
                {item.delivery_crew ? (
                  <span>{item.delivery_crew?.email}</span>
                ) : (
                  <span>No Deleivery Yet</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
