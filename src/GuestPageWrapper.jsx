import React, { useState, useEffect } from "react";
import { useParams, Routes, Route, Navigate } from "react-router-dom";
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
  const { guestName } = useParams();

  const [loading, setLoading] = useState(true);
  const [guestData, setGuestData] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const fetchGuest = async () => {
      const q = query(
        collection(db, "guests"),
        where("link", "==", `/${guestName}`)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        setGuestData(data);
      }

      const savedAuth = localStorage.getItem(`guest_${guestName}`);
      if (savedAuth === "true") setIsAuthorized(true);

      setLoading(false);
    };

    fetchGuest();
  }, [guestName]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (guestData?.password === passwordInput) {
      localStorage.setItem(`guest_${guestName}`, "true");
      setIsAuthorized(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (loading) return <></>;
  if (!guestData) return <Navigate to="/" />;

  if (!isAuthorized) {
    return (
      <div className="w">
        <div className="wrapper">
          <form className="for" onSubmit={handlePasswordSubmit}>
            <div className="tooner">
              <img
                className="toon"
                src="https://res.cloudinary.com/dhisaijz3/image/upload/v1764957081/logo_vqbyrw.png"
                alt=""
              />
            </div>
            <h2 style={{ fontSize: "14px" }}>Welcome, {guestName}</h2>

            <input
              type="password"
              placeholder="Enter password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }

  // Authorized view
  return (
    <>
      <Nav isGuest={true} />

      <Routes>
        <Route index element={<All />} />
        <Route path="party" element={<People />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="dress" element={<Dress />} />
        <Route path="guide" element={<Guide />} />
        <Route path="travel-stay" element={<Travel />} />
        <Route path="registry" element={<Registry />} />
        <Route path="rsvp" element={<Rsvp />} />
        <Route path="*" element={<All />} />
      </Routes>

      <Footers />
    </>
  );
};

export default GuestPageWrapper;
