import React from "react";
import "./styles.css";
import bannerImg from "./banneer.png";
import Logo from "../../common/Logo";

const Banner = () => {
  const scrollToMenu = () => {
    const menu = document.getElementById("menu");
    const topOffset = menu.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: topOffset,
      left: 10,
      behavior: "smooth"
    });
  };

  return (
    <header>
      <div className="header-content">
        <Logo />
        <div className="content-main">
          <h1>Receba sua coxinha rapidamente</h1>
          <p>
            Coxinhas super crocantes de alta qualidade! uma explosão de sabores
            incríveis
          </p>
          <button className="btn" onClick={scrollToMenu}>
            Ver menu <i className="fas fa-long-arrow-alt-right">➤</i>
          </button>
        </div>
      </div>
      <img src={bannerImg} alt="banner" className="header-img" />
    </header>
  );
};

export default Banner;
