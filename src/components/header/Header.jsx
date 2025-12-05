import { motion } from "framer-motion";
import "./h.css";
import logor from "../../assets/logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const driftFloat = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  drift: {
    y: [0, -6, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const staggerParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const Header = () => {
  return (
    <motion.div
      className="header_container"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
  
      {/* MAIN COUPLE NAME */}
      <motion.h2
        className="couple_name"
        variants={fadeUp}
        style={{ willChange: "transform" }}
      >
        Lewis & Latoya
      </motion.h2>
    </motion.div>
  );
};

export default Header;
