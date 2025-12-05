import Header from "./components/header/Header";
import Story from "./components/story/Story";
import Tomeine from "./components/timeline/Tomeine";
import Details from "./components/details/Details";
import Footer from "./components/footer/Footer";

const All = () => {
  return (
    <div>
      {" "}
      <Header />
      <Story />
      <Tomeine />
      <Details />
      <Footer />
    </div>
  );
};

export default All;
