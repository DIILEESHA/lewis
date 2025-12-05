import React, { useState, useEffect } from "react";
import { useParams, Routes, Route, Navigate, Link } from "react-router-dom";
import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Nav from "./components/header/Nav";
import Footers from "./components/footer/Footers";
import All from "./All";
import Dress from "./pages/dress/Dress";
import People from "./pages/people/People";
import Guide from "./components/guide/Guide";
import Travel from "./components/guide/Travel";
import Registry from "./components/guide/Registry";

const GuestPage = () => {
  const { guestName } = useParams();
  const [passwordInput, setPasswordInput] = useState("");
  const [guestData, setGuestData] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const fetchGuest = async () => {
      const q = query(collection(db, "guests"), where("name", "==", guestName));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setGuestData(querySnapshot.docs[0].data());
      }
    };
    fetchGuest();
  }, [guestName]);

  const handleCheckPassword = () => {
    if (guestData && guestData.pwd === passwordInput) {
      setIsAuthorized(true);
    } else {
      alert("Incorrect password");
    }
  };

  // Loading state
  if (!guestData) return <p style={{ textAlign: "center", marginTop: 50 }}>Loading...</p>;

  // Password form
  if (!isAuthorized) {
    return (
      <div style={{ padding: 50, textAlign: "center" }}>
        <h2>Welcome, {guestName}</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
        />
        <button
          onClick={handleCheckPassword}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Submit
        </button>
      </div>
    );
  }

  // Authorized guest sees full website pages with Nav and Footer
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<All />} />
        <Route path="/dress" element={<Dress />} />
        <Route path="/party" element={<People />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/travel-stay" element={<Travel />} />
        <Route path="/registry" element={<Registry />} />
        {/* Redirect any unmatched route back to / */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footers />
    </>
  );
};

export default GuestPage;
