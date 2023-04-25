import React from "react";
import "./styles.css";
import carrinho from "../../../imgs/carrinho.png";
import { Link } from "react-router-dom";

const CartCountButton = () => {
  return (
    <Link to="/carrinho">
      <div className="btnCartCount">
        <img className="icon-carrinho" src={carrinho} alt="carrinho" />
      </div>
    </Link>
  );
};

export default CartCountButton;
