import { motion } from "framer-motion";
import "./t.css";
import arche from "../../assets/arch.png";
import one4 from "../../assets/header.jpeg";

// Cinematic Wedding Fade-Up
const fadeUp = {
  hidden: { opacity: 0, y: 60, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1], // premium cinematic curve
    },
  },
};

// Luxury Soft Bloom
const bloom = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(8px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Floating drift (wedding breeze)
const drift = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.8,
      ease: "easeOut",
    },
  },
  drift: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Staggered luxury sequencing
const staggerParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.28,
    },
  },
};

const Tomeine = () => {
  return (
    <motion.div
      className="tot"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="dd">
        {/* Title */}
        <motion.h2 className="timeline_title" variants={fadeUp}>
          wedding timeline
        </motion.h2>

        {/* Timeline Container */}
        <motion.div className="timelne_grid" variants={staggerParent}>
          {/* ITEM — Guest Arrival */}
          <motion.div className="timeline_sub gang" variants={bloom}>
            <motion.img
              src={arche}
              alt=""
              className="timeline_icon"
              variants={fadeUp}
              animate="drift"
            />

            <motion.h2 className="timeline_date" variants={fadeUp}>
              5:00 PM
            </motion.h2>

            <motion.div className="wedding_secton" variants={fadeUp}>
              <h2 className="name">Guest Arrival</h2>
              <h2 className="addtonal">Eola View Lobby</h2>
            </motion.div>
          </motion.div>

          <div className="timeline_sub ho"></div>
          <div className="timeline_sub ho"></div>

          {/* ITEM — Doors Close */}
          <motion.div className="timeline_sub" variants={bloom}>
            <motion.img
              src="https://res.cloudinary.com/dhisaijz3/image/upload/v1764944798/door_shhf16.png"
              alt=""
              className="timeline_icon"
              variants={fadeUp}
              animate="drift"
            />

            <motion.h2 className="timeline_date" variants={fadeUp}>
              5:50 PM
            </motion.h2>

            <motion.div className="wedding_secton" variants={fadeUp}>
              <h2 className="name">Doors Close Promptly</h2>
              <h2 className="addtonal">Please be seated before ceremony</h2>
            </motion.div>
          </motion.div>
          <div className="timeline_sub ho"></div>
          <div className="timeline_sub ho"></div>

          {/* ITEM — Ceremony */}
          <motion.div className="timeline_sub gang" variants={bloom}>
            <motion.img
              src="https://res.cloudinary.com/dhisaijz3/image/upload/v1764944897/hall_xavxbs.png"
              alt=""
              className="timeline_icon"
              variants={fadeUp}
              animate="drift"
            />

            <motion.h2 className="timeline_date" variants={fadeUp}>
              6:00 PM
            </motion.h2>

            <motion.div className="wedding_secton" variants={fadeUp}>
              <h2 className="name">Wedding Ceremony</h2>
              <h2 className="addtonal">Eola View Garden</h2>
            </motion.div>
          </motion.div>
          <div className="timeline_sub ho"></div>
          <div className="timeline_sub ho"></div>

          {/* ITEM — Cocktail Hour */}
          <motion.div className="timeline_sub" variants={bloom}>
            <motion.img
              src="https://res.cloudinary.com/dhisaijz3/image/upload/v1764945079/bridal_bectx1.png"
              alt=""
              className="timeline_icon"
              variants={fadeUp}
              animate="drift"
            />

            <motion.h2 className="timeline_date" variants={fadeUp}>
              Immediately after ceremony
            </motion.h2>

            <motion.div className="wedding_secton" variants={fadeUp}>
              <h2 className="name">Cocktail Hour</h2>
              <h2 className="addtonal">Eola View Terrace</h2>
            </motion.div>
          </motion.div>

          {/* ITEM — Reception */}
          <motion.div className="timeline_sub gang" variants={bloom}>
            <motion.img
              src="https://res.cloudinary.com/dhisaijz3/image/upload/v1764945165/cheers_bp3mki.png"
              alt=""
              className="timeline_icon"
              variants={fadeUp}
              animate="drift"
            />

            <motion.h2 className="timeline_date" variants={fadeUp}>
              Following Cocktail Hour
            </motion.h2>

            <motion.div className="wedding_secton" variants={fadeUp}>
              <h2 className="name">Reception</h2>
              <h2 className="addtonal">
                Dinner & Dancing at Eola View Ballroom
              </h2>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Image with soft parallax */}
        <motion.div className="lo" variants={bloom}>
          <motion.img
            src={one4}
            alt=""
            className="bottom_img"
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{
              scale: 1,
              opacity: 1,
              transition: { duration: 2, ease: "easeOut" },
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Tomeine;
