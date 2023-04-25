import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import {menuItemsData} from ".././data.js";

const FinalizarPedido = () => {

  const items = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith("quantidade_")) {
      const itemId = key.replace("quantidade_", "");
      const item = {
        id: itemId,
        quantidade: parseInt(localStorage.getItem(key)),
        preco: menuItemsData.find((item) => item.id === parseInt(itemId)).price,
      };
      items.push(item);
    }
  }

  const totalCarrinho = items.reduce(
    (total, item) => total + item.quantidade * item.preco,
    0
  );

 

  return (
    <div className="finalizar-div">
      {totalCarrinho > 0 ? (
        <Link className="Link" to="/carrinho">
          Finalizar Pedido
        </Link>
      ) : (
        <p className="adc-p">Adicione algo ao carrinho.</p>
      )}
    </div>
  );
};

export default FinalizarPedido;



