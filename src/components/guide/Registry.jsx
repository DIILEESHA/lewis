import { motion } from "framer-motion";
import "./g.css";

const Registry = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 50, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
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
        variants={fadeUp}
      >
        <h2 className="drss_topic">Our Wedding Registry</h2>
        <p className="dress_para">
          As an established couple, your presence truly means the world to us.
          If you wish to show love and support, the kindest gift is any monetary
          amount you feel led to give as we prepare to celebrate our honeymoon
          and begin our Lewis Ever After together.
        </p>
      </motion.div>

      <div className="guide_content">
        {/* Hotel Section */}
        <motion.div
          className="df"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="park_title">Zelle (Optional)</h2>
          <p className="pp">
            <strong>Recipient:</strong>
            <br />
            Latoya Hinson
          </p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://enroll.zellepay.com/qr?data=eyJuYW1lIjoiTEFUT1lBIiwiYWN0aW9uIjoicGF5bWVudCIsInRva2VuIjoiNDA3OTY4MDY5NyJ9"
          >
            <motion.button
              className="location_btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send a Gift via Zelle
            </motion.button>
          </a>
        </motion.div>

        <br />
        <br />
      </div>
    </div>
  );
};

export default Registry;
