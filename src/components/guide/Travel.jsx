import { motion } from "framer-motion";
import "./g.css";

const Travel = () => {
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
      {/* Page Title & Intro */}
      <motion.div
        className="dress_content"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={quickFade}
      >
        <h2 className="drss_topic">Travel & Stay Guide</h2>
        <p className="dress_para">
          To make your wedding weekend as seamless and enjoyable as possible,
          we’ve compiled all the essential information you’ll need for travel,
          accommodation, and transportation. From hotel stays and Airbnb options
          to local airports and parking, this guide will help you plan your trip
          with ease and ensure a comfortable experience throughout the
          celebration.
        </p>
      </motion.div>

      <div className="guide_content">
        {/* Hotel Section */}
        <motion.div
          className="df"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={quickFade}
        >
          <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/42/ab/71/embassy-suites-by-hilton.jpg?w=900&h=500&s=1"
            alt="Embassy Suites by Hilton Orlando Downtown"
            className="park_img"
          />
          <h2 className="park_title">
            Embassy Suites by Hilton Orlando Downtown
          </h2>
          <p className="pp">
            For the most convenient and comfortable experience, we highly
            recommend staying at the hotel located directly across the street
            from the wedding venue.
          </p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.hilton.com/en/hotels/mcodtes-embassy-suites-orlando-downtown/?flexibleDates=false&numRooms=1&numAdults=1&numChildren=0&room1ChildAges=&room1AdultAges=&sessionToken=7c13b865-9608-4305-a9bf-450e207784c7"
          >
            <motion.button
              className="location_btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hotel Booking Link
            </motion.button>
          </a>
        </motion.div>

        <br />
        <br />

        {/* Airbnb Section */}
        <motion.div
          className="df"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={quickFade}
        >
          <h2 className="park_title">Airbnb Options Nearby</h2>
          <p className="pp">
            For guests who prefer private stays, group accommodations, or
            apartment-style lodging, Orlando offers a wide selection of Airbnb
            options.
          </p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.airbnb.com/orlando-fl/stays"
          >
            <motion.button
              className="location_btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Airbnb Listings
            </motion.button>
          </a>
        </motion.div>

        <br />
        <br />

        {/* Travel Information Section */}
        <motion.div
          className="df"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={quickFade}
        >
          <h2 className="park_title">Travel Information</h2>
          <p className="pp">
            Whether you're flying or driving, Orlando provides multiple transportation
            options to help you arrive comfortably.
          </p>

          <h3 className="park_subtitle">Airports</h3>
          <ul className="pp">
            <li>MCO — Orlando International Airport (Primary)</li>
            <li>SFB — Orlando Sanford International Airport (Secondary)</li>
            <li>TPA — Tampa International Airport (Approximately 90 minutes away)</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Travel;
