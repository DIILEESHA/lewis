import { motion } from "framer-motion";
import "./d.css";
import places from "../../assets/place.avif";

// Award-Winning Cinematic Scroll Animations
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: "easeOut" }
  }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.6, ease: "easeOut" }
  }
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.6, ease: "easeOut" }
  }
};

const zoomSoft = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.8, ease: "easeOut" }
  }
};

const staggerParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.25 }
  }
};

const Details = () => {
  return (
    <motion.div
      className="tot io"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="timeline" variants={staggerParent}>
        <motion.h2 className="timeline_title" variants={fadeUp}>
          wedding Details
        </motion.h2>

        <div className="detail_grid">
          {/* Left Image with Premium Cinematic Zoom Animation */}
          <motion.div className="detail_sub" variants={zoomSoft}>
            <motion.img
              src={places}
              alt=""
              className="place_img"
              variants={fadeLeft}
            />
          </motion.div>

          {/* Right Text Block with Soft Floating Entrance */}
          <motion.div className="detail_sub saha" variants={fadeRight}>
            <motion.h2 className="hotel_name" variants={fadeUp}>
              Eola View
            </motion.h2>

            <motion.p className="address" variants={fadeUp}>
              Eola View 150 S Eola Dr, Suite 100 Orlando, FL 32801
            </motion.p>

            <motion.p className="detail_para" variants={fadeUp}>
              Join us at Eola View for a modern-day fairytale celebration. Our
              ceremony and reception will be held at the same stunning venue,
              surrounded by romantic candlelight and elevated details for an
              unforgettable evening.
            </motion.p>

            <motion.a
              href="https://www.eolaview.com/"
              target="_blank"
              variants={fadeUp}
            >
              <motion.button
                className="link"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
              >
                Link
              </motion.button>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Details;