import { motion } from "framer-motion";
import "./f.css";
import Footers from "./Footers";
import { div } from "framer-motion/client";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUpDelayed = (delay = 0.3) => ({
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay },
  },
});

const driftButton = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: "easeOut" },
  },
  drift: {
    y: [0, -5, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const staggerParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.25 },
  },
};

const Footer = () => {
  return (
    <div>
      <motion.div
        className="footer_container"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="footer_content" variants={staggerParent}>
          <motion.h2 className="respond_title" variants={fadeUp}>
            PLEASE RESPOND
          </motion.h2>

          <motion.p className="respond_p" variants={fadeUpDelayed(0.2)}>
            We kindly ask your response by March 15, 2026
          </motion.p>
          <div className="note">
            <a href="rsvp">

            <motion.button
              className="rsvp_here dopa"
              variants={driftButton}
              animate="drift"
            >
              rsvp
            </motion.button>
              </a>
          </div>

          <motion.h2
            className="couple"
            variants={fadeUpDelayed(0.4)}
            style={{ fontSize: "60px", fontFamily: "bic" }}
          >
            Lewis & Latoya
          </motion.h2>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Footer;
