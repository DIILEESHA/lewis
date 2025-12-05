import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import All from "./All";
import Dress from "./pages/dress/Dress";
import People from "./pages/people/People";
import Guide from "./components/guide/Guide";
import Travel from "./components/guide/Travel";
import Registry from "./components/guide/Registry";
import AdminDashboard from "./AdminDashboard";
import GuestPageWrapper from "./GuestPageWrapper";
import Nav from "./components/header/Nav";
import Footers from "./components/footer/Footers";
import PasswordProtected from "./PasswordProtected";
import Rsvp from "./pages/rsvp/Rsvp";
import Gallery from "./pages/dress/Gallery";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Guest pages */}
        <Route path="/:guestName/*" element={<GuestPageWrapper />} />

        {/* Public site */}
        <Route
          path="/"
          element={
            <PasswordProtected>
              <Nav />
              <All />
              <Footers />
            </PasswordProtected>
          }
        />
        <Route
          path="/dress"
          element={
            <PasswordProtected>
              <Nav />
              <Dress />
              <Footers />
            </PasswordProtected>
          }
        />
        <Route
          path="/party"
          element={
            <PasswordProtected>
              <Nav />
              <People />
              <Footers />
            </PasswordProtected>
          }
        />

        <Route
          path="/gallery"
          element={
            <PasswordProtected>
              <Nav />
              <Gallery />
              <Footers />
            </PasswordProtected>
          }
        />
        <Route
          path="/guide"
          element={
            <PasswordProtected>
              <Nav />
              <Guide />
              <Footers />
            </PasswordProtected>
          }
        />
        <Route
          path="/travel-stay"
          element={
            <PasswordProtected>
              <Nav />
              <Travel />
              <Footers />
            </PasswordProtected>
          }
        />
        <Route
          path="/registry"
          element={
            <PasswordProtected>
              <Nav />
              <Registry />
              <Footers />
            </PasswordProtected>
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <PasswordProtected>
              <Nav />
              <All />
              <Footers />
            </PasswordProtected>
          }
        />

        {/* Fallback */}
        <Route
          path="/rsvp"
          element={
            <PasswordProtected>
              <Nav />
              <Rsvp />
              <Footers />
            </PasswordProtected>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
