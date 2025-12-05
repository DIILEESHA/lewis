import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

const PasswordProtected = ({ children, guestName }) => {
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [guestPassword, setGuestPassword] = useState(null);
  const [sitePassword, setSitePassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Helper key for localStorage
  const storageKey = guestName
    ? `authorized-${guestName.toLowerCase().replace(/\s+/g, "")}`
    : "authorized-public";

  // Check localStorage on load
  useEffect(() => {
    const storedAuth = localStorage.getItem(storageKey);
    if (storedAuth === "true") {
      setIsAuthorized(true);
      setLoading(false);
    }
  }, [storageKey]);

  // FETCH GUEST PASSWORD
  useEffect(() => {
    const fetchGuestPassword = async () => {
      try {
        if (!guestName) return;

        const cleanedName = guestName
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "");

        const q = query(
          collection(db, "guests"),
          where("link", "==", `/${cleanedName}`)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          setGuestPassword(data.password || "");
        } else {
          setGuestPassword("");
        }
      } catch (err) {
        console.error("Failed to fetch guest password", err);
        setGuestPassword("");
      }
    };

    fetchGuestPassword();
  }, [guestName]);

  // FETCH PUBLIC SITE PASSWORD
  useEffect(() => {
    const fetchSitePassword = async () => {
      try {
        const snapshot = await getDocs(collection(db, "sitePassword"));
        if (!snapshot.empty) {
          setSitePassword(snapshot.docs[0].data().password || "");
        } else {
          setSitePassword("");
        }
      } catch (err) {
        console.error("Failed to fetch site password", err);
        setSitePassword("");
      } finally {
        setLoading(false);
      }
    };

    fetchSitePassword();
  }, []);

  const handleCheckPassword = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!guestPassword && !sitePassword) {
      setErrorMsg("Passwords are not yet loaded. Please wait.");
      return;
    }

    if (!passwordInput) {
      setErrorMsg("Please enter a password.");
      return;
    }

    if (passwordInput === guestPassword || passwordInput === sitePassword) {
      setIsAuthorized(true);
      localStorage.setItem(storageKey, "true"); // store authorizdsssww
    } else {
      setErrorMsg("Incorrect password. Please try again.");
    }
  };

  if (loading) return <div></div>;
  if (isAuthorized) return <>{children}</>;

  return (
    <div className="w">
      <div className="wrapper">
        <form className="for" onSubmit={handleCheckPassword}>
          <h2>Welcome{guestName ? `, ${guestName}` : ""}</h2>

          <input
            type="password"
            placeholder="Enter password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            style={{ padding: 10, fontSize: 16 }}
          />

          {errorMsg && (
            <p style={{ color: "red", marginTop: 10 }}>{errorMsg}</p>
          )}

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
};

export default PasswordProtected;
