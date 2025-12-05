import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./h.css";
import logor from "../../assets/logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};
const driftFloat = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
  },
  drift: {
    y: [0, -6, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};
const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

const Nav = ({ isGuest = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const params = useParams();
  const guestPrefix = isGuest && params.guestName ? `/${params.guestName}` : "";

  const navItems = [
    // { name: "Home", path: "" },
    { name: "Party", path: "party" },
    { name: "Gallery", path: "gallery" },
    { name: "Dress Code", path: "dress" },
    { name: "Parking Guide", path: "guide" },
    { name: "Travel & Stay", path: "travel-stay" },
    { name: "Registry", path: "registry" },
    { name: "RSVP", path: "rsvp" },
  ];

  return (
    <div className="go">
      <motion.div
        className="nav_section"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <Link to={`${guestPrefix}/`}>
          <motion.div className="nav_logo">
            <motion.img
              src={logor}
              alt="Logo"
              className="nav_logo_img"
              variants={driftFloat}
              animate="drift"
            />
          </motion.div>
        </Link>

        <div className="nav_links_desktop">
          <motion.ul className="nav_ul" variants={staggerParent}>
            {navItems.map((item, idx) => (
              <motion.li key={idx} className="nav_li" variants={staggerItem}>
                <Link to={`${guestPrefix}/${item.path}`}>{item.name}</Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="mobile_nav_icon" onClick={toggleMenu}>
          {menuOpen ? (
            <X size={28} color="#fff" />
          ) : (
            <Menu size={28} color="#fff" />
          )}
        </div>

        {menuOpen && (
          <motion.div
            className="mobile_nav_menu"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {navItems.map((item, idx) => (
              <motion.div
                key={idx}
                className="mobile_nav_item"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={`${guestPrefix}/${item.path}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Nav;
