import { motion } from "framer-motion";
import "./g.css";

const Guide = () => {
  // Quick fade + scale animation
  const quickFade = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="dress">
      {/* Title & Intro */}
      <motion.div
        className="dress_content"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={quickFade}
      >
        <h2 className="drss_topic">Guest Parking Guide</h2>
        <p className="dress_para">
          To make your arrival easy and stress-free, we’ve gathered all the
          essential parking details for the wedding day, including valet service
          and nearby public parking options.
        </p>
      </motion.div>

      <div className="guide_content">
        {/* Valet Parking */}
        <motion.div
          className="df"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={quickFade}
        >
          <img
            src="https://images1.loopnet.com/i2/DPxwmuG7mAHHyqiv4zU7lte7_XfY4_eFEL1fb9X3B6w/110/150-E-Central-Blvd-Orlando-FL-Primary-Photo-1-Large.jpg"
            alt="Valet Parking"
            className="park_img"
          />
          <h2 className="park_title">Valet Parking</h2>
          <p className="pp">
            Guests may enter Eola View through the main entrance at 150 E.
            Central Blvd. Valet drop-off is located on the first floor of the
            Mondrian Residential Parking Garage at 125 E. Pine Street.
          </p>
          <a href="https://www.eolaview.com/" target="_blank">
            <motion.button
              className="location_btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Location
            </motion.button>
          </a>
        </motion.div>

        <br />
        <br />

        {/* Public Parking */}
        <motion.div
          className="df"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={quickFade}
        >
          <img
            src="https://th.bing.com/th/id/OIP.6n8XTvIdHHanKtF4KKTUcAAAAA?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Public Parking"
            className="park_img"
          />
          <h2 className="park_title">Public Parking</h2>
          <p className="pp">
            Guests who prefer self-parking may use the City of Orlando Library
            Garage at 112 East Central Boulevard, located within walking
            distance to Eola View. The garage is open 24/7, with pricing varying
            based on city events. Street parking is also available in the
            surrounding area.
          </p>

          <a
            target="_blank"
            href="https://www.orlando.gov/Parking-Transportation/Parking/Parking-Garages-and-Lots/Library-Garage"
          >
            <motion.button
              className="location_btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Location
            </motion.button>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Guide;
