import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Footers from "../../components/footer/Footers";
import { Maximize2 } from "lucide-react";
import { motion } from "framer-motion";
import "./d.css";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dressImages, setDressImages] = useState([]);

  // Original images
  const images = [
    "https://res.cloudinary.com/dhisaijz3/image/upload/v1764943294/2FA051C8-6369-410D-8E54-0FDCFC536725_1__11zon_zjleej.webp",
    "https://res.cloudinary.com/dhisaijz3/image/upload/v1764943293/8EF9CAB9-55AA-4509-96D6-E77AB981653D_1__11zon_btg947.webp",
    "https://res.cloudinary.com/dhisaijz3/image/upload/v1764943292/7D2AC24B-306B-431A-BC92-8A9E79BA4BED_11zon_apz8dh.webp",
    "https://res.cloudinary.com/dhisaijz3/image/upload/v1764943293/6E4CDECC-7044-4B03-912A-FE689F17A83C_11zon_ib3vp6.webp",
    "https://res.cloudinary.com/dhisaijz3/image/upload/v1764943291/7CA677FA-FCAD-4B48-A85A-BC1820863967_11zon_tr9nvf.webp",
    "https://res.cloudinary.com/dhisaijz3/image/upload/v1764943288/back_11zon_peht28.webp",
    "https://res.cloudinary.com/dhisaijz3/image/upload/v1764943227/60C07B50-CC45-455A-B1D5-6219FE8DA6FA_11zon_jrliq7.webp",
    "https://res.cloudinary.com/dhisaijz3/image/upload/v1764943203/3264E171-D596-409E-9338-1364846BE28D_1__11zon_1_bmm5k4.webp",
    "https://res.cloudinary.com/dhisaijz3/image/upload/v1764943179/A37FE97E-6E95-475F-B3B8-2800F317D1C2_11zon_r83hpe.webp",
    "https://res.cloudinary.com/dhisaijz3/image/upload/v1764943158/B33739B0-AD15-4467-90FE-BA59C85C745F_11zon_r6bxln.webp",
    "https://res.cloudinary.com/dhisaijz3/image/upload/v1764943132/CF082346-6F40-4F30-9FEC-76AD2BFBB207_11zon_h8t6zn.webp",
    "https://res.cloudinary.com/dhisaijz3/image/upload/v1764943106/D8F94334-4BED-45E3-86FE-4E36A9007A43_2__11zon_kl3wty.webp",
    "https://res.cloudinary.com/dhisaijz3/image/upload/v1764943076/DEE44FA4-E49B-449C-9CAF-16EA3E39871C_11zon_yphdij.webp",
    "https://res.cloudinary.com/dhisaijz3/image/upload/v1764943057/E127A92C-4C57-4AB9-8616-9CE7230F3AE2_1__11zon_n6ameq.webp",
    "https://res.cloudinary.com/dhisaijz3/image/upload/v1764943028/F489EDE5-9975-40A6-AC5C-AE6D11221AEE_1__11zon_y5rb7h.webp",
    "https://res.cloudinary.com/dhisaijz3/image/upload/v1764942949/FF9C4C81-447B-4C1D-8521-506EB2671ACC_11zon_azbfss.webp",
  ];

  // Shuffle images on page load
  useEffect(() => {
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    setDressImages(shuffled);
  }, []);

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
        <h2 className="drss_topic">Our Love Story in Pictures</h2>

        <p className="dress_para">
          A collection of cherished moments together — from laughter to
          adventures, each photo tells a story of our journey as a couple.
          Celebrate our memories and share in the joy of our special day.
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

export default Gallery;
