import { motion } from "framer-motion";
import Footers from "../../components/footer/Footers";
import "./p.css";

const Dress = () => {
  // Quick and elegant scale + fade animation
  const quickFade = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const bridesmaids = [
    {
      name: "LaChaunda",
      title: "Maid of Honor",
      img: "https://res.cloudinary.com/dhisaijz3/image/upload/v1764840128/814C62DE-F41B-40A1-B601-94A26949499A_cnre2f.jpg",
    },
    {
      name: "Selena",
      title: "Matron of Honor",
      img: "https://res.cloudinary.com/dhisaijz3/image/upload/v1764839916/50AC6862-50FE-4277-AB7E-01F7F903B17A_zg0iyy.jpg",
    },
    {
      name: "Tianisha",
      title: "Bridesmaid",
      img: "https://res.cloudinary.com/dhisaijz3/image/upload/v1764838970/4024F2A8-1CE6-4818-8706-199B640EF1DF_eezgag.jpg",
    },
    {
      name: "Tiffany",
      title: "Bridesmaid",
      img: "https://res.cloudinary.com/dhisaijz3/image/upload/v1764839322/CAD18094-6D62-410D-911B-6FBD303A5A76_nvu1cf.jpg",
    },
    {
      name: "Anginette",
      title: "Bridesmaid",
      img: "https://res.cloudinary.com/dhisaijz3/image/upload/v1764839461/5956C1CE-F7D6-4E6A-ADF9-7AFDB9B707C0_kfs48e.jpg",
    },
    {
      name: "Delana",
      title: "Bridesmaid",
      img: "https://res.cloudinary.com/dhisaijz3/image/upload/v1764839520/B1C282D8-C01D-4E0F-AF30-AB7BECE6372E_ey8hrp.jpg",
    },
    {
      name: "Victor Damone",
      title: "Groomsman",
      img: "https://res.cloudinary.com/dhisaijz3/image/upload/v1764838615/7A7848AC-5401-41A4-87E8-E0198CCCC572_trchbv.jpg",
    },
    {
      name: "Joseph Lewis",
      title: "Groomsman",
      img: "https://res.cloudinary.com/dhisaijz3/image/upload/v1764839557/D3701DD3-57F9-47F7-8211-B33A229879E7_ob4xaz.jpg",
    },
    {
      name: "Jeff",
      title: "Groomsman",
      img: "https://res.cloudinary.com/dhisaijz3/image/upload/v1764856517/32449562-35AB-411F-9E1B-89252FBE66FA_icvvfg.jpg",
    },
    {
      name: "Terhel Johnson",
      title: "Groomsman",
      img: "https://res.cloudinary.com/dhisaijz3/image/upload/v1764839631/7EFCFF4B-59CB-4423-9E2C-95A46D9BBC3C_gf5jr4.jpg",
    },
    {
      name: "Terrel Pinnock",
      title: "Groomsman",
      img: "https://res.cloudinary.com/dhisaijz3/image/upload/v1764839677/2C1F0D38-F1F3-4E03-BDA6-3FAB1594B8D0_ip7sjh.jpg",
    },
  ];

  return (
    <div className="dress">
      <div className="dress_content">
        <h2 className="drss_topic">Wedding Party</h2>
        <p className="dress_para">
          Our wedding party is made up of the people who have shaped our lives
          with love, loyalty, and unwavering support. Meet the incredible
          individuals standing with us on our special day.
        </p>
      </div>

      <div className="bride_grid">
        {bridesmaids.map((b, i) => (
          <motion.div
            className="bride_sub"
            key={i}
            variants={quickFade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="bride_card_section">
              <img src={b.img} alt={b.name} className="bride_img" />
              <h2 className="bride_name">{b.name}</h2>
              <h3 className="bride_title">{b.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dress;
