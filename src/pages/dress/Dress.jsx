import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Footers from "../../components/footer/Footers";
import { Maximize2 } from "lucide-react";
import { motion } from "framer-motion";
import "./d.css";

const Dress = () => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const dressImages = [
    "https://maya.bridely.nl/wp-content/uploads/2025/10/1000110608.jpg",
    "https://maya.bridely.nl/wp-content/uploads/2025/10/1000110609.jpg",
    "https://maya.bridely.nl/wp-content/uploads/2025/10/1000110611-683x1024.jpg",
    "https://maya.bridely.nl/wp-content/uploads/2025/10/1000110633.jpg",
    "https://maya.bridely.nl/wp-content/uploads/2025/10/1000110632.jpg",
    "https://maya.bridely.nl/wp-content/uploads/2025/10/1000110631.jpg",
    "https://maya.bridely.nl/wp-content/uploads/2025/10/1000110630-683x1024.jpg",
    "https://maya.bridely.nl/wp-content/uploads/2025/10/1000110629-1.jpg",
    "https://maya.bridely.nl/wp-content/uploads/2025/10/1000110628-576x1024.jpg",
    "https://maya.bridely.nl/wp-content/uploads/2025/10/1000110614-605x1024.jpg",
    "https://maya.bridely.nl/wp-content/uploads/2025/10/1000110613-683x1024.jpg",
    "https://maya.bridely.nl/wp-content/uploads/2025/10/1000110612-1-576x1024.jpg",
  ];

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
      <div className="dress_content">
        <h2 className="drss_topic">Dress Code + Inspiration</h2>

        <p className="dress_para">
          Our celebration calls for a chic all-black, formal black-tie look.
          Think elevated eveningwear, refined silhouettes, and timeless
          sophistication. Below is everything you need to help you look and
          feel your best on our special day.
        </p>

        <div className="dress_grid">
          {dressImages.map((imgSrc, index) => (
            <motion.div
              className="dress_sub"
              key={index}
              variants={quickFade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              onClick={() => {
                setCurrentIndex(index);
                setOpen(true);
              }}
              style={{ cursor: "pointer", position: "relative" }}
            >
              <img
                src={imgSrc}
                alt={`Dress ${index + 1}`}
                className="dress_img"
              />

              {/* Overlay with icon */}
              <div className="overlay">
                <Maximize2 size={40} color="#fff" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={dressImages.map((src) => ({ src }))}
        index={currentIndex}
      />

    </div>
  );
};

export default Dress;
