import React, { useState } from "react"
import "../../styles/Payments.css";

const Payments = () => {
  const [selectedItems, setSelectedItems] = useState([])

  const laundryItems = [
    { label: "Стирка наматрасника", price: 250 },
    { label: "Стирка подушки", price: 500 },
    { label: "Стирка одеяла", price: 1000 },
    { label: "Стирка пледа", price: 750 },
  ]

  const paymentHistory = [
    { id: 7243, category: "Multipass Payment", date: "2024.10.25", time: "10:30", price: 7243, status: "Paid" },
    { id: 72434, category: "Dorm Payment", date: "2024.10.28", time: "9:00", price: 1319, status: "Unpaid" },
    { id: 72434, category: "Student Fund Payment", date: "2024.10.28", time: "18:00", price: 18319, status: "Paid" },
    { id: 72434, category: "Payment type", date: "2024.10.28", time: "18:00", price: 113319, status: "Pending" },
    { id: 81319, category: "Payment type", date: "2024.10.28", time: "6:39", price: 49319, status: "Paid" },
    { id: 29159, category: "Payment type", date: "2024.10.30", time: "18:00", price: 8159, status: "Pending" },
    { id: 29159, category: "Payment type", date: "2024.10.30", time: "18:00", price: 8159, status: "Paid" },
    { id: 29159, category: "Payment type", date: "2024.10.30", time: "18:00", price: 8159, status: "Paid" },
  ]

  const toggleItem = (label) => {
    setSelectedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

  const totalSum = selectedItems.reduce(
    (acc, label) => acc + laundryItems.find((item) => item.label === label)?.price || 0,
    0
  )

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Make Payment</h2>

      <div style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px", marginTop: "16px" }}>
        <p style={{ fontWeight: "bold" }}>The laundry service of bedding including pillow, blanket, bedspread, mattress cover</p>
        <div style={{ fontSize: "14px", color: "#555" }}>
          <p>Location: Block 20, office 104 / Block 23, office 079</p>
          <p>Opening Hours: Monday – Friday, 8:00am to 7:00pm (Lunch: 1:00pm–2:00pm)</p>
          <p>Manager: Dinara Zhusupbekova (dinara.zhusupbekova@nu.edu.kz)</p>
          <p><strong>IMPORTANT:</strong> Refunds are not possible unless withdrawn, dismissed, or on academic leave.</p>
        </div>

        <div style={{ marginTop: "16px" }}>
          {laundryItems.map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <input
                type="checkbox"
                checked={selectedItems.includes(item.label)}
                onChange={() => toggleItem(item.label)}
              />
              <label style={{ marginLeft: "8px" }}>{item.label} – {item.price} KZT</label>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", alignItems: "center" }}>
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>Total Sum: {totalSum} KZT</span>
          <button style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px" }}>Pay Off</button>
        </div>
      </div>

      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginTop: "32px" }}>Payment History</h2>

      <div style={{ marginTop: "16px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Position</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Payment ID</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Category</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Time</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Price</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((row, idx) => (
              <tr key={idx}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{row.category}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{row.id}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{row.category}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{row.date}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{row.time}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{row.price}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  <span style={{ color: row.status === "Paid" ? "green" : row.status === "Unpaid" ? "red" : "orange" }}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Payments