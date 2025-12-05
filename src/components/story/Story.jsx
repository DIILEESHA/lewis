import { motion } from "framer-motion";
import "./s.css";
import one from "../../assets/header1.webp";

// Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUpDelayed = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

const driftFloat = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 1.6, ease: "easeOut" } },
  drift: {
    y: [0, -6, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

const staggerParent = {
  show: { transition: { staggerChildren: 0.25 } },
};

const Story = () => {
  return (
    <motion.div
      className="story cc"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Top Text Section */}
      <motion.div className="story_main" variants={staggerParent}>
        <motion.h2 className="story_date" variants={fadeUp}>
          4.25.2026
        </motion.h2>
        <motion.p className="story_location" variants={fadeUp}>
          Edimburg, Scotland
        </motion.p>
        <a href="rsvp" style={{position:"relative",zIndex:"10"}}>
          <motion.button className="rsvp_here dul" variants={fadeUp}>
            rsvp
          </motion.button>
        </a>
      </motion.div>

      {/* Images Section */}
      <div className="story_grid">
        <motion.div className="story_sub" variants={staggerParent}>
          <motion.div className="image_set" variants={staggerParent}>
            <motion.img
              src="https://res.cloudinary.com/dhisaijz3/image/upload/v1764942949/FF9C4C81-447B-4C1D-8521-506EB2671ACC_11zon_azbfss.webp"
              alt=""
              className="story_img a"
              variants={fadeUp}
              whileHover={{ scale: 1.05, rotate: 1 }}
              animate="drift"
            />
            <motion.img
              src="https://res.cloudinary.com/dhisaijz3/image/upload/v1764943203/3264E171-D596-409E-9338-1364846BE28D_1__11zon_1_bmm5k4.webp"
              alt=""
              className="story_img b"
              variants={fadeUpDelayed}
              whileHover={{ scale: 1.05, rotate: -1 }}
              animate="drift"
            />
            <motion.img
              src="https://res.cloudinary.com/dhisaijz3/image/upload/v1764943132/CF082346-6F40-4F30-9FEC-76AD2BFBB207_11zon_h8t6zn.webp"
              alt=""
              className="story_img c"
              variants={fadeUp}
              whileHover={{ scale: 1.05, rotate: 1 }}
              animate="drift"
            />
          </motion.div>
        </motion.div>

        {/* Text Block */}
        <motion.div className="story_sub casper" variants={fadeUpDelayed}>
          <motion.h2 className="story_main_title" variants={fadeUp}>
            Our Love Story
          </motion.h2>

          <motion.p className="story_para" variants={fadeUpDelayed}>
            At the beginning of the COVID shutdown in 2020, a simple Facebook
            connection changed everything. What started as casual chats quickly
            grew into long conversations, laughter, and comfort during uncertain
            times. Out of isolation came love—proof that even in the quietest
            seasons, something beautiful can bloom.
            <br />
            <br />
            Through life’s ups and downs, one truth remains constant: we choose
            each other. Each day, each season, every chapter—Jereal and Latoya
            stand together, building their “Lewis Ever After.”
            <br />
            <br />
            Everything about the proposal was a complete surprise. She was asked
            to wear orange—without knowing why. Only later did she notice the
            orange roses, the orange décor, and even the ring box itself was
            orange.
            <br />
            <br />
            The evening took place at a riverside park in Ormond Beach, FL at
            sunset. A private chef prepared an intimate candlelit dinner just
            for the two of them. A saxophone player filled the air with music, a
            camera crew captured every moment, and an artist painted the scene
            live as it unfolded.
            <br />
            <br />
            After dinner, a horse-drawn carriage carried them along the
            waterfront. At the end, Latoya was gently blindfolded and guided
            toward a podium. When the blindfold was removed, she heard
            “Surprissseeee!” from family and friends—her sons, Sincere and Dior,
            stepped forward holding the ring. Jereal dropped to one knee and
            asked the question that began their forever.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Story;
