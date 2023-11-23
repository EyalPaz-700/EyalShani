import "../style/navbar.css";
import Navbar from "./Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="eyal-image-container">
        <img
          className="eyal-shani"
          src="https://static.timesofisrael.com/www/uploads/2017/10/eyal-shani-300x480.png"
        />
      </div>
    </>
  );
}
