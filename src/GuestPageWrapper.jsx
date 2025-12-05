import React, { useState, useEffect } from "react";
import { useParams, Routes, Route } from "react-router-dom";
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
import Gallery from "./pages/dress/Gallery";
import Rsvp from "./pages/rsvp/Rsvp";

const GuestPageWrapper = () => {
  const { guestName } = useParams(); // this is the unique guest link
  const [passwordInput, setPasswordInput] = useState("");
  const [guestData, setGuestData] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const fetchGuest = async () => {
      // Fetch guest by 'link' field, which should match AdminDashboard
      const q = query(
        collection(db, "guests"),
        where("link", "==", `/${guestName}`)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setGuestData(querySnapshot.docs[0].data());
      }
    };

    fetchGuest();

    // Check if guest is already authorized
    const storedAuth = localStorage.getItem(`guest_${guestName}`);
    if (storedAuth === "true") setIsAuthorized(true);
  }, [guestName]);

  const handleCheckPassword = (e) => {
    e.preventDefault();
    if (guestData && guestData.password === passwordInput) {
      setIsAuthorized(true);
      localStorage.setItem(`guest_${guestName}`, "true");
    } else {
      alert("Incorrect password");
    }
  };

  if (!guestData) return <></>;

  if (!isAuthorized) {
    return (
      <div className="w">
        <div className="wrapper">
          <form className="for" onSubmit={handleCheckPassword}>
            <h2>Welcome, {guestName}</h2>
            <input
              type="password"
              placeholder="Enter password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={{ padding: 10, fontSize: 16, marginRight: 10 }}
            />
            <button
              type="submit"
              style={{ padding: "10px 20px", fontSize: 16, cursor: "pointer" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authorized guest view
  return (
    <>
      <Nav isGuest={true} />
      <Routes>
        <Route index element={<All />} />
        <Route path="party" element={<People />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="dress" element={<Dress />} />
        <Route path="guide" element={<Guide />} />
        <Route path="travel-stay" element={<Travel />} />
        <Route path="registry" element={<Registry />} />
        <Route path="*" element={<All />} />
        <Route path="/rsvp" element={<Rsvp />} />
      </Routes>
      <Footers />
    </>
  );
};

export default GuestPageWrapper;
