import React, { useState } from "react";
import "../../styles/Payments.css";

const Payments = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const laundryItems = [
    { label: "Стирка наматрасника", price: 250 },
    { label: "Стирка подушки", price: 500 },
    { label: "Стирка одеяла", price: 1000 },
    { label: "Стирка пледа", price: 750 },
  ];

  const paymentHistory = [
    {
      id: 7243,
      category: "Multipass Payment",
      date: "2024.10.25",
      time: "10:30",
      price: 7243,
      status: "Paid",
    },
    {
      id: 72434,
      category: "Dorm Payment",
      date: "2024.10.28",
      time: "9:00",
      price: 1319,
      status: "Unpaid",
    },
    {
      id: 72434,
      category: "Student Fund Payment",
      date: "2024.10.28",
      time: "18:00",
      price: 18319,
      status: "Paid",
    },
    {
      id: 72434,
      category: "Payment type",
      date: "2024.10.28",
      time: "18:00",
      price: 113319,
      status: "Pending",
    },
    {
      id: 81319,
      category: "Payment type",
      date: "2024.10.28",
      time: "6:39",
      price: 49319,
      status: "Paid",
    },
    {
      id: 29159,
      category: "Payment type",
      date: "2024.10.30",
      time: "18:00",
      price: 8159,
      status: "Pending",
    },
    {
      id: 29159,
      category: "Payment type",
      date: "2024.10.30",
      time: "18:00",
      price: 8159,
      status: "Paid",
    },
    {
      id: 29159,
      category: "Payment type",
      date: "2024.10.30",
      time: "18:00",
      price: 8159,
      status: "Paid",
    },
  ];

  const toggleItem = (label) => {
    setSelectedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const totalSum = selectedItems.reduce(
    (acc, label) =>
      acc + laundryItems.find((item) => item.label === label)?.price || 0,
    0
  );

  return (
    <div className="payments-container">
      <div className="make-payment">
        <div className="payment-details">
          <h2>Make Payment</h2>
          <p className="info-text">
            The laundry service of bedding including pillow, blanket, bedspread,
            mattress cover
          </p>
          <div className="info-text">
            <p>Location: Block 20, office 104 / Block 23, office 079</p>
            <p>
              Opening Hours: Monday – Friday, 8:00am to 7:00pm (Lunch:
              1:00pm–2:00pm)
            </p>
            <p>Manager: Dinara Zhusupbekova (dinara.zhusupbekova@nu.edu.kz)</p>
            <p>
              <strong>IMPORTANT:</strong> Refunds are not possible unless
              withdrawn, dismissed, or on academic leave.
            </p>
          </div>

          <div className="category-options">
            {laundryItems.map((item) => (
              <label key={item.label}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.label)}
                  onChange={() => toggleItem(item.label)}
                />
                {item.label} – {item.price} KZT
              </label>
            ))}
          </div>

          <div className="total-sum">Total Sum: {totalSum} KZT</div>

          <button className="pay-button">Pay Off</button>
        </div>
      </div>

      <div className="payment-history">
        <h2>Payment History</h2>
        <table className="payment-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Payment ID</th>
              <th>Category</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((row, idx) => (
              <tr key={idx}>
                <td>{row.category}</td>
                <td>{row.id}</td>
                <td>{row.category}</td>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td>{row.price}</td>
                <td
                  className={
                    row.status === "Paid"
                      ? "status-paid"
                      : row.status === "Unpaid"
                      ? "status-unpaid"
                      : "status-pending"
                  }
                >
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
