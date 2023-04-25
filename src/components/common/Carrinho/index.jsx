import React from "react";
import "./styles.css";
import Footer from "../Footer";
import Logo from "../Logo";
import {menuItemsData} from "../Menu/data.js";
import { Link } from "react-router-dom";

const Carrinho = () => {
  const items = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith("quantidade_")) {
      const itemId = key.replace("quantidade_", "");
      const item = {
        id: itemId,
        quantidade: parseInt(localStorage.getItem(key)),
        preco: menuItemsData.find((item) => item.id === parseInt(itemId)).price,
        nome: menuItemsData.find((item) => item.id === parseInt(itemId)).name,
       
      };
      items.push(item);
    }
  }

  const precoTotal = items.reduce(
    (precoTotal, item) => precoTotal + item.quantidade * item.preco,
    0
  );

  return (
    <div>
      <Logo />
      <div className="all-car">
        <h1 className="h1-car">Carrinho</h1>
        <div className="div-carrinho">
          <div className="carrinho">
            {items
              .filter((item) => item.quantidade > 0)
              .map((item) => (
                <div className="div-key" key={item.id}>
                  <p className="nome-item">{item.nome}</p>
                  <div className="qnt-price">
                    <p>Quantidade: {item.quantidade}</p>
                    <p>Preço: {item.preco} und</p>
                  </div>
                 
                </div>
              ))}
          </div>
        </div>
        <p className="preço-total">Preço total: {precoTotal}</p>
        <Link className="voltar" to="/">Voltar</Link>
      </div>
      <Footer />
    </div>
  );
};

export default Carrinho;
