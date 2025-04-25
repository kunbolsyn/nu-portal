import React, { useState, useEffect } from "react";
import "../../styles/Payments.css";
import { FaMoneyBillWave, FaHistory } from "react-icons/fa";

const Payments = () => {
  const [activeCategory, setActiveCategory] = useState("laundry");
  const [selectedItems, setSelectedItems] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [sportMembership, setSportMembership] = useState("multi");
  const [semester, setSemester] = useState("spring2025");
  const [sortOption, setSortOption] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const accountId = localStorage.getItem("accountId");

  // Fetch payment history from backend
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://senior-project-java-backend.onrender.com/api/v1/payment/account/${accountId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch payment history");
        }

        const data = await response.json();
        setPaymentHistory(data);
      } catch (err) {
        setError(err.message);
        console.error("Payment history fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [accountId, token]);

  // Sort payments based on selected option
  const sortedPayments = [...paymentHistory].sort((a, b) => {
    switch(sortOption) {
      case "newest":
        return new Date(b.paymentDate) - new Date(a.paymentDate);
      case "oldest":
        return new Date(a.paymentDate) - new Date(b.paymentDate);
      case "highest":
        return b.amount - a.amount;
      case "lowest":
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  const paymentCategories = [
    { id: "laundry", name: "Laundry Fee" },
    { id: "sport", name: "Sport Complex Membership" },
    { id: "id", name: "ID Recovery" },
    { id: "dormitory", name: "Dormitory Fee" },
    { id: "fund", name: "Student Fund" }
  ];

  const laundryItems = [
    { label: "Стирка наматрасника", price: 250 },
    { label: "Стирка подушки", price: 500 },
    { label: "Стирка одеяла", price: 1000 },
    { label: "Стирка пледа", price: 750 },
  ];

  const sportMemberships = [
    { id: "multi", name: "Membership No.1 (Multi Visit Pass)", price: 5000 },
    { id: "no6", name: "Membership No.6 (3 months)", price: 12000 },
    { id: "no4", name: "Membership No.4 (6 months)", price: 22000 }
  ];

  const semesters = [
    { id: "spring2025", name: "Spring 2025", period: "From 10.01.2025 to 15.06.2025", price: 5000 },
    { id: "fall2025", name: "Fall 2025", period: "From 01.09.2025 to 20.12.2025", price: 5000 }
  ];

  const toggleItem = (label) => {
    setSelectedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const calculateTotal = () => {
    switch(activeCategory) {
      case "laundry":
        return selectedItems.reduce(
          (acc, label) => acc + (laundryItems.find(item => item.label === label)?.price || 0),
          0
        );
      case "sport":
        return sportMemberships.find(m => m.id === sportMembership)?.price || 0;
      case "fund":
        return semesters.find(s => s.id === semester)?.price || 0;
      case "id":
        return 2600;
      default:
        return 0;
    }
  };

  const handlePayment = async () => {
    try {
      const paymentData = {
        userId: accountId,
        type: paymentCategories.find(c => c.id === activeCategory)?.name,
        amount: calculateTotal(),
        paymentDate: new Date().toISOString(),
        paymentMethod: "Online Payment",
        status: "Completed",
        details: {
          items: activeCategory === "laundry" ? selectedItems : [],
          membershipType: activeCategory === "sport" ? sportMembership : null,
          semester: activeCategory === "fund" ? semester : null
        }
      };

      const response = await fetch(
        "https://senior-project-java-backend.onrender.com/api/v1/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(paymentData),
        }
      );

      if (!response.ok) {
        throw new Error("Payment submission failed");
      }

      const result = await response.json();
      alert(`Payment of ${calculateTotal()} KZT for ${activeCategory} submitted successfully!`);
      
      // Refresh payment history
      const historyResponse = await fetch(
        `https://senior-project-java-backend.onrender.com/api/v1/payment/account/${accountId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (historyResponse.ok) {
        const updatedHistory = await historyResponse.json();
        setPaymentHistory(updatedHistory);
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert(`Payment failed: ${err.message}`);
    }
  };

  // Rest of your renderPaymentForm function remains the same...
  const renderPaymentForm = () => {
    switch(activeCategory) {
      case "laundry":
        return (
          <div className="payment-content">
            <div className="payment-description">
              <p>The laundry service of bedding including pillow, blanket, bedspread, mattress cover</p>
              <div className="location-hours">
                <p><strong>Location:</strong></p>
                <p>Block 20, office 104</p>
                <p>Block 23, office 079</p>
                <p><strong>Opening Hours:</strong></p>
                <p>Monday – Friday, from 8.00am to 7.00pm</p>
                <p>(lunch time: 10.00m – 2.00pm)</p>
              </div>
            </div>
            <div className="service-options">
              <h3>Service Desk</h3>
              {laundryItems.map((item) => (
                <label key={item.label} className="service-option">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.label)}
                    onChange={() => toggleItem(item.label)}
                  />
                  <span>{item.label} - {item.price}</span>
                </label>
              ))}
            </div>
          </div>
        );
      // Other cases remain the same...
      case "sport":
        return (
          <div className="payment-content">
            <div className="payment-description">
              <p>Membership No.1 (Multi Visit Pass) is for those seeking non-instructed sports activities and training at the Sports Center including pick-up play for basketball, volleyball, football, use of gymnastics and acrobatics equipment, use of martial arts (wrestling, boxing) areas, jogging and working-out</p>
              <p>Membership No.6 is issued for 3 months to attend any of available classes and gyms (different gyms for students and staff). Locker rooms with showers are available for use.</p>
              <p>Membership No.4 is issued for 6 months to attend any of available classes and gyms (different gyms for students and staff). Locker rooms with showers are available for use.</p>
              <div className="location-hours">
                <p><strong>Location:</strong></p>
                <p>Block 42, NU Sports Center</p>
                <p><strong>Manager Contact Information:</strong></p>
                <p>Office: 70-66-96</p>
                <p>E-mail: sportcomplexmanagement@nu.edu.kz</p>
                <p><strong>IMPORTANT:</strong></p>
                <p>Please first of all read the Rules of attending the Sports Centre and open air sports grounds on the territory of the AOE "Nazarbayev University"</p>
              </div>
            </div>
            <div className="membership-options">
              <label>
                <input
                  type="radio"
                  name="sportMembership"
                  value="multi"
                  checked={sportMembership === "multi"}
                  onChange={() => setSportMembership("multi")}
                />
                <span>Multi - 5000 KZT per month</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="sportMembership"
                  value="no6"
                  checked={sportMembership === "no6"}
                  onChange={() => setSportMembership("no6")}
                />
                <span>No 6 - 12000 KZT</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="sportMembership"
                  value="no4"
                  checked={sportMembership === "no4"}
                  onChange={() => setSportMembership("no4")}
                />
                <span>No 4 - 22000 KZT</span>
              </label>
            </div>
          </div>
        );
      case "id":
        return (
          <div className="payment-content">
            <div className="payment-description">
              <p>In case your ID card has been lost, damaged, image on it has been scuffed, or your last name has been changed please re-issue it. New ID card will be ready in few minutes.</p>
              <div className="location-hours">
                <p><strong>Office Hours:</strong></p>
                <p>Monday – Friday, from 9.00am to 5.00pm</p>
                <p>(lunch time: 12:30pm – 1:30pm)</p>
                <p><strong>Conditions:</strong></p>
                <p>You should have your state ID with you</p>
                <p><strong>Location:</strong></p>
                <p>Block 22, Room 50</p>
                <p><strong>Manager Contact Information:</strong></p>
                <p>Assem Omarbekova</p>
                <p>Office: 70-49-28 (ext. 4928)</p>
                <p>E-mail: assem.omarbekova@nu.edu.kz</p>
              </div>
            </div>
            <div className="fixed-price">
              <p>SUM 2600 KZT</p>
            </div>
          </div>
        );
      case "dormitory":
        return (
          <div className="payment-content">
            <div className="payment-description">
              <p>Nazarbayev University student dormitories</p>
              <p>Nazarbayev University offers students well-equipped and comfortable rooms with excellent service.</p>
              <p>Dormitories are located on the University campus at address: Astana, Left Bank, 53 Kabanbay Batyr avenue.</p>
              <p>Total number of rooms: 1,448.</p>
              <div className="location-hours">
                <p><strong>Block manager:</strong></p>
                <p>In order to ensure high standards of services in the University student dormitories, there is a manager in each block who handles daily issues related to accommodation. Nice and friendly staff makes student accommodation comfortable and maintains order.</p>
                <p><strong>Reception 24/7</strong></p>
                <p>Reception desk on the 1st floor, near dormitory main entrance, is available 24/7.</p>
                <p><strong>Contacts</strong></p>
                <p>Reception at blocks 11,19, and 20 – 8(7171)70 62 87;</p>
                <p>Reception at blocks 22,23 – 8(7171)70 58 38;</p>
                <p>Reception at blocks 24,25 – 8(7171)70 57 19;</p>
                <p>Unfortunately, there is no date of reservation. Please contact to the DSA.</p>
              </div>
              <div className="not-available">
                <p>NOT AVAILABLE</p>
              </div>
            </div>
          </div>
        );
      case "fund":
        return (
          <div className="payment-content">
            <div className="payment-description">
              <p><strong>WHAT IS STUDENT FUND?</strong></p>
              <p>Student life in Nazarbayev University – it is not just a study process and practice, but a creative self-realization in more than 100 student clubs and organizations, covering various spheres of intellectual development, scientific research, creativity, entertainment, culture, art and sports. Students' ideas and projects implementation is possible by the resources of the Student fund created to raise funds for the development and support of student life at the University and finance student activities at the expense of the received funds.</p>
              <p><strong>HOW TO MAKE A CONTRIBUTION ON THE DEVELOPMENT OF STUDENT LIFE?</strong></p>
              <p>The students' contributions can be listed only through the website www.my.nu.edu.kz/</p>
              <div className="location-hours">
                <p><strong>DISCOUNT TERMS</strong></p>
                <p>The dormitory discount is granted If the student fee is paid to The Student Fund before the 1st day of reservation. The size of the student fee is approved each semester by the decision of The Student Fund Budget Committee.</p>
                <p>The approved student fee amount is indicated in your personal account.</p>
              </div>
            </div>
            <div className="semester-options">
              <label>
                <span>Payment semester:</span>
                <select 
                  value={semester} 
                  onChange={(e) => setSemester(e.target.value)}
                >
                  {semesters.map(sem => (
                    <option key={sem.id} value={sem.id}>
                      {sem.name} {sem.period}
                    </option>
                  ))}
                </select>
              </label>
              <div className="fixed-price">
                <p>Sum - 5000 KZT</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="payments-container">
      {/* Make Payment Section */}
      <div className="payments-header">
        <FaMoneyBillWave className="payments-header-icon" />
        <h1>Make Payment</h1>
      </div>
      
      <div className="payment-content-container">
        <div className="payment-categories">
          <div className="category-list">
            {paymentCategories.map(category => (
              <div
                key={category.id}
                className={`category-item ${activeCategory === category.id ? "active" : ""}`}
                onClick={() => {
                  setActiveCategory(category.id);
                  setSelectedItems([]);
                }}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>

        <div className="payment-form">
          <h2>{paymentCategories.find(c => c.id === activeCategory)?.name}</h2>
          {renderPaymentForm()}
          
          {activeCategory !== "dormitory" && (
            <div className="payment-actions">
              <div className="total-sum">Total Sum: {calculateTotal()} KZT</div>
              <button className="pay-button" onClick={handlePayment}>
                {activeCategory === "fund" ? "Make Contribution" : "Pay Now"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Payment History Section */}
      <div className="payments-header" style={{ marginTop: '40px' }}>
        <FaHistory className="payments-header-icon" />
        <h1>Payment History</h1>
      </div>

      <div className="payment-history-section">
        <div className="history-controls">
          <div className="sort-options">
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="loading-message">Loading payment history...</div>
        ) : error ? (
          <div className="error-message">Error: {error}</div>
        ) : (
          <>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Payment ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {sortedPayments.map((payment, idx) => (
                  <tr key={idx}>
                    <td>{payment.type}</td>
                    <td>{payment.id}</td>
                    <td>{payment.amount} KZT</td>
                    <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                    <td>{payment.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="pagination">
              <span>1-{sortedPayments.length} of {sortedPayments.length}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payments;